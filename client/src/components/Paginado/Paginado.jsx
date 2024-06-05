// import React from "react";
// import styles from "../Paginado/Paginado.module.css";

// const Paginado = ({ currentPage, driversPerPage, allDrivers, paginado }) => {
//   const totalPages = Math.ceil(allDrivers / driversPerPage);
//   const pageNumbers = [];
//   const maxPageNumbers = 6;

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       paginado(currentPage + 1);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       paginado(currentPage - 1);
//     }
//   };

//   const updatePageNumbers = () => {
//     const middlePage = Math.floor(maxPageNumbers / 2);
//     let startPage = currentPage - middlePage;
//     let endPage = currentPage + middlePage;

//     if (startPage <= 0) {
//       startPage = 1;
//       endPage = maxPageNumbers;
//     }

//     if (endPage > totalPages) {
//       endPage = totalPages;
//       startPage = totalPages - maxPageNumbers + 1;
//       startPage = startPage <= 0 ? 1 : startPage;
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pageNumbers.push(i);
//     }
//   };

//   updatePageNumbers();

//   return (
//     <nav>
//       <ul className={styles.paginationb}>
//         <li>
//           <a
//             onClick={handlePreviousPage}
//             disabled={currentPage === 1}
//             className={styles.pageButton}
//           >
//             ← Prev
//           </a>
//         </li>
//         {pageNumbers.map((number) => (
//           <li key={number}>
//             <button
//               onClick={() => paginado(number)}
//               className={
//                 currentPage === number
//                   ? styles.activePageButton
//                   : styles.paginationb
//               }
//             >
//               {number}
//             </button>
//           </li>
//         ))}
//         <li>
//           <a
//             onClick={handleNextPage}
//             disabled={currentPage === totalPages}
//             className={styles.pageButton}
//           >
//             Next →
//           </a>
//         </li>
//       </ul>
//     </nav>
//   );
// };
// export default Paginado;

import React from "react";
import styles from "../Paginado/Paginado.module.css";

const Paginado = ({ currentPage, driversPerPage, allDrivers, paginado }) => {
  const totalPages = Math.ceil(allDrivers / driversPerPage);
  const pageNumbers = [];
  const maxPageNumbers = 6;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      paginado(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      paginado(currentPage - 1);
    }
  };

  const updatePageNumbers = () => {
    const middlePage = Math.floor(maxPageNumbers / 2);
    let startPage = currentPage - middlePage;
    let endPage = currentPage + middlePage;

    if (startPage <= 0) {
      startPage = 1;
      endPage = maxPageNumbers;
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = totalPages - maxPageNumbers + 1;
      startPage = startPage <= 0 ? 1 : startPage;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
  };

  updatePageNumbers();

  return (
    <div className={styles.pagination}>
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className={styles.pageButton}
      >
        &laquo;
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginado(number)}
          className={
            currentPage === number ? styles.activePageButton : styles.pagination
          }
        >
          {number}
        </button>
      ))}

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={styles.pageButton}
      >
        &raquo;
      </button>
    </div>
  );
};
export default Paginado;
