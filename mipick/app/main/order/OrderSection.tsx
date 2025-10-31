import { CTASpacer } from "../components/CTA";
import HeaderSection from "./components/HeaderSection";
import ImageSection from "./components/ImageSection";
import InfoButton from "./components/InfoButton";
import OptionSection from "./components/OptionSection";
import PriceSection from "./components/PriceSection";
import TogetherSection from "./components/TogetherSection";

export default function OrderSection() {
  return (
    <>
      <HeaderSection />
      <ImageSection />
      <InfoButton />
      <OptionSection />
      <TogetherSection />
      <PriceSection />
      <CTASpacer />
    </>
  );
}
