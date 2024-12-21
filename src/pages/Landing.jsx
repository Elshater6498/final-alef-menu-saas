import Navigation from "../components/landing/Navigation";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import FAQ from "../components/landing/FAQ";
import Packages from "../components/landing/Packages";
import Contact from "../components/landing/Contact";
import Footer from "../components/landing/Footer";
import { useTranslation } from "react-i18next";
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import WhyMenuSoft from "../components/landing/WhyMenuSoft";

const Landing = () => {
  const { i18n } = useTranslation();

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/+966566135585", "_blank");
  };

  return (
    <div
      className="rtl:font-fairuz relative"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <Navigation />
      <main>
        <Hero />
        <Features />
        <WhyMenuSoft />
        <FAQ />
        <Packages />
        <Contact />
      </main>
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
