import { AppContext } from "@shared/contextApi/AppProvider";
import { AppContextType } from "@shared/interface";
import { useContext } from "react"


const useGlobalContext = () => {
  return useContext(AppContext) as AppContextType
}

export default useGlobalContext;
