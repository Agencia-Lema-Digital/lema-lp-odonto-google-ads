"use client";

import dynamic from "next/dynamic";

function SectionPlaceholder({ height }: { height: string }) {
  return <div style={{ minHeight: height }} />;
}

const AudienceFilter = dynamic(() => import("@/components/sections/AudienceFilter"), { ssr: false, loading: () => <SectionPlaceholder height="300px" /> });
const PainPoints     = dynamic(() => import("@/components/sections/PainPoints"),     { ssr: false, loading: () => <SectionPlaceholder height="400px" /> });
const TrinoMethod    = dynamic(() => import("@/components/sections/TrinoMethod"),    { ssr: false, loading: () => <SectionPlaceholder height="600px" /> });
const SocialProof    = dynamic(() => import("@/components/sections/SocialProof"),    { ssr: false, loading: () => <SectionPlaceholder height="400px" /> });
const HowItWorks     = dynamic(() => import("@/components/sections/HowItWorks"),     { ssr: false, loading: () => <SectionPlaceholder height="400px" /> });
const AboutFounders  = dynamic(() => import("@/components/sections/AboutFounders"),  { ssr: false, loading: () => <SectionPlaceholder height="400px" /> });
const FAQ            = dynamic(() => import("@/components/sections/FAQ"),            { ssr: false, loading: () => <SectionPlaceholder height="300px" /> });
const LeadForm       = dynamic(() => import("@/components/sections/LeadForm"),       { ssr: false, loading: () => <SectionPlaceholder height="500px" /> });
const FinalCTA       = dynamic(() => import("@/components/sections/FinalCTA"),       { ssr: false, loading: () => <SectionPlaceholder height="200px" /> });
const Footer         = dynamic(() => import("@/components/sections/Footer"),         { ssr: false, loading: () => <SectionPlaceholder height="120px" /> });

export default function LandingPageBody() {
  return (
    <>
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
    </>
  );
}
