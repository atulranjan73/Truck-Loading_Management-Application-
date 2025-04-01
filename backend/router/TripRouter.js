const express = require('express');
const Router = express.Router();
const tripController = require("../controller/tripcontroller");

Router.post('/addTrip', tripController.addTrip);


Router.post('/assignTrip', tripController.assignTrip);


Router.get('/getAllTrips', tripController.getAllTrips);

module.exports = Router;
