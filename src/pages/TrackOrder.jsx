import { useTranslation } from "react-i18next";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import useSWR from "swr";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";

import { Item } from "../components";
import { BASE_URL, FETCHER, options } from "../constatns";
import { IoArrowBack } from "react-icons/io5";
import { useGlobalContext } from "../context";

const TrackOrder = () => {
  const { orderId, domain } = useParams();
  const { storeData } = useGlobalContext();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const option = searchParams.get("option");

  const { data } = useSWR(
    `${BASE_URL}/orders/track/${orderId}?resid=${storeData?.id}`,
    FETCHER
  );

  const orderStatus = {
    PENDING: {
      AR: "جاري مراجعة طلبك",
      EN: "Your Order is being reviewed",
    },
    DONE: {
      AR: "تم قبول الطلب وجاري التجهيز",
      EN: "Order accepted and processing is in progress",
    },
    FAILED: {
      AR: "تم رفض طلبك",
      EN: "Order has been rejected",
    },
  };

  const orderDelivery = {
    IN_RESTAURANT: {
      AR: "داخل المطعم",
      EN: "in restaurant",
    },
    DELIVERY: {
      AR: "توصيل الى موقع العميل",
      EN: "receive at home",
    },
    TAKEAWAY: {
      AR: "استلام من الفرع",
      EN: "receive at branch",
    },
  };

  const getDeliveryTypeDisplay = (orderType) => {
    if (!orderType) return "";

    const isEnglish = i18n.language === "en";

    switch (orderType) {
      case options.INRESTAURANT:
        return isEnglish
          ? orderDelivery.IN_RESTAURANT.EN
          : orderDelivery.IN_RESTAURANT.AR;
      case options.TAKEAWAY:
        return isEnglish
          ? orderDelivery.TAKEAWAY.EN
          : orderDelivery.TAKEAWAY.AR;
      case options.DELIVERY:
        return isEnglish
          ? orderDelivery.DELIVERY.EN
          : orderDelivery.DELIVERY.AR;
      default:
        return "";
    }
  };

  return (
    <>
      <div className="flex items-center justify-end">
        <button
          onClick={() => navigate(`/${domain}`)}
          className="flex items-center justify-start mx-4 gap-2 text-sm text-main py-1.5 px-3 bg-white dark:bg-gray-700 border border-main rounded-full"
        >
          <span className="ltr:translate-y-0 rtl:-translate-y-0.5 font-semibold">
            {t("aboutUs:goToHome")}
          </span>
          <IoArrowBack className="text-lg ltr:rotate-180 rtl:rotate-0" />
        </button>
      </div>
      {/* Order Details */}
      {data?.status ? (
        <>
          <div className="divide-y pt-4 dark:text-white">
            <div className="flex flex-col gap-4 p-4">
              <div className="flex items-center gap-2 py-4">
                <p className="md:text-lg lg:text-xl font-bold">
                  {t("trackOrder:status")}:
                </p>
                <h2 className="text-main text-xl md:text-2xl font-bold">
                  {data?.status === "pending"
                    ? i18n.language === "en"
                      ? orderStatus.PENDING.EN
                      : orderStatus.PENDING.AR
                    : data?.status === "completed"
                    ? i18n.language === "en"
                      ? orderStatus.DONE.EN
                      : orderStatus.DONE.AR
                    : i18n.language === "rejected"
                    ? orderStatus.FAILED.EN
                    : orderStatus.FAILED.AR}
                </h2>
              </div>
              <div className="flex items-center justify-between flex-wrap gap-2 w-full">
                <div className="text-gray-600 text-sm dark:text-white">
                  {t("trackOrder:order_time")}:{" "}
                  <span className="font-bold text-gray-700 text-base dark:text-gray-300">
                    {format(new Date(data?.createdAt), "PPPP - p", {
                      locale: i18n.language === "ar" ? ar : enUS,
                    })}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4 flex flex-col md:flex-row gap-4">
              <div className="flex flex-col gap-3 flex-1">
                <h4 className="text-xl font-bold">
                  {t("trackOrder:client_name")}
                </h4>
                <p className="text-main">{data?.customerName}</p>
              </div>
              {(option !== options.INRESTAURANT ||
                data?.orderType !== options.INRESTAURANT) && (
                <div className="flex flex-col gap-3 flex-1">
                  <h4 className="text-xl font-bold">
                    {t("trackOrder:payment")}
                  </h4>
                  <p className="text-gray-700 dark:text-white">
                    {t("trackOrder:payment_when_recieving")}
                  </p>
                </div>
              )}
              <div className="flex flex-col gap-3 flex-1">
                <h4 className="text-xl font-bold">
                  {t("trackOrder:recieving_method")}
                </h4>
                <div className="flex flex-col gap-2">
                  <p className="text-main font-semibold">
                    {getDeliveryTypeDisplay(data?.orderType)}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full p-4 flex flex-col gap-4">
              <h3 className="text-lg md:text-xl font-semibold">
                {t("trackOrder:order_details")}
              </h3>
              <div className="flex flex-col gap-4">
                {data?.products &&
                  data?.products?.map((item, i) => (
                    <Item item={item} key={i} displayOnly={true} />
                  ))}
              </div>
              <div className="flex items-center gap-2">
                <p className="dark:text-white text-lg font-semibold">
                  {t("cart:total")}
                </p>
                <div className="flex items-center font-semibold gap-2 dark:text-white">
                  <span className="text-main dark:text-white text-2xl font-semibold">
                    {data?.totalPrice}
                  </span>
                  {i18n.language === "ar"
                    ? storeData?.currency?.name
                    : storeData?.currency?.enName}
                </div>
              </div>
            </div>
          </div>
          <Link
            to={`/${domain}`}
            className="text-white mb-6 mx-auto w-fit block mt-8 bg-main py-2 px-6 rounded-full text-center"
          >
            {t("trackOrder:home_page")}
          </Link>
        </>
      ) : (
        <div className="flex items-center justify-center py-20 flex-col gap-8">
          <h2 className="text-main text-center text-xl md:text-2xl lg:text-3xl font-bold">
            {t("trackOrder:no_order")}
          </h2>
          <Link
            to={`/${domain}`}
            className="text-white bg-main py-2 px-6 rounded-full text-center"
          >
            {t("trackOrder:home_page")}
          </Link>
        </div>
      )}
    </>
  );
};

export default TrackOrder;
