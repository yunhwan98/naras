import { fetchCountry } from "@/api";
import SubLayout from "@/components/SubLayout";
import { useRouter } from "next/router";
import style from "./[code].module.css";
import React from "react";
import Image from "next/image";
import Head from "next/head";

function Country({ country }: any) {
  const router = useRouter();
  const { code } = router.query;

  //fallback 상태인 경우
  if (router.isFallback) {
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
        <div> Loading...</div>
      </>
    );
  }

  //예외처리
  if (!country) {
    return <div>존재하지 않는 국가입니다.</div>;
  }
  return (
    <>
      <Head>
        {/* 타이틀 설정 */}
        <title>{country.commonName} 국가 정보 조회 | NARAS</title>

        {/* 오픈 그래프 태그 */}
        <meta property="og:image" content={country.flagImg} />
        <meta
          property="og:title"
          content={`${country.commonName} 국가 정보 조회 | NARAS`}
        />
        <meta
          property="og:description"
          content={`${country.commonName} 국가의 자세한 정보입니다.`}
        />
      </Head>
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
    </>
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
