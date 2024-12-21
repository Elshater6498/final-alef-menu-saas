import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";
import { axiosBase } from "../../constatns";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN0YXVyYW50SWQiOiJiNDZjODg3Ni05YjkyLTQxN2ItOGQ5Ny1kYWM5OWQ5OGZjZjQiLCJ1c2VySWQiOiJhMTZmZmJkYi05ZWMxLTQxMzAtYWI5NS04NTA2Njk5NzI2MGEiLCJyb2xlIjoyLCJwZXJtaXNzaW9ucyI6WyJwZXJtaXNzaW9ucy5saXN0IiwidXNlcnMubGlzdCIsInVzZXJzLnJlYWQiLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJ1c2Vycy5zZWxmIiwicGxhbnMubGlzdCIsInBsYW5zLnJlYWQiLCJwbGFucy5jcmVhdGUiLCJwbGFucy51cGRhdGUiLCJwbGFucy5kZWxldGUiLCJyZXN0YXVyYW50cy5saXN0IiwicmVzdGF1cmFudHMucmVhZCIsInJlc3RhdXJhbnRzLnVwZGF0ZSIsImNhdGVnb3JpZXMubGlzdCIsImNhdGVnb3JpZXMucmVhZCIsImNhdGVnb3JpZXMuY3JlYXRlIiwiY2F0ZWdvcmllcy51cGRhdGUiLCJjYXRlZ29yaWVzLmRlbGV0ZSIsInByb2R1Y3RzLmxpc3QiLCJwcm9kdWN0cy5yZWFkIiwicHJvZHVjdHMuY3JlYXRlIiwicHJvZHVjdHMudXBkYXRlIiwicHJvZHVjdHMuZGVsZXRlIiwicmF0ZXMubGlzdCIsInJhdGVzLnJlYWQiLCJyYXRlcy5kZWxldGUiLCJvcmRlcnMubGlzdCIsIm9yZGVycy51cGRhdGUiXSwiZXhwIjoxNzMwNDcwMTI1fQ.jtjV2kKURAk0yYIdPhZb0Xy1y_200ULyv86mxqYc-bw";

// Restaurant
export const useRestaurant = (lang, domain) => {
  return useQuery({
    queryKey: [QUERY_KEYS.RESTAURANT, lang],
    queryFn: () =>
      axiosBase.get("/restaurants", {
        headers: {
          language: lang,
          "frontend-domain": domain,
        },
      }),
    retry: 3,
  });
};

// Categories
export const useCategories = (res_id, lang) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES, res_id, lang],
    queryFn: () =>
      axiosBase.get(`/categories?resid=${res_id}`, {
        headers: {
          language: lang,
        },
      }),
    enabled: !!res_id,
  });
};

// Products
export const useProductsByCategoryID = (res_id, categoryId, lang) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS_BY_CAT_ID, res_id, categoryId, lang],
    queryFn: () =>
      axiosBase.get(`/products?resid=${res_id}&categoryid=${categoryId}`, {
        headers: {
          language: lang,
        },
      }),
    enabled: !!res_id && !!categoryId,
  });
};

// Products
export const useProducts = (res_id, lang) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, res_id, lang],
    queryFn: () =>
      axiosBase.get(`/products?resid=${res_id}`, {
        headers: {
          language: lang,
        },
      }),
    enabled: !!res_id,
  });
};

// Product
export const useProduct = (productId, res_id, lang) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCT, productId, res_id, lang],
    queryFn: () =>
      axiosBase.get(`/products/${productId}?resid=${res_id}`, {
        headers: {
          language: lang,
          Authorization: `Bearer ${token}`,
        },
      }),
    enabled: !!productId && !!res_id,
  });
};

// Rate
export const useRate = (lang) => {
  return useMutation({
    mutationKey: [QUERY_KEYS.RATE, lang],
    mutationFn: (data) => axiosBase.post(`/rates`, data),
  });
};

// Order
export const useOrder = (onSuccess, onError) => {
  return useMutation({
    mutationKey: [QUERY_KEYS.ORDER],
    mutationFn: (data) => axiosBase.post(`/orders`, data),
    onSuccess,
    onError
  });
};

export const useSendOtp = (onSuccess, onError) => {
  return useMutation({
    mutationKey: [QUERY_KEYS.SEND_OTP],
    mutationFn: (data) => {
      const formData = new FormData();
      formData.append('phone', data.phone);
      return axiosBase.post('/otp/send', formData);
    },
    onSuccess,
    onError,
  });
};

export const useVerifyOtp = (onSuccess, onError) => {
  return useMutation({
    mutationKey: [QUERY_KEYS.VERIFY_OTP],
    mutationFn: (data) => {
      const formData = new FormData();
      formData.append('phone', data.phone);
      formData.append('code', data.code);
      return axiosBase.post('/otp/verify', formData);
    },
    onSuccess,
    onError,
  });
};

