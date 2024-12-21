import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Packages = () => {
  const { t } = useTranslation();

  const sharedFeatures = [
    t("landing:plans.features.dinamicMenu"),
    t("landing:plans.features.qr"),
    t("landing:plans.features.logo"),
    t("landing:plans.features.appearance"),
    t("landing:plans.features.dashboard"),
    t("landing:plans.features.socialMedia"),
    t("landing:plans.features.googleMap"),
    t("landing:plans.features.hours"),
    t("landing:plans.features.language"),
    t("landing:plans.features.intro"),
    t("landing:plans.features.products"),
    t("landing:plans.features.categories"),
    t("landing:plans.features.customerReviews"),
    t("landing:plans.features.whatsapp"),
    t("landing:plans.features.edits"),
    t("landing:plans.features.team"),
    t("landing:plans.features.manager"),
    t("landing:plans.features.support"),
  ]

  const packages = [
    {
      title: t("landing:plans.basic"),
      packageTitle: t("landing:plans.basicTitle"),
      packageSubtitle: t("landing:plans.basicSubtitle"),
      features: sharedFeatures
    },
    {
      title: t("landing:plans.premium"),
      packageTitle: t("landing:plans.premiumTitle"),
      packageSubtitle: t("landing:plans.premiumSubtitle"),
      features: [
        ...sharedFeatures,
        t("landing:plans.features.order"),
        t("landing:plans.features.type"),
        t("landing:plans.features.location"),
        t("landing:plans.features.table"),
        t("landing:plans.features.tableNumber"),
        t("landing:plans.features.notes"),
        t("landing:plans.features.print"),
        t("landing:plans.features.tracking"),
      ]
    }
  ];

  return (
    <section id="plans" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">{t("landing:plans.title")}</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 max-w-5xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col h-full"
            >
              <div className="border-2 border-black rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-center bg-white p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-black">{pkg.title}</h3>
                  <p className="text-base sm:text-lg text-gray-800 mb-2">{pkg.packageTitle}</p>
                  <p className="text-base sm:text-lg text-gray-600">{pkg.packageSubtitle}</p>
                </div>

                <div className="bg-black p-6 sm:p-8">
                  <ul className="space-y-4">
                    {pkg.features.map((feature, idx) => (
                      <motion.li 
                        key={idx} 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05, duration: 0.3 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3"
                      >
                        <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-white text-sm sm:text-base">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <a
                  href="#contact" 
                  className="inline-block px-8 py-3 bg-black text-white text-base sm:text-lg rounded-full hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  {t("landing:plans.startNow")}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;