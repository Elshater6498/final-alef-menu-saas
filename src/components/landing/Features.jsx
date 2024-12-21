import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { 
  FaQrcode, FaPalette, FaEdit, FaImage, FaInfinity, FaShareAlt, 
  FaClock, FaChartLine, FaSync, FaMobile, FaInfoCircle, FaSmile,
  FaHeadset, FaLink, FaMapMarkerAlt, FaLanguage, FaComments,
  FaUtensils, FaTruck, FaEye, FaTasks
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Features = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: <FaEdit />,
      description: t("landing:features.feature1")
    },
    {
      icon: <FaEye />,
      description: t("landing:features.feature2")
    },
    {
      icon: <FaTasks />,
      description: t("landing:features.feature3")
    },
    {
      icon: <FaPalette />,
      description: t("landing:features.feature4")
    },
    {
      icon: <FaImage />,
      description: t("landing:features.feature5")
    },
    {
      icon: <FaInfinity />,
      description: t("landing:features.feature6")
    },
    {
      icon: <FaShareAlt />,
      description: t("landing:features.feature7")
    },
    {
      icon: <FaClock />,
      description: t("landing:features.feature8")
    },
    {
      icon: <FaChartLine />,
      description: t("landing:features.feature9")
    },
    {
      icon: <FaSync />,
      description: t("landing:features.feature10")
    },
    {
      icon: <FaMobile />,
      description: t("landing:features.feature11")
    },
    {
      icon: <FaInfoCircle />,
      description: t("landing:features.feature12")
    },
    {
      icon: <FaSmile />,
      description: t("landing:features.feature13")
    },
    {
      icon: <FaHeadset />,
      description: t("landing:features.feature14")
    },
    {
      icon: <FaQrcode />,
      description: t("landing:features.feature15")
    },
    {
      icon: <FaMapMarkerAlt />,
      description: t("landing:features.feature16")
    },
    {
      icon: <FaLanguage />,
      description: t("landing:features.feature17")
    },
    {
      icon: <FaComments />,
      description: t("landing:features.feature18")
    },
    {
      icon: <FaUtensils />,
      description: t("landing:features.feature19")
    },
    {
      icon: <FaTruck />,
      description: t("landing:features.feature20")
    },
  ];

  return (
    <section id='features' className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          {t("landing:features.title")}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-2">
          {t("landing:features.subtitle1")}
          </p>
          <p className="text-lg sm:text-xl text-gray-600">
          {t("landing:features.subtitle2")}
          </p>
        </motion.div>

        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          dir='rtl'
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            }
          }}
          className="!pb-14"
        >
          {features.map((feature, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.1,
                  duration: 0.5,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 h-full"
              >
                <div className="p-6 sm:p-8 flex flex-col items-center text-center gap-4 h-full">
                  <div className="text-black text-4xl sm:text-5xl md:text-6xl mb-2 transform hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <p className="text-base sm:text-lg text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Features;