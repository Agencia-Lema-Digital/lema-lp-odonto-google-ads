import Hero from "@/components/sections/Hero";
import AudienceFilter from "@/components/sections/AudienceFilter";
import PainPoints from "@/components/sections/PainPoints";
import TrinoMethod from "@/components/sections/TrinoMethod";
import SocialProof from "@/components/sections/SocialProof";
import HowItWorks from "@/components/sections/HowItWorks";
import AboutFounders from "@/components/sections/AboutFounders";
import FAQ from "@/components/sections/FAQ";
import LeadForm from "@/components/sections/LeadForm";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <AudienceFilter />
      <PainPoints />
      <TrinoMethod />
      <SocialProof />
      <HowItWorks />
      <AboutFounders />
      <FAQ />
      <LeadForm />
      <FinalCTA />
      <Footer />
    </main>
  );
}
