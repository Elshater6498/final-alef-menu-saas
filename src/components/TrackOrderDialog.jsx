import { useGlobalContext } from "../context";
import { useTranslation } from "react-i18next";
import { BsX } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export default function TrackOrderDialog() {
  const { t } = useTranslation(["trackOrder"]);
  const { setTrackOrderOn } = useGlobalContext();
  const { domain } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = localStorage.getItem("order_num");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    navigate(
      `/${domain}/track-order/${data.orderId || id}?option=${searchParams.get(
        "option"
      )}`
    );
    setTrackOrderOn(false);
  };

  const handleClose = (e) => {
    if (e.target.id === "container") setTrackOrderOn(false);
  };

  return (
    <div
      className="fixed z-[105] inset-0 flex items-center justify-center bg-black/50 px-4"
      id="container"
      onClick={handleClose}
    >
      <div className="max-w-2xl mx-auto max-h-[90vh] overflow-y-auto w-full bg-white dark:bg-gray-700 dark:text-white rounded-2xl no-scrollbar">
        <div className="flex items-center justify-between w-full mb-2 sticky top-0 bg-white dark:bg-gray-700 p-4 shadow-md">
          <h3 className="text-lg md:text-xl font-bold">{t("modal:title")}</h3>
          <button onClick={() => setTrackOrderOn(false)}>
            <BsX className="bg-red-500 text-white p-1 rounded-full text-3xl" />
          </button>
        </div>
        <form
          className="flex flex-col w-full gap-2 px-4 mt-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="orderId">{t("modal:label")}</label>
            <input
              type="text"
              id="orderId"
              {...register("orderId", {
                required: {
                  value: true,
                  message: t("customerData:fieldRequired"),
                },
              })}
              defaultValue={id}
              className={`w-full border py-2 px-4 outline-none rounded-lg dark:bg-gray-700 ${
                errors.orderId ? "border-red-500" : "border-gray-400"
              }`}
            />
            {errors.orderId ? (
              <span className="text-red-500 text-xs">
                {errors.orderId.message}
              </span>
            ) : null}
          </div>
          <div className="flex items-center justify-end gap-4">
            <button
              type="submit"
              className="bg-main text-white transition py-2 my-6 px-8 rounded-lg"
            >
              {t("modal:send")}
            </button>
            <button
              type="button"
              onClick={() => setTrackOrderOn(false)}
              className="bg-gray-300 hover:bg-gray-400 transition py-2 my-6 px-8 rounded-lg dark:bg-gray-900"
            >
              {t("modal:cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
