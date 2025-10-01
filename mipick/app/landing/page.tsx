import { Header, Footer } from "@/app/components/layout"
import { 
  Hero, 
  Features, 
  HowItWorks, 
  Fresh, 
  PickupStations, 
  SocialProof, 
  FAQ, 
  CTA 
} from "@/app/components/landing"

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
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