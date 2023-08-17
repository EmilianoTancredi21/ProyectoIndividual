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
  driverFilters: [],
  driversCopy: []
}


// Función auxiliar para verificar si un driver creado en la base de datos está asociado con el equipo seleccionado
// const isDriverInTeam = (driver, teamName) => {
//   if (driver.createInDb) {
//     return driver.Teams.some(team => team.name === teamName);
//   }
//   return false;
// };



const rootReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_ALL_DRIVERS:
      return {
        ...state,
        allDrivers: action.payload,
        driverFilters: action.payload,

        driversCopy: action.payload,
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
        // allDrivers: action.payload,
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



    // case GET_FILTER_BY_TEAMS:
    //   const team = action.payload;
    //   const filteredTeam = state.driverFilters.filter((t) => {
    //     const teamsArray = t.teams ? t.teams.split(",").map((team) => team.trim()) : []
    //     return teamsArray.includes(team);
    //   });
    
    //   if (!filteredTeam || filteredTeam.length === 0) {
    //     alert("No drivers with this team, please reset filters");
    //   }
      
    //   return {
    //     ...state,
    //     driverFilters: filteredTeam,
    // };

    case GET_FILTER_BY_TEAMS:
      const team = action.payload;
      const filteredTeam = state.driverFilters.filter((t) => {    ///itero sobre cada filtro de conductor (t) en state.driverFilters y realizo una comprobación.
        const teamsArray = t.Teams ? t.Teams.map(team => team.name) : []; ///: Si el filtro de conductor tiene un arreglo de equipos (t.Teams), se crea un nuevo arreglo teamsArray que contiene los nombres de los equipos. Si no hay un arreglo de equipos, se asigna un arreglo vacío.
        const isDriverInTeamFromDb = t.createInDb && teamsArray.includes(team);///e verifica si el filtro de conductor fue creado en la base de datos (t.createInDb) y si el equipo proporcionado (team) se encuentra en teamsArray
        const isDriverInTeamFromApi = t.teams && t.teams.includes(team);
        return isDriverInTeamFromDb || isDriverInTeamFromApi;
      });
    
      if (!filteredTeam || filteredTeam.length === 0) {
        alert("No drivers with this team, please reset filters");
      }
      
      return {
        ...state,
        driverFilters: filteredTeam,
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
        driverFilters: state.allDrivers
      };

    default:
      return state;
  }
};

export default rootReducer;

