import { useTranslation } from "react-i18next";
import { useGlobalContext } from "../context";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../constatns";
import { IoArrowBack } from "react-icons/io5";

export default function About() {
  const { t, i18n } = useTranslation(["aboutUs"]);
  const { storeData } = useGlobalContext();
  const navigate = useNavigate();
  const { domain } = useParams();
  const isRTL = i18n.language === "ar";

  return (
    <div className="min-h-screen dark:bg-gray-700 fastAnimate">
      {/* Back Button */}
      <div className="flex items-center justify-end p-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-start gap-2 text-sm text-main py-1.5 px-3 bg-white dark:bg-gray-700 border border-main rounded-full"
        >
          <span className="ltr:translate-y-0 rtl:-translate-y-0.5 font-semibold">
            {t("back")}
          </span>
          <IoArrowBack className="text-lg ltr:rotate-180 rtl:rotate-0" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center px-4 py-6">
        {/* Cover Image */}
        <div className="w-full mb-16 relative">
          <div className="rounded-lg overflow-hidden shadow-sm h-48">
            <img
              src={
                storeData?.detailsImage
                  ? BASE_URL + storeData?.detailsImage
                  : "/img/bg.png"
              }
              alt="detailsImage"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Store Image */}
          <img
            src={storeData?.image ? BASE_URL + storeData?.image : "/logo.png"}
            alt={storeData?.name}
            className="w-32 h-32 absolute -bottom-16 left-1/2 -translate-x-1/2 rounded-full shadow-lg border-4 border-white dark:border-gray-800"
          />
        </div>

        {/* Store Info */}
        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md mb-8">
          <h1 className="text-2xl font-bold text-main mb-4 text-center">
            {storeData?.name}
          </h1>
          <div
            dangerouslySetInnerHTML={{ __html: storeData?.details }}
            className="text-gray-600 dark:text-gray-300 leading-relaxed text-center"
          />
        </div>

        {/* Home Button */}
        <button
          onClick={() => navigate(`/${domain}`)}
          className="bg-main text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition-colors inline-flex items-center gap-2 shadow-md"
        >
          {t("goToHome")}
          {isRTL ? <BsArrowLeft /> : <BsArrowRight />}
        </button>
      </div>
    </div>
  );
}
