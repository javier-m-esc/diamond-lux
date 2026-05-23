import Hero          from '@/components/sections/Hero';
import ProblemPromise from '@/components/sections/ProblemPromise';
import Services       from '@/components/sections/Services';
import BeforeAfter    from '@/components/sections/BeforeAfter';
import Guarantee      from '@/components/sections/Guarantee';
import Scarcity       from '@/components/sections/Scarcity';
import Testimonials   from '@/components/sections/Testimonials';
import BookingForm    from '@/components/sections/BookingForm';

export default function Home() {
  return (
    <main>
      <Hero />
      <ProblemPromise />
      <Services />
      <BeforeAfter />
      <Guarantee />
      <Scarcity />
      <Testimonials />
      <BookingForm />
    </main>
  );
}
