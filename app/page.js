import Hero from "@/components/Hero";
import Header from "@/components/Header";
import FeaturesGrid from "@/components/FeaturesGrid";
import Footer from "@/components/Footer";

export default function Page() {
  const redirectLink = "/signin"
  return (
    <>
      <Header />
      <Hero/>
      <FeaturesGrid/>
      <Footer />
    </>
  );
}