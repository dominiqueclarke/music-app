const express = require("express");
const {json} = require("body-parser");
const passport = require('passport');
const {Strategy: FBStrategy} = require("passport-facebook");
const userCtrl = require('./server/features/user/userCtrl');
const session = require("express-session");

  // const config = require("./config.js");
const masterRoutes = require("./server/masterRoutes");
const cors = require("cors");

const request = require("request");
const rp = require("request-promise");

const FB = require("fb")

const port = process.env.PORT || 4000;

const app = express();

const mongoose = require("mongoose");
const User = require("./server/features/user/User");
const Artist = require("./server/features/artist/Artist")
const mongooseUri = process.env.MONGOURI || 'mongodb://localhost:27017/testuser';
const strategy = require("./server/features/auth/authCtrl");

mongoose.Promise = global.Promise;
mongoose.connect(mongooseUri);

mongoose.connection.once("open", () => console.log(`Connected to MongoDB at ${mongooseUri}`));

app.use(cors());
app.use(json());
app.use(express.static(`${__dirname}/public`));

app.use(session({secret: process.env.APP_SECRET || config.mySecrets.secret}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(strategy);

// passport.use(new FBStrategy({
//   clientID: config.facebook.clientID,
//   clientSecret: config.facebook.secret,
//   callbackURL: config.facebook.cbUrl,
//   profileFields: ['id', 'emails', 'displayName', 'name', 'gender', 'picture.type(large)', 'music', 'friends']
// }, function(token, refreshToken, profile, done) {
//   rp(`http://localhost:4000/api/user/${profile.id}`)
//   .then(result => {
//     console.log(result);
//     if (stuff === null) {
//       console.log('this is working')
//   // User.findOne({fbID: profile.id}, function(err, user) {
//   //     if (err) { return done(err); }
//   //     if (user) { done(null, user); } else {
//         let musicLikes = [];
//         userCtrl.getUserFBMusicLikes(profile._json.music, musicLikes).then(music => {
//               //console.log(response);
//               function getMusicPreviews(music) {
//                 return new Promise((resolve, reject) => {
//                   let musicIDs = [];
//                   music.forEach((entry, index) => {
//                          const nameQuery = entry.name.split(" ").join("+");
//                              rp(`https://itunes.apple.com/search?term=${nameQuery}&entity=musicTrack`)
//                              .then(response => {
//                                    let songPreviews = [];
//                                    response = JSON.parse(response);
//                                    response.results = response.results.slice(0, 5);
//                                    response.results.forEach(function(entry) {
//                                      songPreviews.push({songName: entry.trackName, previewURL: entry.previewUrl});
//                                    });
//                                    let artist = {
//                                      name: entry.name
//                                      , _id: mongoose.Types.ObjectId()
//                                      , songPreviews
//                                      , artistArtworkUrl: `http://graph.facebook.com/v2.8/${entry.id}/pictureheight=300`
//                                      , fbID: entry.id
//                                      , created_time: new Date().getTime()
//                                    }
//                                    musicIDs.push(artist._id);
//                                    console.log(artist);
//                                    new Artist(artist).save(function(err, artist) {
//                                      if(err) { throw err; }
//                                    });
//                                    if(index === music.length - 1) {
//                                      resolve(musicIDs);
//                                    }
//                               });
//                      });
//                 });
//               }
//               getMusicPreviews(music).then(results => {
//                 console.log(results);
//                 const user_data = {
//                   provider:   profile.provider
//                   , email:      profile.emails[0].value
//                   , fbID:      profile.id
//                   , created:  new Date().getTime()
//                   , artistsFollowing: results
//                   , fullName: `${profile.name.givenName} ${profile.name.familyName}`
//                   , firstName:  profile.name.givenName
//                   , lastName: profile.name.familyName
//                 };
//                 new User(user_data).save(function(err, user) {
//                   if(err) { throw err; }
//                   done(null, user);
//                 });
//               });
//               // const user_data = {
//               //   provider:   profile.provider
//               //   , email:      profile.emails[0].value
//               //   , fbID:      profile.id
//               //   , created:  new Date().getTime()
//               //   , artistsFollowing: music
//               //   , fullName: `${profile.name.givenName} ${profile.name.familyName}`
//               //   , firstName:  profile.name.givenName
//               //   , lastName: profile.name.familyName
//               // };
//               // new User(user_data).save(function(err, user) {
//               //   if(err) { throw err; }
//               //   done(null, user);
//               // });
//               //console.log('.then', musicLikes);
//             }).catch(e => {
//               console.log(e);
//             });
//           };
//           });
//
//       //}
//   //return done(null, profile)
// }));

// function getMusicData(music, musicLikes) {
//   return new Promise((resolve, reject) => {
//        musicLikes = musicLikes.concat(music.data);
//        if(music.paging.next) {
//          function recursiveAPICall(apiURL) {
//              rp(apiURL)
//              .then(response => {
//                  console.log('response inside of recurisve API call', response)
//                  response = JSON.parse(response);
//                  if (response && response.data) {
//                      //add response to posts array (merge arrays), check if there is more data
//                      musicLikes = musicLikes.concat(response.data);
//                      if (response.paging && response.paging.next) {
//                          recursiveAPICall(response.paging.next);
//                      } else {
//                         resolve(musicLikes);
//                      }
//                  } else {
//                      reject();
//                  }
//              });
//          }
//          recursiveAPICall(music.paging.next);
//        }
//        else {
//          resolve(musicLikes);
//        }
//    });
// }

// app.get('/auth/facebook', passport.authenticate('facebook', { authType: 'rerequest', scope: ['user_friends', 'user_likes', 'email'] }));
//
// app.get('/auth/facebook/callback', passport.authenticate('facebook', {
//   successRedirect: '/'
//   , failureRedirect: '/login'
// }));
//
// app.get('/me', (req, res) => {
//   //console.log(req.user);
//   res.send(req.user);
// })
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

masterRoutes(app);


app.listen(port, () => console.log(`listening on ${port}`));
