const Show = require('./Show');
const mongoose = require("mongoose");

module.exports = {
  showExists(req, res, next) {
    Show.findOne({jamBaseId: req.body.jamBaseId}, (err, show) => {
      console.log('exist fired');
      if(err) {
        return res.status(501).json(err);
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
        return res.status(502).json(err);
      } else {
        return res.status(200).json(show)
      }
    });
  }
}
