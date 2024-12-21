/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from "react";

const RatingContext = createContext();

export const RatingProvider = ({ children }) => {
  const [modalOn, setModalOn] = useState(false);

  return (
    <RatingContext.Provider
      value={{
        modalOn,
        setModalOn,
      }}
    >
      {children}
    </RatingContext.Provider>
  );
};

export const useRatingContext = () => useContext(RatingContext);
