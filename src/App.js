import logo from "./logo.svg";
import React, { useEffect, useState } from "react";
import CountryCard from "./components/CountryCard";
import CountryModal from "./components/CountryModal";
import Pagination from "./components/Pagination";
import Fuse from "fuse.js";
import "./App.css";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [modalCountry, setModalCountry] = useState(null);

  const ITEMS_PER_PAGE = 25;

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
      });
  }, []);

  /*Search Function*/
  const handleSearch = (term) => {
    setSearchTerm(term);
    const fuse = new Fuse(countries, {
      keys: ["name.official"],
      threshold: 0.3,
    });
    const results = fuse.search(term).map((result) => result.item);
    setFilteredCountries(results);
  };

  /*sort Function*/
  const handleSort = () => {
    const sorted = [...filteredCountries].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.official.localeCompare(b.name.official);
      } else {
        return b.name.official.localeCompare(a.name.official);
      }
    });
    setFilteredCountries(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  /*Paginationn*/
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredCountries.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="App">
      <h1>Countries Catalog</h1>
      <input
        type="text"
        placeholder="Search by country name"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <button onClick={handleSort}>
        Sort {sortOrder === "asc" ? "Desc" : "Asc"}
      </button>
      <hr></hr>
      <div className="country-list">
        {currentItems.map((country) => (
          <CountryCard
            key={country.cca3}
            country={country}
            onClick={() => setModalCountry(country)}
          />
        ))}
      </div>
      <Pagination
        itemsPerPage={ITEMS_PER_PAGE}
        totalItems={filteredCountries.length}
        currentPage={currentPage}
        paginate={setCurrentPage}
      />
      {modalCountry && (
        <CountryModal
          country={modalCountry}
          onClose={() => setModalCountry(null)}
        />
      )}
    </div>
  );
};
export default App;
