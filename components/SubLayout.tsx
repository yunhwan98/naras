import React from "react";
import style from "./SubLayout.module.css";

interface SubLayoutProps {
  children: JSX.Element;
}
function SubLayout({ children }: SubLayoutProps) {
  return (
    <div className="SubLayout">
      <div>{children}</div>
      <footer className={style.footer}>@yunhwan</footer>
    </div>
  );
}

export default SubLayout;
