import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBack, IoArrowBackCircle, IoStorefront } from "react-icons/io5";

import { useGlobalContext } from "../context";
import { CartItem } from "../components";

const CartPage = () => {
  const { cartData, storeData, isRestaurantOpen } = useGlobalContext();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { domain } = useParams();

  return (
    <div className="fastAnimate">
      <div className="flex items-center justify-end">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-start mx-4 gap-2 text-sm text-main py-1.5 px-3 bg-white dark:bg-gray-700 border border-main rounded-full"
        >
          <span className="ltr:translate-y-0 rtl:-translate-y-0.5 font-semibold">
            {t("cart:back")}
          </span>
          <IoArrowBack className="text-lg ltr:rotate-180 rtl:rotate-0" />
        </button>
      </div>
      <div className="w-full pt-8 px-4 flex flex-col gap-4 items-center justify-end bg-white dark:bg-gray-700">
        {cartData.length > 0 ? (
          cartData.map((item, i) => <CartItem key={i} item={item} />)
        ) : (
          <div className="w-full flex items-center font-semibold gap-4 justify-center flex-col my-20 dark:text-white">
            <img
              src="/img/add-to-basket.png"
              alt="add to basket icon"
              width="100em"
              height="100em"
            />
            <h2 className="text-3xl text-center text-main dark:text-white">
              {t("cart:emptyCart")}
            </h2>
            <button
              onClick={() => navigate(-1)}
              className={`font-semibold flex items-center justify-center text-main gap-2 border-2 border-main rounded-full py-2 px-4 w-full dark:bg-gray-900 dark:text-white dark:border-[#111827] ${
                i18n.language === "en" ? "flex-row-reverse" : ""
              }`}
            >
              <IoArrowBackCircle className="text-2xl icon-flip" />{" "}
              {t("cart:back")}
            </button>
          </div>
        )}
      </div>
      {cartData.length > 0 ? (
        <div className="flex flex-col gap-4 my-6 justify-start px-4">
          <div className="flex items-center justify-between foa9l">
            <p className="border-main text-main dark:text-white text-lg font-semibold">
              {t("cart:total")}
            </p>
            <div className="flex items-center font-semibold gap-2 dark:text-white">
              <span className="text-main dark:text-white text-lg font-semibold">
                {cartData
                  .reduce((acc, item) => acc + item.price, 0)
                  .toLocaleString("en-US")}
              </span>
              {i18n.language === "ar"
                ? storeData?.currency?.name
                : storeData?.currency?.enName}
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {storeData?.taxService}
          </p>

          <div className="font-semibold flex flex-col gap-4">
            {!isRestaurantOpen ? (
              <div className="bg-red-50 dark:bg-gray-800 border border-red-200 dark:border-red-900 rounded-lg p-4 mb-2">
                <div className="flex items-center gap-3 text-red-700 dark:text-red-400">
                  <IoStorefront className="text-xl" />
                  <h3 className="font-bold">{t("cart:restaurantClosed")}</h3>
                </div>
              </div>
            ) : null}

            <button
              onClick={() => navigate(`/${domain}/options`)}
              className={`py-2 w-full rounded-full text-center transition-all duration-200 ${
                isRestaurantOpen
                  ? "bg-main text-white hover:bg-main/90"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400"
              }`}
              disabled={!isRestaurantOpen}
            >
              {isRestaurantOpen
                ? t("cart:next")
                : t("cart:restaurantCurrentlyClosed")}
            </button>

            <button
              onClick={() => navigate(-1)}
              className="font-semibold flex items-center justify-center text-gray-900 gap-2 rounded-full py-2 px-4 w-full bg-gray-200 dark:bg-gray-900 dark:text-white dark:border-[#111827]"
            >
              {t("cart:back")}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CartPage;
