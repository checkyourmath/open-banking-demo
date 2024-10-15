import { AppContext } from "@shared/contextApi/AppProvider";
import { AppContextType } from "@shared/interFace/interFace";
import { usePathname } from "next/navigation";
import { useContext, useEffect } from "react";

const useScrollDirection = (element: HTMLElement | null) => {
  const { scrollDirection, setScrollDirection } = useContext(AppContext) as AppContextType
  const pathName = usePathname();

  useEffect(() => {
    let prevScrollY = window.scrollY;

    const handleScroll = () => {
      const isAtTop = window.scrollY === 0;
      setScrollDirection?.(isAtTop ? "up" : "down");
      prevScrollY = window.scrollY;
    };

    const handleClick = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("scroll", handleScroll);
    if (element) {
      element.addEventListener("click", handleClick);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [element, setScrollDirection]);
  // Use the pathName to trigger setScrollDirection("up") when the pathname changes.
  useEffect(() => {
    setScrollDirection?.("up");
  }, [pathName, setScrollDirection]);

  return scrollDirection;
};

export default useScrollDirection;
