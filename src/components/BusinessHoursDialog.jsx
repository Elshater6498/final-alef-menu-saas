import { useTranslation } from "react-i18next";
import { BsX, BsClock } from "react-icons/bs";
import { useGlobalContext } from "../context";

const BusinessHoursDialog = ({ setModalOn }) => {
  const { t } = useTranslation();
  const { storeData } = useGlobalContext();

  const handleClose = (e) => {
    if (e.target.id === "container") setModalOn(false);
  };

  const getDayName = (dayIndex) => {
    const days = {
      ar: [
        "الأحد",
        "الإثنين",
        "الثلاثاء",
        "الأربعاء",
        "الخميس",
        "الجمعة",
        "السبت",
      ],
      en: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    };
    return days[t("common:lang")][dayIndex];
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date.toLocaleTimeString(t("common:lang"), {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const isCurrentDay = (dayIndex) => {
    return new Date().getDay() === dayIndex;
  };

  return (
    <div
      className="fixed z-[105] inset-0 flex items-center justify-center bg-black/50 px-4"
      id="container"
      onClick={handleClose}
    >
      <div className="max-w-md mx-auto absolute bottom-0 left-1/2 -translate-x-1/2 w-full bg-white dark:bg-gray-700 dark:text-white rounded-t-2xl overflow-hidden">
        <div className="flex items-center justify-between w-full mb-2 sticky top-0 bg-white dark:bg-gray-700 p-4 shadow-md">
          <div className="flex items-center gap-2">
            <BsClock className="text-main text-xl" />
            <h3 className="text-lg md:text-xl font-bold">
              {t("sideNav:businessHours")}
            </h3>
          </div>
          <button onClick={() => setModalOn(false)}>
            <BsX className="bg-red-500 text-white p-1 rounded-full text-3xl" />
          </button>
        </div>

        <div className="p-4 flex flex-col gap-2">
          {storeData?.date.map((schedule, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg transition-colors
                ${
                  isCurrentDay(schedule.day)
                    ? "bg-main/10 dark:bg-main/20"
                    : "bg-gray-50 dark:bg-gray-600"
                }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`font-semibold ${
                    isCurrentDay(schedule.day) ? "text-main" : ""
                  }`}
                >
                  {getDayName(schedule.day)}
                </span>
                {isCurrentDay(schedule.day) && (
                  <span className="text-xs bg-main text-white px-2 py-0.5 rounded-full">
                    {t("common:today")}
                  </span>
                )}
              </div>
              <span className="text-sm">
                {!schedule.off
                  ? t("common:closed")
                  : `${formatTime(schedule.openedFrom)} - ${formatTime(
                      schedule.openedTo
                    )}`}
              </span>
            </div>
          ))}
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-600 mt-2">
          <p className="text-sm text-gray-500 dark:text-gray-300 text-center">
            {t("common:businessHoursNote")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BusinessHoursDialog;
