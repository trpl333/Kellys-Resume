import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import HeroSection from "./components/HeroSection";
import SignatureImpact from "./components/SignatureImpact";
import AtAGlance from "./components/AtAGlance";
import ImpactPreview from "./components/ImpactPreview";
import LeadershipPreview from "./components/LeadershipPreview";
import CredentialsStrip from "./components/CredentialsStrip";
import FinalCTA from "./components/FinalCTA";

export default function HomePage() {
  const location = useLocation();

  useLayoutEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [location.hash, location.pathname]);

  return (
    <div className="min-h-screen font-['Inter']">
      <Navbar />
      <main>
        <HeroSection />
        <SignatureImpact />
        <AtAGlance />
        <ImpactPreview />
        <LeadershipPreview />
        <CredentialsStrip />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
