import Navbar from "@/components/Navbar/Navbar";
import VideoIntro from "@/components/VideoIntro/VideoIntro";
import About from "@/components/About/About";
import Experience from "@/components/Experience/Experience";
import Projects from "@/components/Projects/Projects";
import Freelance from "@/components/Freelance/Freelance";
import Skills from "@/components/Skills/Skills";
import Contact from "@/components/Contact/Contact";

export default function Home() {
  return (
    <main>
      <Navbar />
      <VideoIntro />
      <About />
      <Experience />
      <Projects />
      <Freelance />
      <Skills />
      <Contact />
    </main>
  );
}
