import { fetchCountries } from "@/api";
import CountryList from "@/components/CountryList";
import Searchbar from "@/components/Searchbar";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home({ countries }: any) {
  return (
    <>
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
