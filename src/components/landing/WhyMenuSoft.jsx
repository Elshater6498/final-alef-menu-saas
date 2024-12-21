import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const WhyMenuSoft = () => {
  const { t } = useTranslation();
  const whyMenuSoft = [
    {
      title: t("landing:whyMenuSoft.title1"),
      subtitle: t("landing:whyMenuSoft.subtitle1"),
      icon: "🎯",
    },
    {
      title: t("landing:whyMenuSoft.title2"),
      subtitle: t("landing:whyMenuSoft.subtitle2"),
      icon: "🚀",
    },
    {
      title: t("landing:whyMenuSoft.title3"),
      subtitle: t("landing:whyMenuSoft.subtitle3"),
      icon: "💎",
    },
    {
      title: t("landing:whyMenuSoft.title4"),
      subtitle: t("landing:whyMenuSoft.subtitle4"),
      icon: "✨",
    },
    {
      title: t("landing:whyMenuSoft.title5"),
      subtitle: t("landing:whyMenuSoft.subtitle5"),
      icon: "🛠️",
    },
    {
      title: t("landing:whyMenuSoft.title6"),
      subtitle: t("landing:whyMenuSoft.subtitle6"),
      icon: "⏰",
    },
  ];

  return (
    <section
      id="whyMenuSoft"
      className="py-16 bg-gradient-to-b from-blue-50 to-white"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-8"
        >
          {t("landing:whyMenuSoft.mainTitle")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-xl mb-4"
        >
          {t("landing:whyMenuSoft.mainSubTitle1")}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-lg mb-8"
        >
          {t("landing:whyMenuSoft.mainSubTitle2")}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyMenuSoft.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="p-6 flex flex-col items-center text-center">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <a href="#contact">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-orange-500 hover:bg-orange-700 text-white text-lg font-bold py-2 px-10 rounded-lg block mx-auto mt-20"
          >
            {t("landing:whyMenuSoft.startNow")}
          </motion.button>
        </a>
      </div>
    </section>
  );
};

export default WhyMenuSoft;
