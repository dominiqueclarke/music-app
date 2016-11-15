let config;
if ( process.env.NODE_ENV !== "production" ) {
  config = require( "../../../config" );
}
const Show = require('./Show');
const mongoose = require("mongoose");
const request = require("request");
const rp = require("request-promise");
const axios = require('axios');

module.exports = {
    getShows(req, res) {
        axios.get(`http://api.jambase.com/events?zipCode=${req.params.zip}&radius=25&page=0&${process.env.JAMBASE_KEY || config.jamBase.apiKey}`)
        .then(shows => {
            getMusicPreviews(shows.data).then(results => {
                return res.status(200).json(results);
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }
  , showExists(req, res, next) {
    Show.findOne({jamBaseId: req.body.jamBaseId}, (err, show) => {
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
    new Show(req.body).save((err, show) => {
      if (err) {
        return res.status(500).json(err);
      } else {
        return res.status(200).json(show)
      }
    });
  }
}

function getMusicPreviews(shows) {
     const promiseArray = [];
     let time = 0;
     shows.Events.forEach(show => {
        show.Artists.forEach(artist => {
            artist.Name = artist.Name.trim();
            const nameQuery = artist.Name.split(" ").join("+");
            promiseArray.push(new Promise((resolve, reject) => {
                setTimeout( () => {
                    time += 200;
                    axios.get(`https://itunes.apple.com/search?term=${nameQuery}&entity=musicTrack&limit=10`)
                        .catch(err => {
                           console.log(err);
                           resolve({});
                        })
                    .then(response => {
                        const iTunesData = response.data;
                        let artistArtworkUrl;
                        const songPreviews = [];
                        for(let i = 0; i < iTunesData.results.length; i++) {
                            const song = iTunesData.results[i];
                            if(song.artistName === artist.Name) {
                               songPreviews.push({
                                 songName: song.trackName
                                 , artistName: song.artistName
                                 , previewUrl: song.previewUrl
                                 , songArtworkUrl: song.artworkUrl100.replace("100x100", "400x400")
                            });
                            //if this is the first result that's come back correct, let's add the artist artwork Url right away
                            if(songPreviews.length === 1) {
                                artistArtworkUrl = song.artworkUrl100.replace('100x100', '400x400');
                            }
                            if(songPreviews.length === 5) {
                                break;
                            }
                        };
                    };
                       /* if no songs were found with the exact artist name, chances are
                       there's a problem with the way JamBase coded it. Let's trust iTunes for
                       now and just assign the artist song previews based on the first
                       five results */
                       if(songPreviews.length === 0 ) {
                         const shortenedResponse = iTunesData.results.slice(0, 5);
                         if(shortenedResponse[0]) {
                           artistArtworkUrl = shortenedResponse[0].artworkUrl100.replace("100x100", "400x400");
                         }
                         shortenedResponse.forEach(function(song) {
                           songPreviews.push({
                             songName: song.trackName
                             , artistName: song.artistName
                             , previewUrl: song.previewUrl
                             , songArtworkUrl: song.artworkUrl100.replace("100x100", "400x400")
                           });
                         });
                       }

                     const artistData = {
                       name: artist.Name
                       , artistArtworkUrl
                       , songPreviews
                     }
                     //event.artistData.push(artistData);
                     artist.songPreviews = songPreviews;
                     artist.artistArtworkUrl = artistArtworkUrl;
                     //axios.post('/api/artist', artistData);
                     resolve(show);
                   })
               }, time);
            }));
       });
     });
    return Promise.all(promiseArray).then((results) => {
       return shows;
    });
}
