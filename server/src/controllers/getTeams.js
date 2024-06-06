const { Team } = require("../db.js");
const axios = require("axios");

const getAllTeams = async () => {
  const allTeamsDb = await Team.findAll();

  if (!allTeamsDb.length) {
    try {
      const response = await axios.get(
        "https://drivers-zmnv.onrender.com/drivers"
      );
      const drivers = response.data;

      const driverTeams = drivers
        .map((driver) => driver.teams)
        .filter((teams) => teams !== undefined)
        .reduce((acc, teams) => {
          const splitTeams = teams.split(",").map((team) => team.trim());
          return [...acc, ...splitTeams];
        }, [])
        .filter((team, index, arr) => arr.indexOf(team) === index);

      const teamObjects = driverTeams.map((name) => ({ name }));
      await Team.bulkCreate(teamObjects);
      return driverTeams.sort();
    } catch (error) {
      console.error("Error al obtener los equipos de la API:", error);
    }
  } else {
    const driverTeams = allTeamsDb.map((driver) => driver.name);

    return driverTeams.sort();
  }
};

module.exports = getAllTeams;
