import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const NotFound = () => {
  const { t } = useTranslation();
  const { domain } = useParams();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-700">
      <div className="text-center max-w-lg mx-auto">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-bold bg-gradient-to-r from-main to-main/60 text-transparent bg-clip-text mb-4">
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative"
        >
          <div className="w-64 h-64 mx-auto mb-8 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-full h-full text-gray-400 dark:text-gray-500"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            {t("notFound:title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
            {t("notFound:description")}
          </p>

          <Link
            to={`/${domain}`}
            className="inline-flex items-center gap-2 bg-main text-white py-3 px-8 rounded-full hover:bg-main/90 transition-all transform hover:scale-105 shadow-lg hover:shadow-main/20"
          >
            <span>←</span>
            {t("notFound:backHome")}
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
