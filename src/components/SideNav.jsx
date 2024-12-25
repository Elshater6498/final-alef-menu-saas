/* eslint-disable react-hooks/exhaustive-deps */
import {
  BsGeoAlt,
  BsShare,
  BsX,
  BsTelephone,
  BsClock,
  BsStar,
  BsTruck,
  BsInfoCircle,
} from "react-icons/bs";
import { toast } from "sonner";
import { useGlobalContext } from "../context";
import { useTranslation } from "react-i18next";
import { useRatingContext } from "../context/rating";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import FacebookIcon from "../icons/facebook";
import InstagramIcon from "../icons/instagram";
import TwitterIcon from "../icons/twitter";
import TiktokIcon from "../icons/tiktok";
import SnapchatIcon from "../icons/snapchat";
import TelegramIcon from "../icons/telegram";
import GoogleIcon from "../icons/google-rate";
import GoogleMapIcon from "../icons/google-map";
import { BASE_URL } from "@/constatns";

const SideNav = ({ sideNav, setSideNav, setShowHours }) => {
  const { storeData, setTrackOrderOn } = useGlobalContext();
  const { setModalOn } = useRatingContext();
  const { t, i18n } = useTranslation(["sideNav"]);
  const { domain } = useParams();
  const navigate = useNavigate();
  const [position, setPosition] = useState(
    i18n.language === "ar" ? "left" : "right"
  );
  const [isAnimating, setIsAnimating] = useState(false);
  console.log('====================================');
  console.log(position);
  console.log('====================================');

  useEffect(() => {
    if (sideNav) {
      // Close sidenav first when language changes
      setSideNav(false);
      setIsAnimating(true);

      // Wait for close animation to complete
      setTimeout(() => {
        setPosition(i18n.language === "ar" ? "left" : "right");
        setIsAnimating(false);
      }, 500); // Match this with your transition duration
    } else {
      // Update position immediately when sidenav is closed
      setPosition(i18n.language === "ar" ? "left" : "right");
    }
  }, [i18n.language]);

  if (isAnimating) return null;

  const share = () => {
    if (navigator.share) {
      navigator
        .share({
          title: storeData?.name,
          url: storeData?.url,
        })
        .then(() => {
          toast.success(t("thanksForSharing"));
        })
        .catch(() => toast.error(t("shareFaild")));
    } else {
      toast.error(t("shareFaild"));
    }
  };

  const socialMediaLinks = [
    {
      id: 1,
      Icon: FacebookIcon,
      href: storeData?.socialMedia?.[0]?.value,
      title: "Facebook",
    },
    {
      id: 2,
      Icon: InstagramIcon,
      href: storeData?.socialMedia?.[1]?.value,
      title: "Instagram",
    },
    {
      id: 3,
      Icon: TwitterIcon,
      href: storeData?.socialMedia?.[4]?.value,
      title: "X",
    },
    {
      id: 4,
      Icon: TiktokIcon,
      href: storeData?.socialMedia?.[3]?.value,
      title: "Tiktok",
    },
    {
      id: 5,
      Icon: SnapchatIcon,
      href: storeData?.socialMedia?.[2]?.value,
      title: "Snapchat",
    },
    {
      id: 6,
      Icon: TelegramIcon,
      href: storeData?.socialMedia?.[5]?.value,
      title: "Telegram",
    },
    {
      id: 7,
      Icon: GoogleIcon,
      href: storeData?.socialMedia?.[6]?.value,
      title: "Google rate",
    },
    {
      id: 8,
      Icon: GoogleMapIcon,
      href: storeData?.socialMedia?.[7]?.value,
      title: "Google Map",
    },
  ];

  const sideNavData = [
    ...(storeData?.socialMedia?.[7]?.value
      ? [
          {
            id: 1,
            text: t("address"),
            icon: BsGeoAlt,
            href: storeData?.socialMedia?.[7]?.value,
          },
        ]
      : []),
    ...(storeData?.phone
      ? [
          {
            id: 2,
            text: t("callUs"),
            icon: BsTelephone,
            href: `tel:${storeData?.phone}`,
          },
        ]
      : []),
    ...(storeData?.showDates
      ? [
          {
            id: 3,
            text: t("businessHours"),
            icon: BsClock,
            onClick: () => {
              setShowHours(true);
              setSideNav(false);
            },
          },
        ]
      : []),
    ...(storeData?.showRates
      ? [
          {
            id: 4,
            text: t("rateUs"),
            icon: BsStar,
            onClick: () => {
              setModalOn(true);
              setSideNav(false);
            },
          },
        ]
      : []),
    {
      id: 5,
      text: t("trackOrder"),
      icon: BsTruck,
      onClick: () => {
        setTrackOrderOn(true);
        // navigate(`/${domain}/track-order/${orderId}`);
        setSideNav(false);
      },
    },
    {
      id: 6,
      text: t("aboutUs"),
      icon: BsInfoCircle,
      onClick: () => {
        navigate(`/${domain}/about`);
        setSideNav(false);
      },
    },
    {
      id: 7,
      text: t("share"),
      icon: BsShare,
      onClick: share,
    },
  ];

  return (
    <div className={`fixed inset-0 z-[102]   ${sideNav ? "block" : "hidden"}`}>
      <div
        className="fixed inset-0 bg-black/70 dark:bg-white/70"
        onClick={() => setSideNav(false)}
      />
      <div
        className={`fixed w-[350px] md:w-[447px] top-0 bg-white flex flex-col dark:bg-gray-700 h-full transition-transform duration-500 ease-out overflow-hidden ${
          position === "left" ? "right-0" : "left-0 md:right-0 md:left-auto"
        } ${
          sideNav
            ? "translate-x-0"
            : position === "right"
            ? "-translate-x-full md:translate-x-full"
            : "translate-x-full"
        } ${
          position === "right"
            ? "rounded-tr-3xl rounded-br-3xl md:rounded-tl-3xl md:rounded-bl-3xl md:rounded-tr-none md:rounded-br-none"
            : "rounded-tl-3xl rounded-bl-3xl"
        }`}
      >
        <BsX
          className={`eax absolute end-1.5 top-1.5 z-103 w-5 h-5 p-0.5 mx-2 rounded-full bg-gray-700 text-gray-50 hover:bg-gray-400 hover:bg-opacity-50 transform hover:rotate-180 dark:bg-gray-700 dark:text-gray-50 ${
            sideNav ? "block" : "hidden"
          }`}
          onClick={() => setSideNav(false)}
        />
        <div
          className={`bg-white w-full dark:bg-gray-700 flex items-center justify-center pt-16`}
        >
          <img
            src={
              storeData?.image ? BASE_URL + storeData?.image : "/logo.png"
            }
            alt={storeData?.name}
            className="w-[100px] h-[100px]"
          />
        </div>
        <div className="text-center mb-4">
          <h1 className="text-xl font-bold text-main dark:text-white">
            {storeData?.name}
          </h1>
          {storeData?.slogan && (
            <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
              {storeData.slogan}
            </p>
          )}
        </div>
        <div className="flex items-center justify-center gap-6 pb-5">
          {socialMediaLinks
            .filter((s) => s.href)
            .map((link) => (
              <a
                href={link.href}
                key={link.id}
                target="_blank"
                rel="noreferrer"
                title={link.title}
                className="cursor-pointer"
              >
                <link.Icon className="w-5 h-5 text-main" />
              </a>
            ))}
        </div>
        <div
          dir={i18n.language === "ar" ? "rtl" : "ltr"}
          className="flex flex-col w-full overflow-hidden px-2 mt-2 gap-0.5"
        >
          {sideNavData.map((link) => {
            const commonClasses =
              "relative flex justify-between items-center dark:bg-gray-600 dark:hover:bg-gray-500 py-2.5 px-4 rounded-sm hover:bg-gray-200 transition bg-gray-100 bg-opacity-500 text-gray-800";

            return link.href ? (
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={commonClasses}
                key={link.id}
              >
                <p className="text-xs md:text-md text-gray-900 font-semibold dark:text-white">
                  {link.text}
                </p>
                <link.icon className="text-main w-5 h-5" />
              </a>
            ) : link.onClick ? (
              <button
                onClick={link.onClick}
                className={commonClasses}
                key={link.id}
              >
                <p className="text-xs md:text-md text-gray-900 font-semibold dark:text-white">
                  {link.text}
                </p>
                <link.icon className="text-main w-5 h-5" />
              </button>
            ) : null;
          })}
        </div>
        {storeData?.taxService && (
          <p
            dir={i18n.language === "ar" ? "rtl" : "ltr"}
            className="text-xs md:text-md text-gray-900 font-semibold text-center mt-6"
          >
            {storeData.taxService}
          </p>
        )}
        <span className="text-xs mt-auto py-4 text-center dark:text-gray-300">
          Powered by{" "}
          <Link to="/" className="font-semibold text-main">
            MENU SOFT
          </Link>{" "}
        </span>
      </div>
    </div>
  );
};

export default SideNav;
