import CountryItem from "./CountryItem";
import style from "./CountryList.module.css";

export default function CountryList({ countries }: any) {
  return (
    <div className={style.container}>
      {countries.map((country: any) => (
        <CountryItem key={country.code} {...country} />
      ))}
    </div>
  );
}

CountryList.defaultProps = {
  countries: [],
};
