import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate }: any) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  console.log(postsPerPage, totalPosts, paginate);
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            onClick={() => paginate(number)}
            className="page-item"
          >
            <span className="page-link">{number}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
