import axios from "axios";

//Creamos las actions-types

export const GET_ALL_DRIVERS = "GET_ALL_DRIVERS"; //
export const GET_DRIVER_BYNAME = "GET_DRIVER_BYNAME"; //
export const GET_TEAMS = "GET_TEAMS"; //
export const FILTER_DRIVER_ALP = "FILTER_DRIVER_ALP";
export const GET_FILTER_BY_TEAMS = "GET_FILTER_BY_TEAMS";
export const FILTER_BY_DOB = "FILTER_BY_DOB";
export const GET_FILTER_CREATED_DRIVERS = "GET_FILTER_CREATED_DRIVERS";
export const RESET_FILTER = "RESET_FILTER";

const URL = "http://localhost:3001";

//Creamos las actions

export const getAllDrivers = () => {
  return async (dispatch) => {
    try {
      const response = await axios(`${URL}/drivers`);
      dispatch({
        type: GET_ALL_DRIVERS,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const GetAllTeams = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/teams`);
      dispatch({
        type: GET_TEAMS,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const GetDriverByName = (name) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/drivers/name?name=${name}`);
      dispatch({
        type: GET_DRIVER_BYNAME,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
};

export const FilterByDob = (order) => {
  return function (dispatch) {
    try {
      dispatch({ type: FILTER_BY_DOB, payload: order });
    } catch (error) {
      alert(error.response.data);
    }
  };
};

export const filterDriver = (order) => {
  return (dispatch) => {
    try {
      dispatch({
        type: FILTER_DRIVER_ALP,
        payload: order,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const GetFilterByTeam = (info) => ({
  ///
  type: GET_FILTER_BY_TEAMS,
  payload: info,
});

export function GetFilterCreatedDriver(infOrigin) {
  ///
  return {
    type: GET_FILTER_CREATED_DRIVERS,
    payload: infOrigin,
  };
}

export const resetFilters = () => {
  return {
    type: RESET_FILTER,
  };
};
