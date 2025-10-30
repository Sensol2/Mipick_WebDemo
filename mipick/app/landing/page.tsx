import { 
  Header,
  Footer,
  Hero, 
  Features, 
  HowItWorks, 
  Fresh, 
  PickupStations, 
  SocialProof, 
  FAQ, 
  CTA 
} from "./components/index"

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