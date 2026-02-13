
"use client";
import { createContext, useContext, useState} from "react";


const LoaderContext = createContext(undefined);

export function LoaderProvider({
  children,
}) {
  const [isLoader, setIsLoader] = useState(true);

  const toggleLoader = () => {
    setIsLoader(true);
  };

  return (
    <LoaderContext.Provider
      value={{
        isLoader,
        setIsLoader,
      }}
    >
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoaderContext() {
  const context = useContext(LoaderContext);

  if (!context) {
    throw new Error(
      "useMediaContext must be used within a DrawerLeadershipProvider"
    );
  }

  return context;
}
