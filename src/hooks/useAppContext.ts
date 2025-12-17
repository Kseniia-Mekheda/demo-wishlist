import { useContext } from "react";
import { AppContext } from "~/context/appContext";
import type { AppContextInterface } from "~/types/context/app-context-interface";

const useAppContext = () : AppContextInterface => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context as AppContextInterface;
};

export default useAppContext;