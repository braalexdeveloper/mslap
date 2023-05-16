import React from "react";

export const Pagination = ({
  totalPag,
  handlePag,
  currentPage,
  setCurrentPage,
}) => {
  const numPage = [];
  for (let i = 1; i <= totalPag; i++) {
    numPage.push(i);
  }

  const next = () => {
    setCurrentPage(currentPage + 1);
  };

  const prev = () => {
    setCurrentPage(currentPage - 1);
  };

  if (totalPag < 2) {
    return <></>;
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className={"page-item " + (currentPage <= 1 ? "disabled" : "")}>
          <button className="page-link" onClick={() => prev()}>
            Previous
          </button>
        </li>
        {numPage.map((el) => (
          <li
            className={"page-item " + (currentPage === el ? "active" : "")}
            key={el}
          >
            <button className="page-link" onClick={() => handlePag(el)}>
              {el}
            </button>
          </li>
        ))}
        <li
          className={"page-item " + (currentPage >= totalPag ? "disabled" : "")}
        >
          <button className="page-link" onClick={() => next()}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};
