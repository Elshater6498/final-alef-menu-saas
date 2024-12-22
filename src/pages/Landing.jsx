import Header from "../components/landing/Header";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import Clients from "../components/landing/Clients";
import Pricing from "../components/landing/Pricing";
import ScrollToTop from "../components/landing/ScrollToTop";
import Footer from "../components/landing/Footer";
import { useTranslation } from "react-i18next";
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
const Landing = () => {
  const { i18n } = useTranslation();

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/+201151220529", "_blank");
  };

  return (
    <div
      className="rtl:font-fairuz relative"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <Header />
      <main className='max-w-5xl mx-auto px-5'>
        <Hero />
        <Features />
        <HowItWorks />
        <Clients />
        <Pricing />
      </main>
      <ScrollToTop />
      <Footer />

      {/* WhatsApp Fixed Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleWhatsAppClick}
        className="fixed left-6 bottom-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300"
        aria-label="Contact us on WhatsApp"
      >
        <FaWhatsapp className="text-3xl" />
      </motion.button>
    </div>
  );
};

export default Landing;
