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
