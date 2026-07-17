#!/usr/bin/env bash
set -Eeuo pipefail

trap 'echo "Bootstrap failed near line ${LINENO}. No reboot or firewall change was attempted." >&2' ERR

readonly SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
readonly DOMAIN="${DOMAIN:-}"
readonly DEPLOY_PATH="${DEPLOY_PATH:-/var/www/portfolio}"
readonly CONTACT_API_PATH="${CONTACT_API_PATH:-/opt/portfolio-contact}"
readonly CONTACT_USER="portfolio-contact"
readonly ALLOW_CONFIG_REPLACE="${ALLOW_CONFIG_REPLACE:-0}"

if [[ "${EUID}" -ne 0 ]]; then
  echo "Run this script once as root." >&2
  exit 1
fi

if [[ -z "${DOMAIN}" || ! "${DOMAIN}" =~ ^[A-Za-z0-9.-]+$ ]]; then
  echo "Set DOMAIN to the site's DNS name, for example: DOMAIN=example.com bash infra/bootstrap-vps.sh" >&2
  exit 1
fi

for path in "${DEPLOY_PATH}" "${CONTACT_API_PATH}"; do
  if [[ ! "${path}" =~ ^/[A-Za-z0-9._/-]+$ || "${path}" == "/" ]]; then
    echo "Unsafe deployment path: ${path}" >&2
    exit 1
  fi
done

echo "Preflight: inspecting listeners without changing firewall, routes, Docker, or Amnezia."
web_listeners="$(ss -H -lntp 2>/dev/null | awk '$4 ~ /:80$/ || $4 ~ /:443$/ { print }' || true)"
while IFS= read -r listener; do
  [[ -z "${listener}" ]] && continue
  if [[ "${listener}" != *caddy* ]]; then
    echo "Port 80 or 443 is already occupied by a process other than Caddy:" >&2
    echo "${listener}" >&2
    echo "Resolve the conflict manually. The script will not stop that process." >&2
    exit 1
  fi
done <<<"${web_listeners}"

api_listeners="$(ss -H -lntp 2>/dev/null | awk '$4 ~ /:3001$/ { print }' || true)"
while IFS= read -r listener; do
  [[ -z "${listener}" ]] && continue
  local_address="$(awk '{ print $4 }' <<<"${listener}")"
  case "${local_address}" in
    127.0.0.1:3001|\[::1\]:3001) ;;
    *)
      echo "Port 3001 is exposed beyond loopback: ${listener}" >&2
      echo "Stop or reconfigure that listener manually before continuing." >&2
      exit 1
      ;;
  esac
done <<<"${api_listeners}"

export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get install -y --no-install-recommends \
  apt-transport-https \
  ca-certificates \
  curl \
  debian-archive-keyring \
  debian-keyring \
  gnupg \
  iproute2 \
  rsync \
  sudo

temp_dir="$(mktemp -d)"
trap 'rm -rf -- "${temp_dir}"' EXIT

curl --fail --silent --show-error --location \
  https://dl.cloudsmith.io/public/caddy/stable/gpg.key \
  --output "${temp_dir}/caddy.gpg.key"
gpg --batch --yes --dearmor \
  --output /usr/share/keyrings/caddy-stable-archive-keyring.gpg \
  "${temp_dir}/caddy.gpg.key"
curl --fail --silent --show-error --location \
  https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt \
  --output /etc/apt/sources.list.d/caddy-stable.list
chmod 0644 /usr/share/keyrings/caddy-stable-archive-keyring.gpg /etc/apt/sources.list.d/caddy-stable.list

curl --fail --silent --show-error --location \
  https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key \
  --output "${temp_dir}/nodesource.gpg.key"
gpg --batch --yes --dearmor \
  --output /usr/share/keyrings/nodesource.gpg \
  "${temp_dir}/nodesource.gpg.key"
chmod 0644 /usr/share/keyrings/nodesource.gpg
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/nodesource.gpg] https://deb.nodesource.com/node_22.x nodistro main" \
  > /etc/apt/sources.list.d/nodesource.list

apt-get update
apt-get install -y --no-install-recommends caddy nodejs

if ! id -u deploy >/dev/null 2>&1; then
  useradd --create-home --shell /bin/bash deploy
fi
if ! id -u "${CONTACT_USER}" >/dev/null 2>&1; then
  useradd --system --home-dir /nonexistent --no-create-home --shell /usr/sbin/nologin "${CONTACT_USER}"
fi

install -d -o deploy -g deploy -m 0755 "${DEPLOY_PATH}" "${DEPLOY_PATH}/releases"
install -d -o deploy -g deploy -m 0755 "${CONTACT_API_PATH}" "${CONTACT_API_PATH}/releases"
install -d -o deploy -g deploy -m 0700 /home/deploy/.ssh

cat > /etc/sudoers.d/portfolio-deploy <<'SUDOERS'
deploy ALL=(root) NOPASSWD: /usr/bin/systemctl restart portfolio-contact.service, /usr/bin/systemctl is-active portfolio-contact.service
SUDOERS
chmod 0440 /etc/sudoers.d/portfolio-deploy
visudo --check --file=/etc/sudoers.d/portfolio-deploy

rendered_caddy="${temp_dir}/Caddyfile"
sed "s/YOUR_DOMAIN/${DOMAIN}/g" "${SCRIPT_DIR}/Caddyfile" > "${rendered_caddy}"
caddy validate --config "${rendered_caddy}"

install_config() {
  local source_file="$1"
  local destination_file="$2"
  local mode="$3"

  if [[ -e "${destination_file}" ]] && ! cmp --silent "${source_file}" "${destination_file}"; then
    if [[ "${ALLOW_CONFIG_REPLACE}" != "1" ]]; then
      echo "Refusing to overwrite existing ${destination_file}." >&2
      echo "Review it, then rerun with ALLOW_CONFIG_REPLACE=1 if replacement is intended." >&2
      exit 1
    fi
    cp --archive "${destination_file}" "${destination_file}.portfolio-backup.$(date -u +%Y%m%dT%H%M%SZ)"
  fi

  install -o root -g root -m "${mode}" "${source_file}" "${destination_file}"
}

install_config "${rendered_caddy}" /etc/caddy/Caddyfile 0644
install_config "${SCRIPT_DIR}/portfolio-contact.service" /etc/systemd/system/portfolio-contact.service 0644

systemctl daemon-reload
systemctl enable portfolio-contact.service
systemctl enable --now caddy.service
systemctl reload caddy.service

echo
echo "Bootstrap completed. No firewall, Docker, route, SSH port, or Amnezia settings were changed."
echo "Add the deploy public key manually to /home/deploy/.ssh/authorized_keys, then set ownership deploy:deploy and mode 0600."
echo "Create /etc/portfolio-contact.env manually before the first deployment."
