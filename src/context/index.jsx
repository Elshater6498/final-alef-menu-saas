/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect, useMemo } from "react";
import {
  useCategories,
  useRestaurant,
} from "../lib/react-query/queriesAndMutations";
import { useTranslation } from "react-i18next";

const AppContext = createContext({
  storeData: null,
  categories: [],
  sideNav: false,
  setSideNav: () => {},
  isRestaurantOpen: false,
  cartData: [],
  setCartData: () => {},
});

export const AppProvider = ({ children, domain }) => {
  const getInitailCartData = () => {
    const cartData = localStorage.getItem(`cartData_${domain}`);
    return cartData ? JSON.parse(cartData) : [];
  };

  const [cartData, setCartData] = useState(getInitailCartData);
  const [sideNav, setSideNav] = useState(false);
  const [showHours, setShowHours] = useState(false);
  const [trackOrderOn, setTrackOrderOn] = useState(false);
  const { i18n } = useTranslation();

  const lang = i18n.language ?? storeData?.data?.defaultLanguage;

  const { data: storeData, isLoading: isLoadingStoreData } = useRestaurant(
    lang,
    domain
  );

  const { data: categories, isLoading: isLoadingCategories } = useCategories(
    storeData?.data?.id,
    lang
  );

  const isRestaurantOpen = useMemo(() => {
    if (!storeData?.data?.date?.length) return false;

    const now = new Date();
    const currentDay = now.getDay();

    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const currentTime = `${hours}:${minutes}`;

    const todaySchedule = storeData.data.date.find((d) => d.day === currentDay);
    if (!todaySchedule) return false;

    if (todaySchedule.off === false) return false;

    return (
      currentTime >= todaySchedule.openedFrom &&
      currentTime <= todaySchedule.openedTo
    );
  }, [storeData?.data]);

  useEffect(() => {
    localStorage.setItem(`cartData_${domain}`, JSON.stringify(cartData));
  }, [cartData, domain]);

  useEffect(() => {
    setSideNav(false);
  }, [i18n.language]);

  const value = {
    storeData: storeData?.data,
    categories: categories?.data,
    sideNav,
    setSideNav,
    showHours,
    setShowHours,
    cartData,
    setCartData,
    isRestaurantOpen,
    trackOrderOn,
    setTrackOrderOn,
    isLoading: isLoadingStoreData || isLoadingCategories,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => useContext(AppContext);
