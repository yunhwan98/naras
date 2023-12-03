import { fetchSearchResults } from "@/api";
import CountryList from "@/components/CountryList";
import Searchbar from "@/components/Searchbar";
import SubLayout from "@/components/SubLayout";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Search() {
  const router = useRouter();
  const { q } = router.query;

  const [countries, setCountries] = useState([]);

  const setData = async () => {
    const data = await fetchSearchResults(q as string);
    setCountries(data);
  };

  //Client Side Rendering
  useEffect(() => {
    //q
    if (q) {
      setData();
    }
  }, [q]);

  return (
    <>
      <Head>
        {/* 타이틀 설정 */}
        <title>NARAS 검색 결과</title>

        {/* 오픈 그래프 태그 */}
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="NARAS" />
        <meta
          property="og:description"
          content="전 세계 국가들의 정보를 확인해보세요"
        />
      </Head>
      <Searchbar q={q} />
      <CountryList countries={countries} />
    </>
  );
}

export default Search;

//Search라는 객체에 SubLayout 추가
Search.Layout = SubLayout;

// export const getServerSideProps = async (context: any) => {
//   //context안에는 브라우저에서 받은 요청에 정보들이 있음

//   //1. 검색 결과 api 호출
//   //2. Props 리턴

//   const { q } = context.query;

//   let countries = [];
//   if (q) {
//     countries = await fetchSearchResults(q);
//   }

//   return {
//     props: { countries },
//   };
// };
