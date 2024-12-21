import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const FAQ = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: t("landing:faq.question1"),
      answer: t("landing:faq.answer1")
    },
    {
      question: t("landing:faq.question2"),
      answer: t("landing:faq.answer2")
    },
    {
      question: t("landing:faq.question3"),
      answer: t("landing:faq.answer3")
    },
    {
      question: t("landing:faq.question4"),
      answer: t("landing:faq.answer4")
    },
    {
      question: t("landing:faq.question5"),
      answer: t("landing:faq.answer5")
    },
    {
      question: t("landing:faq.question6"),
      answer: t("landing:faq.answer6")
    },
    {
      question: t("landing:faq.question7"),
      answer: t("landing:faq.answer7")
    },
    {
      question: t("landing:faq.question8"),
      answer: t("landing:faq.answer8")
    },
    {
      question: t("landing:faq.question9"),
      answer: t("landing:faq.answer9")
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id='faq' className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">{t("landing:faq.title")}</h2> 
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full p-4 text-start flex items-center justify-between bg-black text-white hover:bg-black/90 transition-colors"
              >
                <span className="text-lg font-semibold">{faq.question}</span>
                {activeIndex === index ? (
                  <FaMinus className="flex-shrink-0" />
                ) : (
                  <FaPlus className="flex-shrink-0" />
                )}
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white"
                  >
                    <div className="p-4 text-gray-600">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;