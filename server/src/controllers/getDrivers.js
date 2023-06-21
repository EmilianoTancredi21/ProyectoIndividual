const axios = require("axios");
const { Driver, Team } = require("../db.js");
const noImage = "https://i.pinimg.com/736x/a4/fc/6c/a4fc6c0d3d05fe453cdbafba248ae20c.jpg";

const getAllDrivers = async (name) => {
  /*** DB ***/
  const allDriversDb = await Driver.findAll({
    include: {
      model: Team,
      attributes: ["name"],
    },
  });

  /*** API ***/
  const peticion = (await axios("http://localhost:5000/drivers")).data;
  const allDriversApi = peticion.map((driver) => {
    return {
      id: driver.id,
      forename: driver.name.forename,
      surname: driver.name.surname,
      description: driver.description || "",
      image: driver.image.url || noImage,
      nationality: driver.nationality,
      dob: driver.dob,
      teams: driver.teams,
    };
  });

  const allDrivers = [...allDriversApi, ...allDriversDb];

  if (name) {
    const driversByName = allDrivers.filter((driver) =>
      driver.forename.toLowerCase().startsWith(name.toLowerCase())
    );
    if (driversByName.length > 0) {
      return driversByName.slice(0, 15);
    } else {
      throw new Error(`No match found for name: ${name}`);
    }
  }

  return allDrivers;
};

module.exports = getAllDrivers;






  
  
  
  

  
  
  
  
  
  
  
  
  
  
  ///https://i.pinimg.com/736x/a4/fc/6c/a4fc6c0d3d05fe453cdbafba248ae20c.jpg