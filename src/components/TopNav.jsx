import { useTranslation } from "react-i18next";
import { RiMenu2Fill, RiPhoneLine, RiWhatsappLine } from "react-icons/ri";
import { useGlobalContext } from "../context";

export default function TopNav() {
  const { t, i18n } = useTranslation();
  const { storeData, isRestaurantOpen, setSideNav, setShowHours } =
    useGlobalContext();

  const changeLang = () => {
    i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar");
    localStorage.setItem("lng", i18n.language);
  };

  return (
    <header className="z-30 transition bg-white duration-200 dark:bg-opacity-300 relative">
      <nav className="z-30 relative App-header absolutee left-0 right-0 text-white">
        <div className="z-50 w-full max-w-md mx-auto px-4 h-16 top-auto rounded-t-4xl py-1 flex items-center justify-between gap-2 dark:bg-gray-700 bg-opacity-50">
          <div className="flex justify-end items-center gap-2">
            <div
              className="col-span-2 w-10 h-10 p-2 rounded-full text-black transition duration-200 dark:text-gray-100 hover:bg-gray-400 hover:bg-opacity-50 flex justify-center items-center"
              onClick={() => setSideNav(true)}
            >
              <RiMenu2Fill className="text-2xl text-main dark:text-white ltr:rotate-0 rtl:rotate-180" />
            </div>
            <button
              className="text-main dark:text-white p-2 rounded-full w-10 h-10 hover:bg-gray-200 dark:hover:bg-gray-600"
              onClick={changeLang}
            >
              {i18n.language === "ar" ? "EN" : "AR"}
            </button>
          </div>

          {storeData?.showDates && (
            <span
              onClick={() => setShowHours(true)}
              className={`px-2 py-0.5 mt-2 text-sm rounded-full cursor-pointer ${
                isRestaurantOpen
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
              }`}
            >
              {isRestaurantOpen ? t("common:open") : t("common:closed")}
            </span>
          )}
          {(storeData?.whatsapp || storeData?.phone) && (
            <div className="flex items-center gap-2">
              {storeData?.whatsapp && (
                <a
                  href={`https://wa.me/${storeData?.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="transition text-gray-800 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  <RiWhatsappLine className="text-main text-2xl dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600" />
                </a>
              )}
              {storeData?.phone && (
                <a
                  href={`tel:${storeData?.phone}`}
                  target="_blank"
                  rel="noreferrer"
                  className="transition text-gray-800 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  <RiPhoneLine className="text-main text-2xl dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600" />
                </a>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
