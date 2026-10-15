import BackgroundMesh from "@/components/background-mesh.tsx";
import Footer from "@/components/footer.tsx";
import Header from "@/components/header.tsx";
import AboutSection from "@/components/sections/about-section.tsx";
import ContactSection from "@/components/sections/contact-section.tsx";
import ExperienceSection from "@/components/sections/experience-section.tsx";
import HeroSection from "@/components/sections/hero-section.tsx";
import ProjectsSection from "@/components/sections/projects-section.tsx";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Background Glow Mesh */}
      <BackgroundMesh />

      {/* Floating Header */}
      <Header />

      {/* Main Content Container */}
      <main className="relative pt-16 sm:pt-24 pb-24 space-y-28 sm:space-y-36">
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
