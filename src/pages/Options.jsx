import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BsBagCheck, BsBicycle, BsShop } from "react-icons/bs";
import { options } from "../constatns";
import { useGlobalContext } from "../context";
import { IoArrowBack } from "react-icons/io5";
import { useState } from "react";

const Options = () => {
  const { t, i18n } = useTranslation();
  const { storeData } = useGlobalContext();
  const navigate = useNavigate();
  const { domain } = useParams();
  const errMessage = t("customerData:fieldRequired");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if(data.delivery === options.INRESTAURANT) navigate(`/${domain}/inRestaurant`);
    else navigate(`/${domain}/delivery?option=${data.delivery}`);
  };

  return (
    <>
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
        <form
          className="w-full h-full flex flex-col pt-4 gap-3 px-4 bg-white animateItems dark:bg-gray-700"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            {errors?.delivery && (
              <small className="text-red-500 text-center">
                {errors.delivery.message}
              </small>
            )}
            <div className="flex flex-col items-center justify-center gap-8 py-4">
              {storeData?.delivery && (
                <div>
                  <input
                    type="radio"
                    className="hidden peer"
                    id={options.DELIVERY}
                    value={options.DELIVERY}
                    {...register("delivery", {
                      required: {
                        value: true,
                        message: errMessage,
                      },
                    })}
                  />
                  <label
                    className={`peer-checked:border-main peer-checked:bg-main text-gray-700 peer-checked:text-white flex flex-col items-center justify-center gap-3 border p-2 w-44 h-28 rounded-md dark:text-white ${
                      errors.delivery ? "border-red-500" : "border-gray-400"
                    }`}
                    htmlFor={options.DELIVERY}
                  >
                    <BsBicycle className="text-5xl" />
                    <span className="text-sm">
                      {t("customerData:delivery")}
                    </span>
                  </label>
                  {storeData?.shippingFees !== 0 && (
                    <span className="text-xs text-gray-700 dark:text-white text-center block mt-1">
                      {t("customerData:deliveryFees", {
                        number: storeData?.shippingFees || 0,
                        currency:
                          i18n.language === "en"
                            ? storeData?.currency?.enName
                            : storeData?.currency?.name || "SAR",
                      })}
                    </span>
                  )}
                </div>
              )}
              {storeData?.takeaway && (
                <div>
                  <input
                    type="radio"
                    className="hidden peer"
                    id={options.TAKEAWAY}
                    value={options.TAKEAWAY}
                    {...register("delivery", {
                      required: {
                        value: true,
                        message: errMessage,
                      },
                    })}
                  />
                  <label
                    className={`peer-checked:border-main peer-checked:bg-main text-gray-700 peer-checked:text-white flex flex-col dark:text-white items-center justify-center gap-3 border p-2 w-44 h-28 rounded-md ${
                      errors.delivery ? "border-red-500" : "border-gray-400"
                    }`}
                    htmlFor={options.TAKEAWAY}
                  >
                    <BsBagCheck className="text-5xl" />
                    <span className="text-sm">
                      {t("customerData:branchReceipt")}
                    </span>
                  </label>
                </div>
              )}
              {storeData?.inRestaurant && (
                <div>
                  <input
                    type="radio"
                    className="hidden peer"
                    id={options.INRESTAURANT}
                    value={options.INRESTAURANT}
                    {...register("delivery", {
                      required: {
                        value: true,
                        message: errMessage,
                      },
                    })}
                  />
                  <label
                    className={`peer-checked:border-main peer-checked:bg-main text-gray-700 peer-checked:text-white flex flex-col items-center justify-center gap-3 border w-44 h-28 p-2 rounded-md dark:text-white ${
                      errors.delivery ? "border-red-500" : "border-gray-400"
                    }`}
                    htmlFor={options.INRESTAURANT}
                  >
                    <BsShop className="text-5xl" />
                    <span className="text-sm">
                      {t("customerData:inRestaurant")}
                    </span>
                  </label>
                </div>
              )}
            </div>
          </div>
          <button
            className="bg-main font-semibold hover:bg-main transition text-white py-2 w-full rounded-full"
            type="submit"
          >
            {t("cart:next")}
          </button>
        </form>
    </>
  );
};

export default Options;
