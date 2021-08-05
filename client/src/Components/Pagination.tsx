import React from "react";
import { useState } from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate }: any) => {
  const [page, setPage] = useState(1);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  console.log(postsPerPage, totalPosts, paginate);
  return (
    <nav>
      <span
        className="pg"
        style={{
          color: "red",
          fontSize: "100%",
          position: "absolute",
          right: "17%",
          top: "17%",
        }}
      >
        Page Number: {page}
      </span>

      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            onClick={() => paginate(number)}
            className="page-item"
          >
            <span className="page-link" onClick={() => setPage(number)}>
              {number}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
