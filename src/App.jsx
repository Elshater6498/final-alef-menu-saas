import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  useLocation,
  Navigate,
} from "react-router-dom";

import { Loader, Layout, RatingDialog, SideNav } from "./components";
import {
  Home,
  Delivery,
  SingleItem,
  Cart,
  Options,
  InRestaurant,
  TrackOrder,
  OrderDetails,
  Landing,
  NotFound,
  About,
} from "./pages";
import { AppProvider, useGlobalContext } from "./context";
import { RatingProvider, useRatingContext } from "./context/rating";
import { useRestaurant } from "./lib/react-query/queriesAndMutations";
import BusinessHoursDialog from "./components/BusinessHoursDialog";
import TrackOrderDialog from "./components/TrackOrderDialog";
import { BASE_URL } from "./constatns";

const RestaurantLayout = () => {
  const { domain } = useParams();
  const { i18n } = useTranslation();
  const {
    data: restaurantData,
    isError,
    isLoading,
  } = useRestaurant(i18n.language, domain);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !restaurantData?.data) {
    return <NotFound />;
  }

  return (
    <AppProvider domain={domain}>
      <RatingProvider>
        <RestaurantRoutes />
      </RatingProvider>
    </AppProvider>
  );
};

const RestaurantRoutes = () => {
  const [singleItem, setSingleItem] = useState({});
  const [value, setValue] = useState(0);
  const { i18n } = useTranslation();
  const {
    storeData,
    sideNav,
    setSideNav,
    isRestaurantOpen,
    isLoading,
    showHours,
    setShowHours,
    trackOrderOn,
  } = useGlobalContext();
  const { modalOn, setModalOn } = useRatingContext();
  useEffect(() => {
    if (storeData) {
      document.documentElement.style.setProperty(
        "--primary-color",
        storeData.theme
      );
    }
  }, [storeData]);

  const ProtectedRoute = ({ children }) => {
    const { domain } = useParams();
    const location = useLocation();

    if (location.pathname === `/${domain}/options` && !isRestaurantOpen) {
      return <Navigate to={`/${domain}/cart`} replace />;
    }

    return children;
  };
  return (
    <>
      <div className="flex hide-scrollbar">
        <div
          className="relative max-w-md md:ml-auto md:mr-0 mx-auto min-h-screen shadow-md transition duration-100 dark:bg-gray-700 hide-scrollbar w-full"
          dir={i18n.language === "en" ? "ltr" : "rtl"}
        >
          <Routes>
              <Route element={<Layout />}>
                <Route
                  path="/"
                  element={
                    isLoading ? (
                      <Loader />
                    ) : (
                      <Home value={value} setValue={setValue} />
                    )
                  }
                />
                <Route
                  path="/:categoryName"
                  element={<Home value={value} setValue={setValue} />}
                />
                <Route path="/delivery" element={<Delivery />} />
                <Route path="/about" element={<About />} />
                <Route path="/order-details/:id" element={<OrderDetails />} />
                <Route path="/track-order/:orderId" element={<TrackOrder />} />
                <Route
                  path="/cart"
                  element={
                    <Cart singleItem={singleItem} setSingleItem={setSingleItem} />
                  }
                />
                <Route
                  path="/products/:productId"
                  element={<SingleItem singleItem={singleItem} />}
                />
                <Route
                  path="/options"
                  element={
                    <ProtectedRoute>
                      <Options />
                    </ProtectedRoute>
                  }
                />
                <Route path="/inRestaurant" element={<InRestaurant />} />
              </Route>
            </Routes>
            {modalOn && <RatingDialog setModalOn={setModalOn} />}
            {showHours && <BusinessHoursDialog setModalOn={setShowHours} />}
            {trackOrderOn && <TrackOrderDialog />}
          </div>
          
          <div
              className="hidden md:block h-screen  w-[calc(100%-448px)] !bg-no-repeat !bg-cover fixed"
              style={{
                backgroundImage: `url(${storeData?.cover ? BASE_URL + storeData?.cover : "/img/bg.png"})`,
              }}
            >
              <div className="bg-black/50 w-full h-full md:flex items-center justify-center">
                <div className="h-64 w-64 rounded-full bg-white flex items-center justify-center">
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <img
                      src={
                        storeData?.image
                          ? BASE_URL + storeData?.image
                          : "/logo.png"
                      }
                      alt={storeData?.name}
                      className="object-contain"
                    />
                  )}
                </div>
              </div>
          </div>
      </div>
      <SideNav
        sideNav={sideNav}
        setSideNav={setSideNav}
        setShowHours={setShowHours}
      />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/:domain/*" element={<RestaurantLayout />} />
      </Routes>
    </Router>
  );
};

export default App;
