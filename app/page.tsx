import { Contact } from "@/components/sections/contact/Contact";
import { Hero } from "@/components/sections/hero/Hero";
import { WorkGallery } from "@/components/sections/work-gallery/WorkGallery";
import { Footer } from "@/components/shared/footer/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <WorkGallery />
      <Contact />
      <Footer />
    </>
  );
}
