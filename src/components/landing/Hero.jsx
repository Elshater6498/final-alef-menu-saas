import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section id="hero" className="bg-black text-white min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:grid md:grid-cols-2 gap-8 md:gap-12 py-12 sm:py-16 md:py-20 pt-28 sm:pt-32 md:pt-40"
        >
          <div className='col-span-1 space-y-6 sm:space-y-8 md:space-y-10 flex flex-col justify-center'>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex flex-col items-center space-y-3 sm:space-y-4 md:space-y-6"
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ">{t("landing:hero.heroDesc1")}</h1>
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold leading-tight text-gray-200 ">{t("landing:hero.heroDesc2")}</h3>
                <h5 className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium leading-tight text-gray-300 ">{t("landing:hero.heroDesc3")}</h5>
              </motion.div>
            <div className="flex flex-row gap-4">
              <a 
                href='#whyMenuSoft' 
                className="bg-white text-black px-6 sm:px-8 py-3 rounded-full hover:bg-gray-200 transition-colors text-center text-base sm:text-lg"
              >
                {t("landing:hero.knowMore")}
              </a>
              <a
                href="#contact"
                className="bg-white text-black px-6 sm:px-8 py-3 rounded-full hover:bg-gray-200 transition-colors text-center text-base sm:text-lg"
              >
                {t("landing:hero.contact")}
              </a>
            </div>
          </div>
          <div className="col-span-1 min-h-[300px] h-[45vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] rounded-lg overflow-hidden">
            <img 
              src="/landing/hero.png" 
              alt="hero-image" 
              className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105" 
            />
          </div>
        </motion.div>
    </section>
  );
};

export default Hero;