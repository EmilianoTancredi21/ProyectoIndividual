import React, { useEffect, useState } from "react";
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
  const [driversPerPage, setDriversPerPage] = useState(9);

  const driverFilters = useSelector((state) => state.driverFilters);
  const filteredDrivers =
    driverFilters.length > 0 ? driverFilters : allDrivers;

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
    if(!driverFilters.length){
      dispatch(getAllDrivers());
    }
  }, [dispatch, driverFilters]);
  
  useEffect(() => {
    setCurrentPage(1); // Reiniciar la página actual a 1 cuando los conductores filtrados cambien
  }, [driverFilters]);

  const applyFilters = () => {
    if (driverFilters.length > 0) {
      return filteredDrivers.slice(
        indexOfFirstDriver,
        indexOfLastDriver
      );
    } else {
      return currentDriver;
    }
  };

  return (
    <div>
      {currentDriver.length ? (
        <>
          <Filters setCurrentPage={setCurrentPage} />
          <div className={styles.paginado}>
            <Paginado
              currentPage={currentPage}
              driversPerPage={driversPerPage}
              allDrivers={filteredDrivers.length} // Utiliza la longitud de los conductores filtrados
              paginado={paginado}
            />
          </div>
          <Cards drivers={applyFilters()} />
        </>
      ) : (
        <img
          src="https://cdn.dribbble.com/users/3213828/screenshots/6612869/mclarenf1800x600.gif"
          alt=""
        />
      )}
    </div>
  );
};

export default Home;