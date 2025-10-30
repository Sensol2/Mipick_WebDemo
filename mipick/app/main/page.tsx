import IntroSection from "./intro/legacy";
import OrderSection from "./order/OrderSection";
import PaymentSection from "./payment/PaymentSection";

export default function Home() {
  return (
    <>
      {/* <IntroSection /> */}

      <OrderSection />

      <PaymentSection />
    </>
  );
}
