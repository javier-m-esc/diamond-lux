import Hero        from "@/components/sections/Hero";
import Positioning  from "@/components/sections/Positioning";
import Problem      from "@/components/sections/Problem";
import Services     from "@/components/sections/Services";
import Aftercare    from "@/components/sections/Aftercare";
import Process      from "@/components/sections/Process";
import BeforeAfter  from "@/components/sections/BeforeAfter";
import Trust        from "@/components/sections/Trust";
import Scarcity     from "@/components/sections/Scarcity";
import About        from "@/components/sections/About";
import BookingForm  from "@/components/sections/BookingForm";

export default function Home() {
  return (
    <main className="bg-[#050505] text-white overflow-hidden">
      <Hero />
      <Positioning />
      <Problem />
      <Services />
      <Aftercare />
      <Process />
      <BeforeAfter />
      <Trust />
      <Scarcity />
      <About />
      <BookingForm />
    </main>
  );
}
