import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {GetAllTeams,GetFilterByTeam, filterDriver, FilterByDob, GetFilterCreatedDriver, resetFilters } from "../../Redux/actions/actions";
import styles from "../Filters/Filters.module.css";


const Filters = ({setCurrentPage}) => {

  const dispatch = useDispatch();
  const teams = useSelector((state) => state.teams);
  const allTeamsDrivers = Array.isArray(teams) ? new Set(teams) : new Set();
  const allTeams = [...allTeamsDrivers];

  useEffect(() => {
    dispatch(GetAllTeams());
  }, [])

  const filterByDob = (event) => {
    dispatch(FilterByDob(event.target.value));
    setCurrentPage(1);
};

  const handlersFilterByTeam = (event) => {
    dispatch(GetFilterByTeam(event.target.value));
    setCurrentPage(1);
};

const filterOrd = (event) => {
  dispatch(filterDriver(event.target.value));
  setCurrentPage(1);
};

const FilterCreatedDriver = (event) => {
  dispatch(GetFilterCreatedDriver(event.target.value));
  setCurrentPage(1);
};

const handleResetFilters = () => {
  dispatch(resetFilters());
  setCurrentPage(1);
};



return (
  <div className={styles.containerSelect}>
    <div>
      <select className={styles.selectBox} onChange={ event => filterOrd(event)}>
        <option defaultValue="0">
          Order by name..
        </option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
      </select>
    </div>
    <div>
      <select className={styles.selectBox} onChange={event => filterByDob(event)}>
        <option defaultValue="0">
          Birthdate
        </option>
        <option value="BirthYear-asc">Birth Year (Asc)</option>
        <option value="BirthYear-desc">Birth Year (Desc)</option>
      </select>
    </div>
      <div>
        <select
          onChange={(event) => handlersFilterByTeam(event)}
          name=""
          className={styles.selectBox}
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
      <select className={styles.selectBox} onChange={(event) => FilterCreatedDriver(event)}>
      <option defaultValue="0">
          Origin
        </option>
        <option value="All">ALL</option>
        <option value="API">API</option>
        <option value="DATABASE">DataBase</option>
      </select>
      </div>
      <div>
        <button className={styles.reset} onClick={handleResetFilters}>Clear filters</button>
      </div>
  </div>
);

};

export default Filters;





