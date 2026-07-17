# Деплой портфолио на VPS

## Архитектура

- GitHub Actions на Ubuntu 24.04 устанавливает Node.js 22, выполняет проверки и собирает Next.js в каталог `out`.
- На VPS Next.js не собирается. Caddy раздаёт готовые файлы из `/var/www/portfolio/current`.
- Только `/api/contact` и `/health` проксируются в Node.js API на `127.0.0.1:3001`.
- API работает от отдельного пользователя `portfolio-contact`, отправляет заявки через Telegram Bot API и читает секреты из `/etc/portfolio-contact.env`.
- Каждый деплой создаёт неизменяемые каталоги `releases/<дата>-<commit>`. Симлинк `current` переключается атомарно. При неуспешной проверке workflow возвращает предыдущий release.
- На VPS остаются пять последних releases сайта и API.

Проект совместим со static export: используется App Router, но нет SSR, Server Actions, API Routes, middleware и динамических маршрутов. `next.config.ts` уже содержит `output: "export"` и `images.unoptimized: true`. Метаданные, canonical, Open Graph, `robots.txt` и `sitemap.xml` генерируются во время сборки.

## 1. DNS

Основной домен проекта по текущим metadata — `shtq.pro`. У регистратора добавьте:

| Тип | Имя | Значение |
| --- | --- | --- |
| A | `@` | IPv4 VPS |

Не добавляйте `AAAA`, если IPv6 этого VPS не настроен для сайта. Если нужен `www`, сначала добавьте его в `infra/Caddyfile`, затем создайте запись `CNAME www -> shtq.pro`.

Перед запуском Caddy дождитесь, пока `shtq.pro` резолвится в IPv4 VPS. Для автоматического HTTPS входящие TCP 80 и 443 должны быть доступны. Bootstrap не меняет firewall.

## 2. Telegram-бот

1. Откройте `@BotFather` в Telegram, выполните `/newbot` и сохраните выданный токен.
2. Напишите созданному боту любое сообщение.
3. Узнайте ID чата локально, не помещая токен в историю shell:

```bash
read -rsp "Telegram bot token: " TELEGRAM_BOT_TOKEN
echo
curl --fail --silent --show-error \
  "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates" \
  | python3 -m json.tool
unset TELEGRAM_BOT_TOKEN
```

В ответе найдите `result[].message.chat.id`. Для группового чата ID обычно отрицательный.

## 3. Отдельный SSH-ключ для деплоя

Создайте ключ на локальном компьютере. Не используйте основной личный ключ и не задавайте passphrase этому автоматизационному ключу:

```bash
ssh-keygen -t ed25519 -C "github-actions-portfolio" -f ./portfolio_deploy
```

Файл `portfolio_deploy` станет секретом GitHub. Файл `portfolio_deploy.pub` понадобится после bootstrap. Не добавляйте ни один из них в Git.

## 4. Первичная подготовка VPS

Скопируйте каталог `infra` на VPS через временный root-доступ и подключитесь к серверу. Bootstrap запускается вручную один раз:

```bash
scp -P 22 -r infra root@<VPS_IP>:/root/portfolio-infra
ssh -p 22 root@<VPS_IP>
cd /root/portfolio-infra
DOMAIN=shtq.pro bash bootstrap-vps.sh
```

Скрипт сначала проверяет порты. После установки Caddy на сервере уже будет стандартный `/etc/caddy/Caddyfile`, поэтому скрипт может остановиться перед его заменой. Изучите предупреждение и шаблон, затем подтвердите замену отдельным повторным запуском:

```bash
DOMAIN=shtq.pro ALLOW_CONFIG_REPLACE=1 bash bootstrap-vps.sh
```

При замене существующего Caddyfile или systemd unit скрипт сохраняет резервную копию рядом с исходным файлом. Он не перезагружает VPS, не включает UFW, не меняет SSH-порт, IPv6, маршруты, Docker или Amnezia.

Скопируйте публичную часть deploy-ключа и установите её вручную:

```bash
scp -P 22 ./portfolio_deploy.pub root@<VPS_IP>:/tmp/portfolio_deploy.pub
ssh -p 22 root@<VPS_IP>
install -o deploy -g deploy -m 0600 \
  /tmp/portfolio_deploy.pub /home/deploy/.ssh/authorized_keys
```

Проверьте вход из нового локального терминала до закрытия root-сессии:

```bash
ssh -i ./portfolio_deploy -p 22 deploy@<VPS_IP>
```

После успешной проверки ключа смените пароль root командой `passwd root`: пароль, переданный в переписке, следует считать раскрытым. Не отключайте root-доступ, пока не проверены deploy-ключ и аварийный способ входа через панель провайдера.

## 5. Секреты API на VPS

