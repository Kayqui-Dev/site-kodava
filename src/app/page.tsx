import Hero from '@/components/Hero';
import Positioning from '@/components/Positioning';
import SolutionsHorizontal from '@/components/SolutionsHorizontal';
import BentoGrid from '@/components/BentoGrid';
import About from '@/components/About';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main className="flex-grow">
      <Hero />
      <Positioning />
      <SolutionsHorizontal />
      <BentoGrid />
      <About />
      <Contact />
    </main>
  );
}
