import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Services from "@/components/Services";
import Method from "@/components/Method";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Insights from "@/components/Insights";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Services />
        <Method />
        <Portfolio />
        <About />
        <Insights />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
