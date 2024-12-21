import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { BsEnvelope, BsGeoAlt, BsJournalText, BsPerson } from "react-icons/bs";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import { useState, useCallback } from "react";

import { useGlobalContext } from "../context";
import { options } from "../constatns";
import { IoArrowBack } from "react-icons/io5";
import { useOrder } from "../lib/react-query/queriesAndMutations";
import { BsGeoAltFill } from "react-icons/bs";

// Add these libraries to LoadScript
const libraries = ["places", "geometry"];

const Delivery = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const errMessage = t("customerData:fieldRequired");
  const { domain } = useParams();
  const [searchParams] = useSearchParams();

  const phone = searchParams.get("phone");

  const { cartData, setCartData, storeData } = useGlobalContext();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    lat: 24.7136, // Default to Saudi Arabia coordinates
    lng: 46.6753,
  });

  // Map container style
  const mapContainerStyle = {
    width: "100%",
    height: "300px",
    marginBottom: "20px",
    borderRadius: "12px",
  };

  // Handle map click - Update the geocoder initialization
  const handleMapClick = useCallback(
    (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      // Get address from coordinates using geocoding
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results[0]) {
          const address = results[0]?.formatted_address;
          setSelectedLocation({ lat, lng, address });
        }
      });

      // Create geocoder only after ensuring google is loaded
      if (window.google) {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
          if (status === "OK" && results[0]) {
            setValue("address", results[0].formatted_address);
          }
        });
      }
    },
    [setValue]
  );

  const [searchBox, setSearchBox] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle search box load
  const onLoadSearchBox = (ref) => {
    setSearchBox(ref);
  };

  // Handle place selection from search
  const onPlaceSelected = () => {
    if (searchBox) {
      const place = searchBox.getPlace();
      if (place.geometry) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setSelectedLocation({ lat, lng });
        setMapCenter({ lat, lng });
        setValue("address", place.formatted_address);
      }
    }
  };

  // Get user's current location
  const getCurrentLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setSelectedLocation({ lat, lng });
          setMapCenter({ lat, lng });

          // Get address from coordinates
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            setIsLoading(false);
            if (status === "OK" && results[0]) {
              setValue("address", results[0].formatted_address);
            }
          });
        },
        () => {
          setIsLoading(false);
          toast.error(t("toast:locationError"));
        }
      );
    }
  };

  const onSuccess = (data) => {
    localStorage.setItem("order_num", data?.data?.id);
    toast.success(t("toast:orderAccepted"));
    setCartData([]);
    reset();
    navigate(
      `/${domain}/order-details/${data?.data?.id}?option=${searchParams.get(
        "option"
      )}`
    );
  };

  const onError = (error) => {
    console.log(error);
    toast.error(t("toast:error"));
  };

  const { mutate: order, isLoading: isOrderLoading } = useOrder(
    onSuccess,
    onError
  );

  const onSubmit = async (data) => {
    const total = cartData
      .reduce((acc, item) => acc + item.price, 0)
      .toLocaleString("en-US");

    if (total < 1) toast.warning(t("toast:minimumCost"));
    else {
      // Restructure cart data to only include necessary product details and quantity
      const restructuredProducts = cartData.map((item) => ({
        calories: item.calories,
        details: item.details,
        image: item.img,
        name: item.name,
        price: item.price / item.quantity,
        quantity: item.quantity,
        notes: data.notes,
        id: item.id,
      }));

      const orderData = {
        customerName: data.name,
        customerPhone: phone,
        ...(data.email && { customerEmail: data.email }),
        ...(data.address && { customerAddress: data.address }),
        ...(data.tableNumber && { tableNumber: data.tableNumber }),
        ...(data.notes && { notes: data.notes }),
        restaurantId: storeData.id,
        products: restructuredProducts.map((product) => ({
          id: product.id,
          quantity: product.quantity,
        })),
        orderType: searchParams.get("option"),
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

      {searchParams.get("option") === options.DELIVERY && (
        <div className="w-full px-4 my-6">
          <LoadScript
            googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            libraries={libraries}
          >
            <div className="relative">
              <Autocomplete
                onLoad={onLoadSearchBox}
                onPlaceChanged={onPlaceSelected}
              >
                <input
                  type="text"
                  placeholder={t("customerData:searchLocation")}
                  className="w-full pe-2 ps-8 py-2 border rounded-lg mb-2 dark:bg-gray-600 dark:text-white"
                />
              </Autocomplete>
              <button
                type="button"
                onClick={getCurrentLocation}
                className="absolute right-2 top-3 text-gray-400"
                disabled={isLoading}
              >
                <BsGeoAltFill
                  className={`text-lg ${isLoading ? "animate-pulse" : ""}`}
                />
              </button>
            </div>

            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={mapCenter}
              zoom={13}
              onClick={handleMapClick}
            >
              {selectedLocation && (
                <Marker
                  position={selectedLocation}
                  animation={window.google?.maps?.Animation?.DROP}
                />
              )}
            </GoogleMap>
          </LoadScript>
        </div>
      )}

      <form
        className="w-full h-full flex flex-col justify-end gap-3 px-4 bg-white animateItems dark:bg-gray-700"
        onSubmit={handleSubmit(onSubmit)}
      >
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
            <span className="absolute start-6 top-2 -translate-y-1/2 text-xs transition-all peer-placeholder-shown:top-1/2 text-gray-400 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
              {t("customerData:name")}
            </span>
          </label>
          {errors.name ? (
            <span className="text-[10px] text-red-500">
              {errors.name.message}
            </span>
          ) : null}
        </div>
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
              buttonClass={`!border-none !bg-transparent !left-0`}
              searchClass="!bg-white dark:!bg-gray-700 !text-gray-900 dark:!text-white"
              dropdownClass="!bg-white dark:!bg-gray-700 !text-gray-900 dark:!text-white"
              value={watch("phone")}
              onChange={(value) => setValue("phone", value)}
              dir="ltr"
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
        {searchParams.get("option") === options.DELIVERY && (
          <div className="flex flex-col">
            <label
              htmlFor="address"
              className={`relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-main ${
                errors.address ? "border-red-500" : ""
              }`}
            >
              <input
                type="text"
                id="address"
                placeholder={t("customerData:address")}
                {...register("address", {
                  required: { value: true, message: errMessage },
                })}
                autoComplete="off"
                className="peer h-8 w-full border-none dark:text-white bg-transparent py-0 px-6 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
              />
              <BsGeoAlt
                className={`absolute top-1/2 -translate-y-1/2 text-gray-400 text-lg peer-focus:text-main ${
                  errors.address ? "text-red-500" : ""
                } ${i18n.language === "en" ? "left-0" : "right-0"}`}
              />
              <span className="absolute start-6 top-2 -translate-y-1/2 text-xs text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs dark:text-white">
                {t("customerData:address")}
              </span>
            </label>
            {errors.address ? (
              <span className="text-[10px] text-red-500">
                {errors.address.message}
              </span>
            ) : null}
          </div>
        )}
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
            <span className="absolute start-6 top-2 -translate-y-1/2 text-xs text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
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
          disabled={isOrderLoading}
        >
          {isOrderLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
          ) : (
            t("customerData:submitRequest")
          )}
        </button>
      </form>
    </div>
  );
};

export default Delivery;
