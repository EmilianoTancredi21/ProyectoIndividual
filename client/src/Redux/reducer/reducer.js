import {
  GET_ALL_DRIVERS, //
  GET_DRIVER_BYNAME,
  GET_TEAMS, //
  FILTER_DRIVER_ALP, //
  FILTER_BY_DOB,
  GET_FILTER_BY_TEAMS,
  GET_FILTER_CREATED_DRIVERS,
  RESET_FILTER
} from "../actions/actions"

const initialState = {
  allDrivers: [],
  teams: [],
  driverFilters: []
}

// Función auxiliar para verificar si un driver creado en la base de datos está asociado con el equipo seleccionado
const isDriverInTeam = (driver, teamName) => {
  if (driver.createInDb) {
    return driver.Teams.some(team => team.name === teamName);
  }
  return false;
};



const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_DRIVERS:
      return {
        ...state,
        allDrivers: action.payload,
        driverFilters: action.payload,
      };

    case GET_FILTER_CREATED_DRIVERS:
      const allDrivers = [...state.allDrivers];
      const filterOrigin =
        action.payload === "API"
          ? allDrivers.filter((driver) => !driver.createInDb)
          : action.payload === "DATABASE"
          ? allDrivers.filter((driver) => driver.createInDb)
          : allDrivers;
      return {
        ...state,
        driverFilters: filterOrigin,
      };

    case GET_DRIVER_BYNAME:
      return {
        ...state,
        allDrivers: action.payload,
        driverFilters: action.payload,
      };

    case GET_TEAMS:
      return {
        ...state,
        teams: action.payload,
      };

    case FILTER_BY_DOB:
      const dobFilteredDrivers = [...state.driverFilters];
      if (action.payload === "BirthYear-asc") {
        return {
          ...state,
          driverFilters: dobFilteredDrivers.sort((a, b) => a.dob.localeCompare(b.dob)),
        };
      } else if (action.payload === "BirthYear-desc") {
        return {
          ...state,
          driverFilters: dobFilteredDrivers.sort((a, b) => b.dob.localeCompare(a.dob)),
        };
      }

    case GET_FILTER_BY_TEAMS:
      const filteredDrivers = action.payload === "All"
        ? state.allDrivers
        : state.driverFilters.filter(driver =>
            (driver.teams && driver.teams.includes(action.payload)) || isDriverInTeam(driver, action.payload)
          );
      return {
        ...state,
        driverFilters: filteredDrivers,
      };

    case FILTER_DRIVER_ALP:
      const alphabeticFilteredDrivers = [...state.driverFilters];
      if (action.payload === "A-Z") {
        return {
          ...state,
          driverFilters: alphabeticFilteredDrivers.sort((a, b) =>
            a.forename.toLowerCase().localeCompare(b.forename.toLowerCase())
          ),
        };
      } else if (action.payload === "Z-A") {
        return {
          ...state,
          driverFilters: alphabeticFilteredDrivers.sort((a, b) =>
            b.forename.toLowerCase().localeCompare(a.forename.toLowerCase())
          ),
        };
      }

    case RESET_FILTER:
      return {
        ...state,
        driverFilters: state.allDrivers,
        filterByTeam: "All",
        filterByDob: "0",
        filterByCreated: "All",
      };

    default:
      return state;
  }
};

export default rootReducer;

