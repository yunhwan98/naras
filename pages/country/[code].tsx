import { fetchCountry } from "@/api";
import SubLayout from "@/components/SubLayout";
import { useRouter } from "next/router";
import style from "./[code].module.css";
import React from "react";
import Image from "next/image";
import { count } from "console";

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
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.commonName}>
          {country.flagEmoji}&nbsp;{country.commonName}
        </div>
        <div className={style.officialName}>{country.officialName}</div>
      </div>

      <div className={style.flag_img}>
        {/* <img src={country.flagImg} /> */}
        <Image alt="country_img" src={country.flagImg} fill />
      </div>

      <div className={style.body}>
        <div>
          <b>코드 :</b>&nbsp;{country.code}
        </div>
        <div>
          <b>수도 :</b>&nbsp;{country.capital.join(", ")}
        </div>
        <div>
          <b>지역 :</b>&nbsp;{country.region}
        </div>
        <div>
          <b>지도 :</b>&nbsp;
          <a target="_blank" href={country.googleMapURL}>
            {country.googleMapURL}
          </a>
        </div>
      </div>
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
