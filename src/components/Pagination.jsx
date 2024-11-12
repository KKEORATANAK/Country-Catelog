import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const handlePageClick = (event) => {
    paginate(event.selected + 1);
  };

  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={handlePageClick}
      previousLabel={"Previous"}
      nextLabel={"Next"}
      containerClassName={"pagination"}
      activeClassName={"active"}
      forcePage={currentPage - 1}
    />
  );
};

export default Pagination;
