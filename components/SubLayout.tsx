import React from "react";
import style from "./SubLayout.module.css";

interface SubLayoutProps {
  children: JSX.Element;
}
function SubLayout({ children }: any) {
  return (
    <>
      {children}
      <footer className={style.footer}>@yunhwan</footer>
    </>
  );
}

export default SubLayout;
