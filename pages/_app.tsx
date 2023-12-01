import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";

type NextPageWithLayout = NextPage & {
  Layout?: (page: ReactElement) => ReactNode;
};
interface EmptyLayoutProps {
  children: NextPageWithLayout;
}

export default function App({
  Component,
  pageProps,
}: AppProps & { Component: NextPageWithLayout }) {
  const EmptyLayout = ({ children }: EmptyLayoutProps) => <>{children}</>;
  const SubLayout: any = Component.Layout || EmptyLayout;

  return (
    <Layout>
      <SubLayout>
        <Component {...pageProps} />
      </SubLayout>
    </Layout>
  );
}
