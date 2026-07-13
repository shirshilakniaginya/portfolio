import { Hero } from "@/components/sections/hero/Hero";
import { Projects } from "@/components/sections/projects/Projects";
import { About } from "@/components/sections/about/About";
import { Contact } from "@/components/sections/contact/Contact";
import { Faq } from "@/components/sections/faq/Faq";
import { Footer } from "@/components/shared/footer/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Projects />
        <About />
        <Contact />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
