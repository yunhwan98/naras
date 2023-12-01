import React from "react";
import style from "./Layout.module.css";
import { useRouter } from "next/router";

interface LayoutProps {
  children: JSX.Element;
}

function Layout({ children }: LayoutProps) {
  const router = useRouter();

  const onClickHeader = () => {
    router.push("/");
  };
  return (
    <div className="layout">
      <header onClick={onClickHeader} className={style.header}>
        NARAS 🌎
      </header>
      <main className={style.main}>{children}</main>
    </div>
  );
}

export default Layout;
