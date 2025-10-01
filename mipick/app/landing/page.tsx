import Header from "@/app/components/Header"
import Hero from "@/app/components/Hero"
import Features from "@/app/components/Features"
import HowItWorks from "@/app/components/HowItWorks"
import Fresh from "@/app/components/Fresh"
import PickupStations from "@/app/components/PickupStations"
import SocialProof from "@/app/components/SocialProof"
import FAQ from "@/app/components/FAQ"
import CTA from "@/app/components/CTA"
import Footer from "@/app/components/Footer"

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Fresh />
        <PickupStations />
        <SocialProof />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  )
}