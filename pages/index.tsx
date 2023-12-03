import { fetchCountries } from "@/api";
import CountryList from "@/components/CountryList";
import Searchbar from "@/components/Searchbar";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Home({ countries }: any) {
  return (
    <>
      <Head>
        {/* 타이틀 설정 */}
        <title>NARAS</title>

        {/* 오픈 그래프 태그 */}
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="NARAS" />
        <meta
          property="og:description"
          content="전 세계 국가들의 정보를 확인해보세요"
        />
      </Head>
      <Searchbar />
      <CountryList countries={countries} />
    </>
  );
}

export const getStaticProps = async () => {
  const countries = await fetchCountries();
  console.log("countries 데이터 불러옴");

  return {
    //props가 꼭 존재해야하고, 객체여야 함
    props: {
      countries,
    },
  };
};
