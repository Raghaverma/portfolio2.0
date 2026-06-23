import { Hero } from "@/components/home/Hero";
import { WorkIndex } from "@/components/home/WorkIndex";
import { About } from "@/components/home/About";
import { Stack } from "@/components/home/Stack";
import { Contact } from "@/components/home/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <WorkIndex />
      <About />
      <Stack />
      <Contact />
    </main>
  );
}
