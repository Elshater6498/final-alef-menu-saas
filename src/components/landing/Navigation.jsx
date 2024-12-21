import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaBars, FaTimes } from "react-icons/fa";

const Navigation = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLanguage = () => {
    i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { href: "/", text: t("landing:navigation.home") },
    { href: "#features", text: t("landing:navigation.features") },
    { href: "#whyMenuSoft", text: t("landing:navigation.whyMenuSoft") },
    { href: "#faq", text: t("landing:navigation.faq") },
    { href: "#plans", text: t("landing:navigation.plans") },
    { href: "#contact", text: t("landing:navigation.contact") },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 py-2 px-4 transition-all duration-300 ${
        isScrolled ? "bg-white/50 backdrop-blur-md" : "bg-white"
      }`}
    >
      <div className="container flex items-center justify-between max-w-6xl mx-auto">
        <a href="/">
          <img src="/logo.png" alt="logo" className="w-20 rounded-md" />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-black hover:text-black/50 transition-colors"
            >
              {link.text}
            </a>
          ))}
        </div>

        <a
            href="https://menu-saas-cp.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-black/50 transition-colors"
          >
            {t("landing:navigation.dashboard")}
          </a>

        {/* Mobile Menu Button */}
        <div className="flex items-center justify-center">
          <button
            className="lg:hidden text-black p-2 rounded-lg transition-colors"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* Mobile Menu */}
          <div
            className={`fixed inset-0 lg:hidden transition-transform duration-300 ${
              isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
            style={{ top: "150px" }}
          >
            <div className="flex flex-col items-center py-8 m-5 rounded-md gap-6 bg-black/95">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors text-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              switchLanguage();
              setIsMobileMenuOpen(false);
            }}
            className="font-semibold text-lg px-4 py-2 text-black transition-colors"
          >
            {i18n.language === "ar" ? "EN" : "AR"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
