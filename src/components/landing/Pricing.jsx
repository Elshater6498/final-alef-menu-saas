import { useTranslation } from "react-i18next";
import { FiCheckCircle } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

const Pricing = () => {
  const { t, i18n } = useTranslation("landing");
  const [isDialog, setIsDialog] = useState(false);

  const basicFeatures = [
    t("pricing.features.dinamicMenu"),
    t("pricing.features.qr"),
    t("pricing.features.logo"),
    t("pricing.features.appearance"),
    t("pricing.features.dashboard"),
    t("pricing.features.socialMedia"),
    t("pricing.features.googleMap"),
    t("pricing.features.hours"),
    t("pricing.features.language"),
    t("pricing.features.intro"),
    t("pricing.features.products"),
    t("pricing.features.categories"),
    t("pricing.features.customerReviews"),
    t("pricing.features.whatsapp"),
    t("pricing.features.edits"),
    t("pricing.features.team"),
    t("pricing.features.manager"),
    t("pricing.features.support"),
  ];

  const traditionalFeatures = [
    t("pricing.features.order"),
    t("pricing.features.type"),
    t("pricing.features.location"),
    t("pricing.features.table"),
    t("pricing.features.tableNumber"),
    t("pricing.features.notes"),
    t("pricing.features.print"),
    t("pricing.features.tracking"),
  ];

  const premiumFeatures = [
    t("pricing.features.menuControl"),
    t("pricing.features.displayControl"),
    t("pricing.features.orderControl"),
  ];

  const FeaturesList = ({ features, isDialog }) => (
    <>
      {features.map((item, i) => (
        <div
          key={i}
          className={`flex items-center gap-3 px-2 ${isDialog ? "py-3" : ""}`}
        >
          <FiCheckCircle className="text-xl text-landingMain-900 flex-shrink-0" />
          <p className="text-gray-600 text-sm">
            {isDialog
              ? item.length > 30
                ? item.slice(0, 28) + "..."
                : item
              : item}
          </p>
        </div>
      ))}
    </>
  );

  const plans = [
    {
      id: 1,
      planType: t("pricing.basic"),
      title: t("pricing.basicTitle"),
      subTitle: t("pricing.basicSubtitle"),
      best_seller: false,
      month_price: 13,
      year_price: 130,
      features: basicFeatures,
      displayFeatures: basicFeatures.slice(0, 4),
    },
    {
      id: 2,
      planType: t("pricing.traditional"),
      title: t("pricing.traditionalTitle"),
      subTitle: t("pricing.traditionalSubtitle"),
      best_seller: true,
      month_price: 20,
      year_price: 200,
      features: [...basicFeatures, ...traditionalFeatures],
      displayFeatures: [
        t("pricing.allBasicFeatures"),
        ...traditionalFeatures.slice(0, 3),
      ],
    },
    {
      id: 3,
      planType: t("pricing.premium"),
      title: t("pricing.premiumTitle"),
      subTitle: t("pricing.premiumSubtitle"),
      best_seller: false,
      price: 329,
      features: [...basicFeatures, ...traditionalFeatures, ...premiumFeatures],
      displayFeatures: [
        t("pricing.allTraditionalFeatures"),
        ...premiumFeatures,
      ],
    },
  ];

  return (
    <section className="py-10 bg-gray-50" id="pricing">
      <div className="flex flex-col w-full gap-2 mb-8">
        <h2 className="font-bold text-2xl md:text-3xl text-center">
          {t("pricing.title")}
        </h2>
        <div className="flex gap-0 items-center mx-auto pl-[20px]">
          <div className="w-[10px] h-[10px] bg-landingMain-900 rounded-full"></div>
          <div className="h-[2px] w-[60px] bg-landingMain-900"></div>
        </div>
        <p className="mx-auto font-medium text-sm md:text-base">
          {t("pricing.subtitle")}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-10 max-w-7xl mx-auto px-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`shadow-[0px_5px_20px_0px_rgba(0,0,0,0.1)] flex flex-col rounded-2xl relative h-fit pt-10 px-3 transform transition-all duration-300 hover:scale-105 ${
              plan.best_seller
                ? "bg-white border-2 border-landingMain-900"
                : "bg-white"
            }`}
          >
            {plan.best_seller ? (
              <>
                <div className="absolute right-[110px] -top-3 border-[7px] border-gray-700"></div>
                <div className="absolute -right-3 top-[120px] border-[7px] border-gray-700"></div>
                <div className="w-[150px] h-[150px] absolute -top-3 -right-3 overflow-hidden">
                  <h3 className="text-center bg-landingMain-900 text-white font-medium py-3 absolute top-8 left-0 rotate-[47deg] w-[200px]">
                    {t("pricing.best_seller")}
                  </h3>
                </div>
              </>
            ) : null}
            <h4 className="text-center py-4 text-2xl font-bold text-gray-800">
              {plan.planType}
            </h4>
            <p className="text-center text-base sm:text-lg mb-2 text-gray-600">
              {plan.title}
            </p>
            <p className="text-center text-sm text-gray-500 mb-4">
              {plan.subTitle}
            </p>

            {plan.id === 3 ? (
              <p className="text-center text-3xl font-bold text-landingMain-900 mb-4">
                ${plan.price}
                <span className="text-base text-gray-600">
                  {" "}
                  {t("pricing.oneTime")}
                </span>
              </p>
            ) : (
              <div className="flex gap-2 text-center mb-4 justify-evenly items-center w-full">
                <p className="text-3xl font-bold text-landingMain-900">
                  ${plan.month_price}
                  <span className="text-base text-gray-600">
                    {" "}
                    /{t("pricing.month")}
                  </span>
                </p>
                <p className="text-lg font-semibold text-gray-600 mt-2">
                  ${plan.year_price}
                  <span className="text-sm"> /{t("pricing.year")}</span>
                </p>
              </div>
            )}

            <div className="py-6 border-t border-gray-100">
              <FeaturesList features={plan.displayFeatures} isDialog={true} />
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="link"
                    className="w-full text-landingMain-900 outline-none"
                  >
                    {t("pricing.readMore")}
                  </Button>
                </DialogTrigger>
                <DialogContent
                  dir={i18n.language === "ar" ? "rtl" : "ltr"}
                  className="max-h-[80vh] overflow-y-auto text-center"
                >
                  <DialogHeader>
                    <DialogTitle>{t("pricing.dialogTitle")}</DialogTitle>
                  </DialogHeader>
                  <FeaturesList features={plan.features} isDialog={false} />
                </DialogContent>
              </Dialog>
            </div>

            <a
              href="https://api.whatsapp.com/send?phone=+201100124479&text=Hello,%20more%20information!"
              target="_blank"
              rel="noreferrer"
              className="py-3 px-8 rounded-full text-center mx-auto items-center font-semibold tracking-wider text-lg mb-6 bg-landingMain-900 text-white hover:bg-landingMain-800 transition-colors duration-300 w-full"
            >
              {t("pricing.start_now")}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
