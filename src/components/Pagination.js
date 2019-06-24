import React from "react";
import _ from "lodash";

export default function Pagination({
  items,
  itemsPerPage,
  currentPage,
  onChangePage
}) {
  const pagesCount = Math.ceil(items.length / itemsPerPage);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={currentPage === page ? "page-item active" : "page-item"}
          >
            <button className="page-link" onClick={() => onChangePage(page)}>
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
