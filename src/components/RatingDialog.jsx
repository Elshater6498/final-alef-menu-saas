import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BsX, BsStar, BsStarFill } from "react-icons/bs";
import { toast } from "sonner";
import { useRate } from "../lib/react-query/queriesAndMutations";
import { useGlobalContext } from "../context";

const RatingDialog = ({ setModalOn }) => {
  const { t, i18n } = useTranslation();
  const { storeData } = useGlobalContext();
  const { mutateAsync: submitRating, isLoading } = useRate(i18n.language);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      rate: 0,
      comment: "",
    },
  });

  const rate = watch("rate");

  const handleClose = (e) => {
    if (e.target.id === "container") setModalOn(false);
  };

  const onSubmit = async (data) => {
    try {
      await submitRating({ ...data, restaurantId: storeData.id });
      toast.success(t("toast:ratingSuccess"));
      setModalOn(false);
    } catch (error) {
      toast.error(t("toast:error"));
    }
  };

  return (
    <div
      className="fixed z-[110] inset-0 flex items-center justify-center bg-black/50 px-4"
      id="container"
      onClick={handleClose}
    >
      <div className="max-w-md mx-auto absolute bottom-0 left-1/2 -translate-x-1/2 w-full bg-white dark:bg-gray-700 dark:text-white rounded-t-2xl overflow-hidden">
        <div className="flex items-center justify-between w-full mb-2 sticky top-0 bg-white dark:bg-gray-700 p-4 shadow-md">
          <h3 className="text-lg md:text-xl font-bold">{t("rating:title")}</h3>
          <button onClick={() => setModalOn(false)}>
            <BsX className="bg-red-500 text-white p-1 rounded-full text-3xl" />
          </button>
        </div>

        <form
          className="flex flex-col w-full gap-4 p-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="name">{t("rating:name")}</label>
            <input
              type="text"
              id="name"
              {...register("name")}
              className={`w-full border py-2 px-4 outline-none rounded-lg dark:bg-gray-700 ${
                errors.name ? "border-red-500" : "border-gray-400"
              }`}
              placeholder={t("rating:enterName")}
            />
            {errors.name && (
              <span className="text-red-500 text-xs">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="phone">{t("rating:phone")}</label>
            <input
              type="tel"
              id="phone"
              {...register("phone", {
                required: t("customerData:fieldRequired"),
                pattern: {
                  value: /^(010|011|012|015)[0-9]{8}$/,
                  message: t("rating:invalidPhone"),
                },
              })}
              className={`w-full border py-2 px-4 placeholder:text-end outline-none rounded-lg dark:bg-gray-700 ${
                errors.phone ? "border-red-500" : "border-gray-400"
              }`}
              placeholder={t("rating:enterPhone")}
            />
            {errors.phone && (
              <span className="text-red-500 text-xs">
                {errors.phone.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email">
              {t("rating:email")} ({t("customerData:optional")})
            </label>
            <input
              type="email"
              id="email"
              dir="ltr"
              {...register("email")}
              className={`w-full border py-2 px-4 placeholder:text-end outline-none rounded-lg border-gray-400`}
              placeholder={t("rating:enterEmail")}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>{t("rating:rating")}</label>
            <div className="flex gap-2 text-2xl">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setValue("rate", star)}
                  className={`${
                    star <= rate ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  {star <= rate ? <BsStarFill /> : <BsStar />}
                </button>
              ))}
            </div>
            {errors.rate && (
              <span className="text-red-500 text-xs">
                {errors.rate.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="comment">{t("rating:comment")}</label>
            <textarea
              id="comment"
              {...register("comment", {
                required: t("customerData:fieldRequired"),
              })}
              className={`w-full border py-2 px-4 outline-none rounded-lg dark:bg-gray-700 min-h-[100px] ${
                errors.comment ? "border-red-500" : "border-gray-400"
              }`}
              placeholder={t("rating:enterComment")}
            />
            {errors.comment && (
              <span className="text-red-500 text-xs">
                {errors.comment.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-main text-white py-3 rounded-full font-semibold disabled:opacity-70"
          >
            {isLoading ? t("common:loading") : t("rating:submit")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RatingDialog;
