const { Router } = require("express");

const { allDriversHandler} = require ("../handlers/getAllDriversHandler")
const { driversByIdHandler} = require ("../handlers/getDriversByIdHandler");
const {driversByNameHandler} = require ("../handlers/getDriversByNameHandler");
const { postDriversHandler} = require ("../handlers/postDriversHandler");
const { allTeamsHandler } = require ("../handlers/getDriverTeams");



const router = Router();

router.get("/drivers", allDriversHandler);
router.get("/drivers/name", driversByNameHandler);
router.get("/drivers/:id", driversByIdHandler );
router.get("/teams", allTeamsHandler);
router.post("/drivers", postDriversHandler);


module.exports = router;
