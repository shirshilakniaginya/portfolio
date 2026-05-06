import { About } from "@/components/sections/about/About";
import { Contact } from "@/components/sections/contact/Contact";
import { Hero } from "@/components/sections/hero/Hero";
import { WorkGallery } from "@/components/sections/work-gallery/WorkGallery";
import { Footer } from "@/components/shared/footer/Footer";
import { Header } from "@/components/shared/header/Header";
import { PageShell } from "@/components/shared/layout/PageShell";

export default function Home() {
  return (
    <PageShell>
      <Header />
      <Hero />
      <About />
      <WorkGallery />
      <Contact />
      <Footer />
    </PageShell>
  );
}
