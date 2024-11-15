import React from "react";

const CountryModal = ({ country, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>{country.name.official}</h2>
        <img src={country.flags.png} alt={`${country.name.official} flag`} />
        <p>
          Code: {country.cca2} | {country.cca3}
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
    </div>
  );
};

export default CountryModal;
