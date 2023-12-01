import { fetchCountry } from "@/api";
import SubLayout from "@/components/SubLayout";
import { useRouter } from "next/router";
import React from "react";

function Country({ country }: any) {
  const router = useRouter();
  const { code } = router.query;

  //fallback 상태인 경우
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  //예외처리
  if (!country) {
    return <div>존재하지 않는 국가입니다.</div>;
  }
  return (
    <div>
      {country.commonName} {country.officialName}
    </div>
  );
}

export default Country;

Country.Layout = SubLayout;

export const getStaticPaths = async () => {
  return {
    paths: [{ params: { code: "ABW" } }, { params: { code: "KOR" } }],
    //path 이외의 페이지들은 404로 설정
    fallback: true,
  };
};

export const getStaticProps = async (context: any) => {
  const { code } = context.params;
  console.log(`${code} 페이지 생성!`);

  let country = null;

  if (code) {
    country = await fetchCountry(code);
  }
  return {
    props: { country },
    //ISR 방식
    //재생성 시간 3초
    revalidate: 3,
  };
};
