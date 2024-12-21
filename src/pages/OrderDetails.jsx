import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { VscTarget } from "react-icons/vsc";
import { MdOutlineContentCopy } from "react-icons/md";
import { BsCheckCircleFill } from "react-icons/bs";
import { toast } from "sonner";

import { IoArrowBack } from "react-icons/io5";
import { useGlobalContext } from "../context";

const OrderDetails = () => {
  const { setTrackOrderOn } = useGlobalContext();

  const { id } = useParams();
  const { t } = useTranslation();
  const { domain } = useParams();
  const navigate = useNavigate();

  const copy = () => {
    navigator.clipboard.writeText(id);
    toast.success(t("orderDetails:copied"));
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
      <div className="divide-y dark:text-white">
        <div className="flex flex-col items-center justify-center gap-4 py-6 px-4">
          <img src="/img/verify.png" alt="verify" className="w-80" />
          <div className="flex items-center justify-center ltr:flex-row-reverse gap-2">
            <BsCheckCircleFill className="text-3xl text-green-600" />
            <h2 className="text-xl font-bold">{t("orderDetails:success")}</h2>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex justify-between items-center gap-4 py-4 flex-wrap">
            <div className="flex items-center gap-4">
              <h1 className="text-lg md:text-xl lg:text-2xl font-bold">
                {t("orderDetails:order_num")}:{" "}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-main text-sm px-1 bg-main/10 rounded-md">
                {id}
              </p>
              <button
                type="button"
                onClick={copy}
                className="text-main text-xl"
              >
                <MdOutlineContentCopy />
              </button>
            </div>
            <button
              type="button"
              onClick={() => setTrackOrderOn(true)}
              className="flex items-center gap-2 py-1 px-3 mt-6 rounded-lg bg-main text-white"
            >
              <VscTarget /> {t("orderDetails:track_order")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
