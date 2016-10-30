const Show = require('./Show');
const mongoose = require("mongoose");
const request = require("request");
const rp = require("request-promise");
const config = require("../../../config");
const axios = require('axios');

module.exports = {
  getShows(req, res) {
      axios.get(`http://api.jambase.com/events?zipCode=${req.params.zip}&radius=25&page=0&${process.env.JAMBASE_KEY || config.jamBase.apiKey}`)
      .then(function(shows) {
        //resolve(showsData);
        return res.status(200).json(shows.data);
        // musicService.getMusicPreviews(shows).then(results => {
        // let showsData = results;
        // const lastShowsRequest = new Date().getTime();
        // $http({
        //   url: `/api/users/${currentUser._id}`
        //   , method: 'PUT'
        //   , data: {lastShowsRequest, zipCode}
        // })
        // formatShows(showsData);
        //resolve(showsData);
      // });
    });
  }
  , showExists(req, res, next) {
    Show.findOne({jamBaseId: req.body.jamBaseId}, (err, show) => {
      console.log('exist fired');
      if(err) {
        return res.status(500).json(err);
      }
      if(show) {
        return res.status(200).json(show);
      }
      next();
    });
  }
  , postNewShow(req, res) {
    console.log('post fired');
    new Show(req.body).save((err, show) => {
      if (err) {
        return res.status(500).json(err);
      } else {
        return res.status(200).json(show)
      }
    });
  }
}

function getShowsData(zipCode) {
    // return new Promise((resolve, reject) => {
      rp(`http://api.jambase.com/events?zipCode=${zipCode}&radius=25&page=0&${process.env.JAMBASE_KEY || config.jamBase.apiKey}`)
      .then(function(shows) {
        console.log(shows);
        //resolve(showsData);
        return res.status(200).send(shows);
        // musicService.getMusicPreviews(shows).then(results => {
        // let showsData = results;
        // const lastShowsRequest = new Date().getTime();
        // $http({
        //   url: `/api/users/${currentUser._id}`
        //   , method: 'PUT'
        //   , data: {lastShowsRequest, zipCode}
        // })
        // formatShows(showsData);
        //resolve(showsData);
      // });
    });
  // });
}
