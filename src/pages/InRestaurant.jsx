import { options } from "../constatns";
import { useTranslation } from "react-i18next";
import { useGlobalContext } from "../context";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BsEnvelope, BsJournalText, BsPerson, BsShop } from "react-icons/bs";
import { toast } from "sonner";
import { IoArrowBack } from "react-icons/io5";
import { useOrder } from "../lib/react-query/queriesAndMutations";

const InRestaurant = () => {
  const { t, i18n } = useTranslation();
  const { domain } = useParams();
  const navigate = useNavigate();
  const { cartData, storeData, setCartData } = useGlobalContext();
  const [searchParams] = useSearchParams();
  const phone = searchParams.get("phone");
  const errMessage = t("customerData:fieldRequired");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const onSuccess = (data) => {
    localStorage.setItem("order_num", data?.data?.id);
    toast.success(t("toast:orderAccepted"));
    setCartData([]);
    reset();
    navigate(
      `/${domain}/order-details/${data?.data?.id}?option=${options.INRESTAURANT}`
    );
  };

  const onError = (error) => {
    console.log("error", error);
    toast.error(t("toast:error"));
  };

  const { mutate: order, isLoading } = useOrder(onSuccess, onError);

  const onSubmit = async (data) => {
    const total = cartData
      .reduce((acc, item) => acc + item.price, 0)
      .toLocaleString("en-US");

    if (total < 1) toast.warning(t("toast:minimumCost"));
    else {
      const orderData = {
        customerName: data.name,
        customerPhone: phone,
        tableNumber: data.table_num,
        ...(data.email && { customerEmail: data.email }),
        ...(data.notes && { notes: data.notes }),
        restaurantId: storeData.id,
        products: cartData.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
        orderType: options.INRESTAURANT,
      };

      order(orderData);
    }
  };
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
      <form
        className="w-full h-full flex flex-col justify-end gap-3 px-4 bg-white animateItems dark:bg-gray-700"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* table number */}
        <div className="flex flex-col">
          <label
            htmlFor="table_num"
            className={`relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-main ${
              errors.table_num ? "border-red-500" : ""
            }`}
          >
            <select
              id="table_num"
              className={`w-full ${
                i18n.language === "en" ? "pl-5" : "pr-5"
              } outline-none`}
              {...register("table_num", {
                valueAsNumber: true,
                validate: (val) => !isNaN(val) || errMessage,
              })}
              onChange={(e) =>
                setValue("table_num", e.target.value, { shouldValidate: true })
              }
              defaultValue="select"
            >
              <option value="select" disabled>
                {i18n.language === "en"
                  ? "Choose Your Table number"
                  : "اختر رقم الطاولة"}
              </option>

              {Array.from(Array(storeData?.tables).keys()).map((table, i) => (
                <option value={+table + 1} key={i} className="mr-8">
                  {table + 1}
                </option>
              ))}
            </select>
            <BsShop
              className={`absolute top-1/2 -translate-y-1/2 text-gray-400 text-lg peer-focus:text-main ${
                errors.table_num ? "text-red-500" : ""
              } ${i18n.language === "en" ? "left-0" : "right-0"}`}
            />
            <span className="absolute start-6 top-2 -translate-y-1/2 text-xs transition-all peer-placeholder-shown:top-1/2 text-gray-400 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs dark:text-white">
              {t("customerData:table_num")}
            </span>
          </label>
          {errors.table_num ? (
            <span className="text-[10px] text-red-500">
              {errors.table_num.message}
            </span>
          ) : null}
        </div>
        {/* Name */}
        <div className="flex flex-col">
          <label
            htmlFor="name"
            className={`relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-main ${
              errors.name ? "border-red-500" : ""
            }`}
          >
            <input
              type="text"
              id="name"
              {...register("name", {
                required: { value: true, message: errMessage },
              })}
              autoComplete="off"
              placeholder={t("customerData:name")}
              className="peer h-8 w-full border-none dark:text-white bg-transparent py-0 px-6 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
            />
            <BsPerson
              className={`absolute top-1/2 -translate-y-1/2 text-gray-400 text-lg peer-focus:text-main ${
                errors.name ? "text-red-500" : ""
              } ${i18n.language === "en" ? "left-0" : "right-0"}`}
            />
            <span className="absolute start-6 top-2 -translate-y-1/2 text-xs text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs dark:text-white">
              {t("customerData:name")}
            </span>
          </label>
          {errors.name ? (
            <span className="text-[10px] text-red-500">
              {errors.name.message}
            </span>
          ) : null}
        </div>
        {/* Phone */}
        {/* <div className="flex flex-col">
          <label
            htmlFor="phone"
            className={`block border-b border-gray-200 bg-transparent pt-3 focus-within:border-main ${
              errors.phone ? "border-red-500" : ""
            }`}
          >
            <PhoneInput
              country="sa"
              inputProps={{
                id: "phone",
                required: true,
              }}
              {...register("phone", {
                required: { value: true, message: errMessage },
              })}
              disableSearchIcon={true}
              containerClass="phone-input-container"
              inputClass={`peer h-8 w-full border-none dark:text-white bg-transparent py-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm ${
                errors.phone ? "!border-red-500" : ""
              }`}
              buttonClass={`!border-none !bg-transparent ${
                i18n.language === "en" ? "!left-0" : "!right-6"
              }`}
              searchClass="!bg-white dark:!bg-gray-700 !text-gray-900 dark:!text-white"
              dropdownClass="!bg-white dark:!bg-gray-700 !text-gray-900 dark:!text-white"
              value={watch("phone")}
              onChange={(value) => setValue("phone", value)}
              dir={i18n.language === "en" ? "ltr" : "rtl"}
            />
            <span className="absolute start-14 top-2 -translate-y-1/2 text-xs text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
              {t("customerData:PhoneNumber")}
            </span>
          </label>
          {errors.phone ? (
            <span className="text-[10px] text-red-500">
              {errors.phone.message}
            </span>
          ) : null}
        </div> */}
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-main"
          >
            <input
              type="email"
              id="email"
              placeholder={t("customerData:email")}
              {...register("email")}
              autoComplete="off"
              className="peer h-8 w-full border-none dark:text-white bg-transparent py-0 px-6 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
            />
            <BsEnvelope
              className={`absolute top-1/2 -translate-y-1/2 text-gray-400 text-lg peer-focus:text-main ${
                i18n.language === "en" ? "left-0" : "right-0"
              }`}
            />
            <span className="absolute start-6 top-2 -translate-y-1/2 text-xs text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs dark:text-white">
              {t("customerData:email")} ({t("customerData:optional")})
            </span>
          </label>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="notes"
            className={`relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-main ${
              errors.notes ? "border-red-500" : ""
            }`}
          >
            <input
              type="text"
              id="notes"
              placeholder={t("customerData:note")}
              {...register("notes")}
              autoComplete="off"
              className="peer h-8 w-full border-none dark:text-white bg-transparent py-0 px-6 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
            />
            <BsJournalText
              className={`absolute top-1/2 -translate-y-1/2 text-gray-400 text-lg peer-focus:text-main ${
                i18n.language === "en" ? "left-0" : "right-0"
              }`}
            />
            <span className="absolute start-6 top-2 -translate-y-1/2 text-xs text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
              {t("customerData:note")} ({t("customerData:optional")})
            </span>
          </label>
        </div>
        <button
          className="bg-main font-semibold hover:bg-main transition text-white py-2 w-full rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
          ) : (
            t("customerData:submitRequest")
          )}
        </button>
      </form>
    </div>
  );
};

export default InRestaurant;
