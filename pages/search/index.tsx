import { fetchSearchResults } from "@/api";
import SubLayout from "@/components/SubLayout";
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
    <div>
      {countries.map((country: any) => (
        <div key={country.code}>{country.commonName}</div>
      ))}
    </div>
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
