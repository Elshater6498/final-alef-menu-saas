import { Link } from "react-router-dom";
import { FaWhatsapp, FaEnvelope, FaTiktok, FaTwitter, FaInstagram } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const Footer = () => {
  const { t } = useTranslation();

  const socialLinks = [
    {
      icon: <FaTiktok className="w-6 h-6" />,
      href: "https://www.tiktok.com/@menusoftco",
      label: "TikTok"
    },
    {
      icon: <FaTwitter className="w-6 h-6" />,
      href: "https://x.com/menusoftco",
      label: "X (Twitter)"
    },
    {
      icon: <FaInstagram className="w-6 h-6" />,
      href: "https://www.instagram.com/menusoftco",
      label: "Instagram"
    }
  ];

  const contactInfo = [
    {
      icon: <FaWhatsapp className="w-6 h-6" />,
      text: "+966566135585",
      href: "https://wa.me/+966566135585"
    },
    {
      icon: <FaEnvelope className="w-6 h-6" />,
      text: "hello@menu-sa.com",
      href: "hello@menu-sa.com"
    }
  ];

  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-8">
          {/* Social Media Links */}
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-white hover:text-gray-300 transition-colors"
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          {/* Contact Information */}
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 rtl:space-x-reverse">
            {contactInfo.map((contact, index) => (
              <motion.a
                key={index}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 rtl:space-x-reverse text-white hover:text-gray-300 transition-colors"
              >
                {contact.icon}
                <span>{contact.text}</span>
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center pt-8 border-t border-gray-800 w-full">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} MENUSOFT. {t("landing:allRightsReserved")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
