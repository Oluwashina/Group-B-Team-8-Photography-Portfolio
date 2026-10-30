import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import MainContent from "../components/MainContent";

export default function HomePage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const target = document.querySelector(hash);
    target?.scrollIntoView({ behavior: "smooth" });
  }, [hash]);

  return (
    <>
      <Hero />
      <MainContent />
      <Footer />
    </>
  );
}
