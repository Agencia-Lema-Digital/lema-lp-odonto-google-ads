import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import AudienceFilter from "@/components/sections/AudienceFilter";
import PainPoints from "@/components/sections/PainPoints";
import HowItWorks from "@/components/sections/HowItWorks";
import AboutFounders from "@/components/sections/AboutFounders";
import FAQ from "@/components/sections/FAQ";
import LeadForm from "@/components/sections/LeadForm";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

// Framer Motion só carrega quando a seção entra na viewport
const TrinoMethod = dynamic(() => import("@/components/sections/TrinoMethod"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "600px" }} />,
});

const SocialProof = dynamic(() => import("@/components/sections/SocialProof"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "400px" }} />,
});

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
