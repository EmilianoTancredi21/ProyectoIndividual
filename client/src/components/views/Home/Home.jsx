import { useEffect, useState } from "react";
import styles from "../Home/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllDrivers } from "../../../Redux/actions/actions";
import Filters from "../../Filters/Filters";
import Cards from "../../Cards/Cards";
import Paginado from "../../Paginado/Paginado";

const Home = () => {
  const dispatch = useDispatch();
  const allDrivers = useSelector((state) => state.allDrivers);

  const [currentPage, setCurrentPage] = useState(1);
  const [driversPerPage, setDriversPerPage] = useState(16);

  const driverFilters = useSelector((state) => state.driverFilters);
  const filteredDrivers = driverFilters.length > 0 ? driverFilters : allDrivers;

  const indexOfLastDriver = currentPage * driversPerPage;
  const indexOfFirstDriver = indexOfLastDriver - driversPerPage;
  const currentDriver = filteredDrivers.slice(
    indexOfFirstDriver,
    indexOfLastDriver
  );

  const paginado = (numberPage) => {
    setCurrentPage(numberPage);
  };

  useEffect(() => {
    if (!driverFilters.length) {
      dispatch(getAllDrivers());
    }
  }, [dispatch, driverFilters]);

  useEffect(() => {
    setCurrentPage(1); // Reiniciar la página actual a 1 cuando los conductores filtrados cambien
  }, [driverFilters]);

  const applyFilters = () => {
    if (driverFilters.length > 0) {
      return filteredDrivers.slice(indexOfFirstDriver, indexOfLastDriver);
    } else {
      return currentDriver;
    }
  };

  return (
    <div>
      {currentDriver.length ? (
        <>
          <header className="w-full">
            <img
              src="https://res.cloudinary.com/dg8awhbvm/image/upload/v1716857894/f1_rnfmuv.jpg"
              alt="banner"
              className="w-full"
            />
          </header>
          <Filters setCurrentPage={setCurrentPage} />
          <Cards drivers={applyFilters()} />
          <div className={styles.paginado}>
            <Paginado
              currentPage={currentPage}
              driversPerPage={driversPerPage}
              allDrivers={filteredDrivers.length}
              paginado={paginado}
            />
          </div>
        </>
      ) : (
        <div className={styles.loading}>
          <img
            src="https://cdn.dribbble.com/users/176627/screenshots/1532773/media/1d5cbe1b4d6460b67e0f4b432eb688e8.gif"
            alt=""
          />
        </div>
      )}
    </div>
  );
};

export default Home;
