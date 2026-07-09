import { Hero } from "@/components/sections/hero/Hero";
import { Projects } from "@/components/sections/projects/Projects";
import { Contact } from "@/components/sections/contact/Contact";
import { Footer } from "@/components/shared/footer/Footer";
import { Marquee } from "@/components/shared/marquee/Marquee";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}
