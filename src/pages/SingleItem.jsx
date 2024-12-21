import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import {
  IoAddCircleOutline,
  IoArrowBack,
  IoRemoveCircleOutline,
} from "react-icons/io5";

import { useGlobalContext } from "../context";
import { BASE_URL } from "../constatns";
import { Loader } from "../components";
import { useProduct } from "../lib/react-query/queriesAndMutations";
import { IoMdAddCircle } from "react-icons/io";

const SingleItem = () => {
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams();
  const { cartData, setCartData, storeData } = useGlobalContext();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const { data, isPending: isLoading } = useProduct(
    productId,
    storeData?.id,
    i18n.language
  );

  const add = () => setQuantity((prev) => prev + 1);
  const remove = () => {
    if (quantity === 1) return;
    setQuantity((prev) => prev - 1);
  };

  const addToCart = () => {
    const newCartItem = {
      id: data?.data?.id,
      name: data?.data?.name,
      img: BASE_URL + data?.data?.image,
      details: data?.data?.details,
      quantity,
      price: data?.data?.price?.toFixed(2) * quantity,
      calories: +data?.data?.calories,
    };

    const existingItemIndex = cartData.findIndex(
      (item) => item.id === newCartItem.id && item.name === newCartItem.name
    );
    if (existingItemIndex !== -1) {
      cartData[existingItemIndex].quantity += newCartItem.quantity;
      cartData[existingItemIndex].price += newCartItem.price;
      setCartData([...cartData]);
    } else {
      setCartData([...cartData, newCartItem]);
    }
    setQuantity(1);
    navigate(-1);
  };

  const hasOrderingOptions =
    storeData?.inRestaurant || storeData?.delivery || storeData?.takeaway;

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
      {isLoading ? (
        <Loader />
      ) : (
        <div className="p-4 rounded-lg bg-white dark:bg-gray-700 flex flex-col w-full">
          <div className="flex flex-col justify-center text-center gap-4 mb-12 dark:text-white">
            <img
              src={BASE_URL + data?.data?.image}
              alt={data?.data?.name}
              className="w-full h-full object-scale-down rounded-lg dark:bg-white"
            />
            <h2 className="text-2xl text-main dark:text-white">
              {data?.data?.name}
            </h2>
            {data?.data?.calories ? (
              <span className="py-1 px-3 text-xs w-fit mx-auto rounded-full text-white bg-gray-900">
                {data?.data?.calories} {t("singleProduct:kcal")}
              </span>
            ) : null}
            <p className="text-gray-700 dark:text-gray-200 text-base">
              {data?.data?.details}
            </p>
            {hasOrderingOptions ? (
              <div className="flex flex-col gap-2">
                <h4 className="text-lg text-main bg-[#f3f4f6] py-1 rounded-full w-full text-center dark:bg-gray-900 dark:text-white">
                  {t("singleProduct:quantity")}
                </h4>
                <div className="flex items-center justify-center gap-4 select-none">
                  <IoRemoveCircleOutline
                    className={`text-4xl ${
                      quantity === 1
                        ? "text-[#0000004d] dark:text-[#9ca3af]"
                        : "text-main"
                    } cursor-pointer selected-none`}
                    onClick={remove}
                  />
                  <span className="text-xl">{quantity}</span>
                  <IoAddCircleOutline
                    className="text-4xl text-main cursor-pointer"
                    onClick={add}
                  />
                </div>
              </div>
            ) : null}
          </div>
          {hasOrderingOptions ? (
            <button
              className="font-semibold flex items-center justify-center bg-main text-white rounded-full gap-2 border-2 border-main py-2 px-4 w-full"
              onClick={addToCart}
            >
              <span className="flex items-center gap-2">
                <IoMdAddCircle className="text-2xl text-white" />{" "}
                {t("cart:add")}
              </span>
              {data ? (
                <span className="text-md font-semibold whitespace-nowrap">
                  {(data?.data?.price * quantity).toLocaleString("en-US")}{" "}
                  {i18n.language === "ar"
                    ? storeData?.currency?.name
                    : storeData?.currency?.enName}
                </span>
              ) : null}
            </button>
          ) : null}
          <button
            className="font-semibold flex items-center mt-4 justify-center text-main rounded-full gap-2 border-2 border-main py-2 px-4 w-full"
            onClick={() => navigate(-1)}
          >
            {t("cart:back")}
          </button>
        </div>
      )}
    </div>
  );
};

export default SingleItem;
