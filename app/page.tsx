import Header from "@/app/components/header";
import HeroSection from "@/app/components/hero-section";
import AboutSection from "@/app/components/about-section";
import ProjectsSection from "@/app/components/projects-section";
import ExperienceSection from "@/app/components/experience-section";
import ContactSection from "@/app/components/contact-section";
import Footer from "@/app/components/footer";
import BackgroundMesh from "@/app/components/background-mesh";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Background Glow Mesh */}
      <BackgroundMesh />

      {/* Floating Header */}
      <Header />

      {/* Main Content Container */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-24 space-y-28 sm:space-y-36">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      {/* Minimal Footer */}
      <Footer />
    </div>
  );
}
