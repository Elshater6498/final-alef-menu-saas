import { useTranslation } from "react-i18next";
import { BASE_URL } from "../constatns";
import { Link, useParams } from "react-router-dom";
import { useGlobalContext } from "../context";

const Item = ({ item, displayOnly = false }) => {
  const { t, i18n } = useTranslation();
  const { storeData } = useGlobalContext();
  const { domain } = useParams();

  return (
    <Link
      to={`/${domain}/products/${item.id}`}
      dir={i18n.language === "en" ? "ltr" : "rtl"}
      className={`w-full h-28 rounded-lg grid grid-cols-12 gap-2 cursor-pointer bg-gray-100 dark:bg-gray-900 ${
        displayOnly ? "pointer-events-none" : ""
      }`}
    >
      <div className="relative w-full rounded-lg col-span-4 sm:col-span-3 flex items-center justify-center">
        <img
          className="absolute inset-0 w-full h-full p-0.5 object-cover rounded-lg"
          src={
            item?.image
              ? item.image.startsWith("http")
                ? item.image
                : BASE_URL + item.image
              : storeData?.image
              ? BASE_URL + storeData.image
              : "/logo.png"
          }
          alt="item img"
        />
      </div>
      <div className="w-full relative col-span-8 sm:col-span-9 space-y-1 sm:space-y-2 px-2 flex flex-col justify-between">
        <h3 className="mt-2 text-sm text-main font-semibold  dark:text-white">
          {typeof item.name === "string" && item.name.startsWith("{")
            ? JSON.parse(item.name)[i18n.language] ||
              JSON.parse(item.name)["en"]
            : item.name}
        </h3>
        <p className="text-xs text-gray-800 dark:text-gray-400 overflow-hidden">
          {typeof item.details === "string" && item.details.startsWith("{")
            ? (() => {
                const parsedDetails =
                  JSON.parse(item.details)[i18n.language] ||
                  JSON.parse(item.details)["en"];
                return parsedDetails?.length > 50
                  ? `${parsedDetails.slice(0, 50)}...`
                  : parsedDetails;
              })()
            : item.details?.length > 50
            ? `${item.details?.slice(0, 50)}...`
            : item?.details}
        </p>
        <div className="flex justify-between py-2 items-center w-full">
          {item?.calories ? (
            <p className="text-sm dark:text-white">
              {item.calories}
              <span className="text-main text-xs font-semibold">
                {t("singleProduct:kcal")}
              </span>
            </p>
          ) : null}
          <span className="text-sm flex items-center font-semibold mr-auto ltr:ml-auto ltr:mr-0 dark:text-white">
            {item.price.toLocaleString("en-US")}
            <span className="text-main dark:text-white text-xs font-semibold mx-0.5">
              {i18n.language === "ar"
                ? storeData?.currency?.name
                : storeData?.currency?.enName}
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Item;
