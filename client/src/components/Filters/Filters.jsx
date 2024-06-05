import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  GetAllTeams,
  GetFilterByTeam,
  filterDriver,
  FilterByDob,
  GetFilterCreatedDriver,
  resetFilters,
} from "../../Redux/actions/actions";
import SearchBar from "../SearchBar/SearchBar";
import styles from "../Filters/Filters.module.css";

const Filters = ({ setCurrentPage }) => {
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.teams);
  const allTeamsDrivers = Array.isArray(teams) ? new Set(teams) : new Set();
  const allTeams = [...allTeamsDrivers];

  const [orderBy, setOrderBy] = useState("0");
  const [filterByBirthdate, setFilterByBirthdate] = useState("0");
  const [filterByTeam, setFilterByTeam] = useState("All");
  const [filterByOrigin, setFilterByOrigin] = useState("0");

  useEffect(() => {
    dispatch(GetAllTeams());
  }, []);

  const filterByDob = (event) => {
    const selectedValue = event.target.value;
    setFilterByBirthdate(selectedValue);
    dispatch(FilterByDob(event.target.value));
    setCurrentPage(1);
  };

  const handlersFilterByTeam = (event) => {
    const selectedValue = event.target.value;
    setFilterByTeam(selectedValue);
    dispatch(GetFilterByTeam(event.target.value));
    setCurrentPage(1);
  };

  const filterOrd = (event) => {
    const selectedValue = event.target.value;
    setOrderBy(selectedValue);
    dispatch(filterDriver(event.target.value));
    setCurrentPage(1);
  };

  const FilterCreatedDriver = (event) => {
    const selectedValue = event.target.value;
    setFilterByOrigin(selectedValue);
    dispatch(GetFilterCreatedDriver(event.target.value));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setOrderBy("0");
    setFilterByBirthdate("0");
    setFilterByTeam("All");
    setFilterByOrigin("0");
    dispatch(resetFilters());
    setCurrentPage(1);
    // dispatch(resetFilters());
  };

  return (
    <div className={styles.containerSelect}>
      <div>
        <select
          className={styles.selectBox}
          value={orderBy}
          onChange={(event) => filterOrd(event)}
        >
          <option defaultValue="0">Order by name..</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
      </div>
      <div>
        <select
          className={styles.selectBox}
          value={filterByBirthdate}
          onChange={(event) => filterByDob(event)}
        >
          <option defaultValue="0">Birthdate</option>
          <option value="BirthYear-asc">Birth Year (Asc)</option>
          <option value="BirthYear-desc">Birth Year (Desc)</option>
        </select>
      </div>
      <div>
        <select
          onChange={(event) => handlersFilterByTeam(event)}
          name=""
          className={styles.selectBox}
          value={filterByTeam}
        >
          <option value="All">Teams</option>
          {allTeams.map((t) => (
            <option key={`${t}`} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          className={styles.selectBox}
          value={filterByOrigin}
          onChange={(event) => FilterCreatedDriver(event)}
        >
          <option defaultValue="0">Origin</option>
          <option value="All">ALL</option>
          <option value="API">API</option>
          <option value="DATABASE">DataBase</option>
        </select>
      </div>
      <div>
        <button className={styles.reset} onClick={handleResetFilters}>
          Reset
        </button>
      </div>
      <SearchBar />
    </div>
  );
};

export default Filters;
