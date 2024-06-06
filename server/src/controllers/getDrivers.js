const axios = require("axios");
const { Driver, Team } = require("../db.js");
const noImage =
  "https://i.pinimg.com/736x/a4/fc/6c/a4fc6c0d3d05fe453cdbafba248ae20c.jpg";

const getAllDrivers = async (name) => {
  // try {
  //   // Obtener todos los conductores de la base de datos
  //   const allDriversDb = await Driver.findAll({
  //     include: {
  //       model: Team,
  //       attributes: ["name"],
  //     },
  //   });

  //   // Obtener todos los conductores de la API
  //   const response = await axios.get("http://localhost:5000/drivers");
  //   const allDriversApi = response.data.map((driver) => ({
  //     id: driver.id,
  //     forename: driver.name && driver.name.forename ? driver.name.forename : "",
  //     surname: driver.name && driver.name.surname ? driver.name.surname : "",
  //     description: driver.description || "",
  //     image: driver.image && driver.image.url ? driver.image.url : noImage,
  //     nationality: driver.nationality || "",
  //     dob: driver.dob || "",
  //     teams: driver.teams || "",
  //   }));

  //   // Combinar conductores de la base de datos y de la API
  //   const allDrivers = [...allDriversDb, ...allDriversApi];

  //   // Filtrar por nombre si se proporciona
  //   if (name) {
  //     const driversByName = allDrivers.filter((driver) =>
  //       driver.forename.toLowerCase().startsWith(name.toLowerCase())
  //     );
  //     if (driversByName.length > 0) {
  //       return driversByName.slice(0, 15);
  //     } else {
  //       throw new Error(
  //         `No se encontraron coincidencias para el nombre: ${name}`
  //       );
  //     }
  //   }

  //   return allDrivers;
  // } catch (error) {
  //   console.error("Error al obtener los datos de los corredores:", error);
  //   throw error;
  // }

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
      forename: driver.name && driver.name.forename ? driver.name.forename : "",
      surname: driver.name && driver.name.surname ? driver.name.surname : "",
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
