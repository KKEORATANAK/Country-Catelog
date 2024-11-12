import React from "react";

const CountryCard = ({ country, onClick }) => {
  return (
    <div className="country-card" onClick={onClick}>
      <img src={country.flags.png} alt={`${country.name.official} flag`} />
      <h2>{country.name.official}</h2>
      <p>
        Code: {country.cca2}, {country.cca3}
      </p>
      <p>
        Native Name:{" "}
        {country.name.nativeName
          ? Object.values(country.name.nativeName)[0].common
          : "N/A"}
      </p>
      <p>Alternative Names: {country.altSpellings.join(", ")}</p>
      <p>
        Calling Codes: {country.idd.root}
        {country.idd.suffixes?.join(", ")}
      </p>
    </div>
  );
};

export default CountryCard;
