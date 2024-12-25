import { useTranslation } from "react-i18next";
import { useState, useEffect, useMemo } from "react";
import { useGlobalContext } from "../context";
import { Loader, Categories, Item, BottomBar } from "../components";
import { useProducts } from "../lib/react-query/queriesAndMutations";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../constatns";
import FacebookIcon from "../icons/facebook";
import InstagramIcon from "../icons/instagram";
import TwitterIcon from "../icons/twitter";
import TiktokIcon from "../icons/tiktok";
import SnapchatIcon from "../icons/snapchat";
import TelegramIcon from "../icons/telegram";
import GoogleIcon from "../icons/google-rate";
import GoogleMapIcon from "../icons/google-map";

const Home = ({ setValue }) => {
  const { t, i18n } = useTranslation();
  const { domain } = useParams();
  const { storeData, categories } = useGlobalContext();
  const [activeCategory, setActiveCategory] = useState(null);

  const { data: allProducts, isLoading } = useProducts(
    storeData?.id,
    i18n.language ?? storeData?.defaultLanguage
  );

  const hasOrderingOptions =
    storeData?.inRestaurant || storeData?.delivery || storeData?.takeaway;

  const { productsByCategory, activeCategories } = useMemo(() => {
    if (!allProducts?.data || !categories) {
      return { productsByCategory: {}, activeCategories: [] };
    }

    const grouped = allProducts.data.reduce((acc, product) => {
      if (product.active) {
        if (!acc[product.categoryId]) {
          acc[product.categoryId] = [];
        }
        acc[product.categoryId].push(product);
      }
      return acc;
    }, {});

    const activeCategories = categories.filter(
      (category) => grouped[category.id]?.length > 0
    );

    return { productsByCategory: grouped, activeCategories };
  }, [allProducts?.data, categories]);

  useEffect(() => {
    if (activeCategories?.length > 0 && !activeCategory) {
      const initialCategory = activeCategories[0].id;
      setActiveCategory(initialCategory);
      setValue(0);
    }
  }, [activeCategories, activeCategory, setValue]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most visible section
        let maxRatio = 0;
        let mostVisibleCategoryId = null;

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            mostVisibleCategoryId = entry.target.getAttribute("data-category");
          }
        });

        if (mostVisibleCategoryId) {
          setActiveCategory(mostVisibleCategoryId);
          const categoryIndex = activeCategories.findIndex(
            (cat) => cat.id === mostVisibleCategoryId
          );
          if (categoryIndex !== -1) {
            setValue(categoryIndex);
          }
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: "-50px 0px -50% 0px",
      }
    );

    const sections = document.querySelectorAll(".category-section");
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [activeCategories, setValue]);

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

  return (
    <>
      <div className="w-full relative flex flex-col items-center justify-center text-center mb-20">
        <img
          src={storeData?.cover ? BASE_URL + storeData?.cover : "/img/bg.png"}
          alt="banner"
          className="w-full max-h-[200px]"
        />
        <Link
          to={`/${domain}`}
          className="absolute -bottom-16 max-w-md w-full start-0 px-2 text-md font-semibold text-gray-500 dark:text-white cursor-pointer flex items-end gap-2"
        >
          <div className="w-20 h-20 flex-shrink-0 rounded-full overflow-hidden border-2 border-white dark:border-gray-700">
            <img
              src={storeData?.image ? BASE_URL + storeData?.image : "/logo.png"}
              alt={storeData?.name}
              className="w-full h-full object-cover bg-white"
            />
          </div>
          <div className="flex items-start justify-between w-full pb-2">
            <div className="flex flex-col items-start">
              <h1
                className={`font-bold flex gap-1 flex-col text-lg dark:text-main/50`}
              >
                <span className={`inline-block text-main mx-0.5 text-accent`}>
                  {storeData?.name}
                </span>
                <span className="font-bold text-main dark:text-main/50 overflow-hidden">
                  {" "}
                  {storeData?.enName}
                </span>
              </h1>
              <p className="text-sm text-gray-500 dark:text-white">
                {storeData?.slogan}
              </p>
            </div>
          </div>
        </Link>
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
      <Categories
        setValue={setValue}
        activeCategory={activeCategory}
        categories={activeCategories}
        setActiveCategory={setActiveCategory}
      />
      <div className="w-full px-4 pb-4 mb-10 pt-2 flex flex-col gap-2 items-center bg-white dark:bg-gray-700">
        {isLoading ? (
          <Loader />
        ) : activeCategories?.length > 0 ? (
          activeCategories.map((category) => (
            <div
              key={category.id}
              className="category-section w-full"
              data-category={category.id}
              id={`category-${category.id}`}
            >
              <div className="pt-16 -mt-16">
                {" "}
                {/* Virtual anchor point */}
                <h2 className="text-xl font-bold my-4 text-main dark:text-white">
                  {category.name}
                </h2>
                <div className="flex flex-col gap-4">
                  {productsByCategory[category.id]?.map((item, i) => (
                    <Item item={item} key={i} />
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full flex items-center font-semibold gap-4 justify-center flex-col my-16 dark:text-white">
            <img
              src="/img/delete.png"
              alt="not-found"
              width="100em"
              height="100em"
            />
            <h2 className="text-3xl text-center text-[#597c80] dark:text-white">
              {t("search:noResults")}
            </h2>
          </div>
        )}
      </div>
      {hasOrderingOptions && <BottomBar />}
    </>
  );
};

export default Home;