Создайте файл `/etc/portfolio-contact.env` от root. Настоящий `.env` в репозитории не создавайте:

```bash
install -o root -g root -m 0600 /dev/null /etc/portfolio-contact.env
nano /etc/portfolio-contact.env
```

Содержимое:

```dotenv
TELEGRAM_BOT_TOKEN=replace_with_real_token
TELEGRAM_CHAT_ID=replace_with_real_chat_id
PORT=3001
NODE_ENV=production
```

Не выводите этот файл в логи и не передавайте Telegram-токен в GitHub Actions: он нужен только на VPS.

## 6. GitHub Secrets и Variables

В `Settings -> Secrets and variables -> Actions` создайте Secrets:

| Secret | Значение |
| --- | --- |
| `VPS_HOST` | IPv4 VPS |
| `VPS_PORT` | `22` |
| `VPS_USER` | `deploy` |
| `VPS_SSH_PRIVATE_KEY` | полное содержимое приватного `portfolio_deploy` |
| `DEPLOY_PATH` | `/var/www/portfolio` |
| `CONTACT_API_PATH` | `/opt/portfolio-contact` |

Создайте Variables:

| Variable | Значение |
| --- | --- |
| `SITE_URL` | `https://shtq.pro` |
| `GOOGLE_VERIFICATION` | необязательно; публичный verification-код |
| `YANDEX_VERIFICATION` | необязательно; публичный verification-код |

Проект не использует Sanity, поэтому Sanity-переменные для сборки не нужны. Все `NEXT_PUBLIC_*` значения попадают в клиентскую сборку и не должны содержать секреты.

## 7. Первый и последующие деплои

Workflow запускается при push в `main` и вручную из вкладки Actions:

```bash
git push origin main
```

Во время первого деплоя GitHub Actions:

1. выполнит `npm ci`, lint, TypeScript, тесты и обе production-сборки;
2. проверит наличие `out/index.html` и `contact-api/dist/server.js`;
3. загрузит новый release через rsync;
4. переключит симлинки `current`;
5. перезапустит только `portfolio-contact.service`;
6. проверит локальный API, публичный `/health` и главную страницу по HTTPS.

Если проверка завершится ошибкой, предыдущие симлинки будут восстановлены. Caddy, Docker и VPS workflow не перезапускает.

## 8. Проверки и логи

На VPS:

```bash
systemctl status caddy
systemctl status portfolio-contact
journalctl -u portfolio-contact -n 100 --no-pager
caddy validate --config /etc/caddy/Caddyfile
curl http://127.0.0.1:3001/health
curl -I https://shtq.pro
ss -lntup
free -h
df -h
docker ps
```

Ожидается, что API слушает только `127.0.0.1:3001`, а Caddy — TCP 80 и 443. Состояние GitHub Actions смотрите во вкладке `Actions` репозитория; workflow не печатает SSH-ключи и Telegram-секреты.

## 9. Ручной откат

Посмотрите releases и текущие цели симлинков:

```bash
readlink -f /var/www/portfolio/current
readlink -f /opt/portfolio-contact/current
ls -1dt /var/www/portfolio/releases/*
ls -1dt /opt/portfolio-contact/releases/*
```

Выберите согласованную предыдущую пару и переключите её:

```bash
ln -sfn /var/www/portfolio/releases/<SITE_RELEASE> /var/www/portfolio/current.next
mv -Tf /var/www/portfolio/current.next /var/www/portfolio/current
ln -sfn /opt/portfolio-contact/releases/<API_RELEASE> /opt/portfolio-contact/current.next
mv -Tf /opt/portfolio-contact/current.next /opt/portfolio-contact/current
systemctl restart portfolio-contact.service
curl http://127.0.0.1:3001/health
```

Откат сайта не требует перезапуска Caddy.

## 10. Проверка Amnezia

До и после bootstrap/первого деплоя сохраните вывод:

```bash
docker ps
ss -lntup
```

Контейнеры Amnezia должны остаться в состоянии `Up`, а их порты — без изменений. Если 80 или 443 уже заняты не Caddy, bootstrap остановится; не останавливайте найденный процесс, пока не убедитесь, что он не относится к Amnezia.

## Значения в шаблонах

- `YOUR_DOMAIN` в `infra/Caddyfile` bootstrap заменяет значением `DOMAIN`.
- `<VPS_IP>` в этой инструкции заменяется IPv4 сервера только в локальных командах и GitHub Secret; IP не следует коммитить.
- `replace_with_real_token` и `replace_with_real_chat_id` заменяются только в `/etc/portfolio-contact.env` на VPS.
- `<SITE_RELEASE>` и `<API_RELEASE>` при ручном откате берутся из фактических каталогов `releases`.
