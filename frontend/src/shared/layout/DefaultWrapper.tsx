//@refresh
"use client";
import React, { useEffect } from "react";
import { animationCreate } from "@shared/utils/utils";
import BacktoTop from "@shared/components/common/backToTop/BacktoTop";
if (typeof window !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require("bootstrap/dist/js/bootstrap");
}
import { usePathname } from "next/navigation";
import FooterOne from "./footer/FooterOne";
import HeaderOne from "./header/HeaderOne";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const pathName = usePathname();
  useEffect(() => {
    setTimeout(() => {
      animationCreate();
    }, 200);
  }, []);

  return (
    <>
      <BacktoTop />
      <HeaderOne />
      {children}
      {(() => {
        switch (pathName) {
          default:
            return <FooterOne />;
        }
      })()}
    </>
  );
};

export default Wrapper;
