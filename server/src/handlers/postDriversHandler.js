const { Team } = require("../db.js");

const createDriver = require('../controllers/postDriver');



const postDriversHandler = async (req, res) => {
    const { forename, surname, description, image, nationality, dob, teams } = req.body;
    try {
      const arrTeams = Array.isArray(teams) ? teams : teams.split(",").map((team) => team.trim());
      const newDriver = await createDriver(forename, surname, description, image, nationality, dob, arrTeams);
      await newDriver.reload({ include: Team }); // Recargar el conductor con la información de los equipos asociados
      res.status(200).json(newDriver);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


module.exports = {
    postDriversHandler
}


