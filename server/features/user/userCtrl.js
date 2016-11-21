const User = require('./User');
const Artist = require('../artist/Artist');
const request = require("request");
const rp = require("request-promise");
const mongoose = require("mongoose");

module.exports = {
	getUserIfExists(req, res, next) {
		if (!req.user) throw new Error('user null');
		User.findOne({
				fbID: req.user.id
			})
			.populate('savedShows')
			.exec((err, user) => {
				if (err) {
					return res.status(500).json(err);
				}
				if (user) {
					return res.status(200).json(user);
				}
				next();
			});
	},
	createUser(req, res) {
		const user = req.user;
		const userData = {
			email: user._json.email,
			fbID: user.id,
			created: new Date().getTime(),
			artistsFollowing: res.locals.artistIDs,
			fullName: `${user.name.givenName} ${user.name.familyName}`,
			firstName: user.name.givenName,
			lastName: user.name.familyName
		}
		new User(userData).save(function(err, user) {
			if (err) {
				return res.status(500).json(err);
			}
			if (user) {
				return res.status(200).json(user);
			}
		});
	},
	updateUser(req, res) {
		User.findByIdAndUpdate({
			_id: req.params.id
		}, {
			lastShowsRequest: req.body.lastShowsRequest
		}, function(err, user) {
			if (err) {
				console.log('cant find user');
				return res.status(500).json(err);
			}
			if (user) {
				return res.status(200).json(user);
			}
		});
	},
	pushShow(req, res) {
		User.findByIdAndUpdate({
			_id: req.params.id
		}, {
			$addToSet: {
				savedShows: req.body.showId
			}
		}, function(err, user) {
			console.log(err);
			console.log(user);
			if (err) {
				return res.status(500).json(err);
			}
			if (user) {
				return res.status(200).json(user);
			}
		});
	},
	pullShow(req, res) {
		User.findByIdAndUpdate({
			_id: req.params.id
		}, {
			$pull: {
				savedShows: req.body._id
			}
		}, function(err, user) {
			if (err) {
				return res.status(500).json(err);
			}
			if (user) {
				return res.status(200).json(user);
			}
		});
	},
	getUserFBMusicLikes(req, res, next) {
		let musicLikes = [];
		const music = req.user._json.music;
		musicLikes = musicLikes.concat(music.data);
		if (music.paging.next) {
			function apiCall(apiURL) {
				rp(apiURL)
					.then(response => {
						//console.log('response inside of recurisve API call', response)
						response = JSON.parse(response);
						if (response && response.data) {
							//add response to posts array (merge arrays), check if there is more data
							musicLikes = musicLikes.concat(response.data);
							if (response.paging && response.paging.next) {
								apiCall(response.paging.next);
							} else {
								res.locals.musicArray = musicLikes;
								next();
							}
						}
					});
			}
			apiCall(music.paging.next);
		} else {
			res.locals.musicArray = musicLikes;
			next();
		}
	},
	saveFBMusicLikes(req, res, next) {
		const music = res.locals.musicArray;
		const artistIDs = [];
		const promiseArray = [];
		music.forEach((entry, index) => {
			const nameQuery = entry.name.split(" ").join("+");
			//Check if an artist already exists in the database and push the id to the array
			promiseArray.push(new Promise((resolve, reject) => {
				Artist.findOne({
					fbID: entry.id
				}, (err, artist) => {
					if (artist) {
						artistIDs.push(artist._id); //make sure to post the mongo ._id, not fb .id
						resolve();
					} else {
						//create a new promise for each artist, only go to next() when all have resolved
						rp(`https://itunes.apple.com/search?term=${nameQuery}&entity=musicTrack`)
							.then(response => {
								const songPreviews = [];
								response = JSON.parse(response);
								const shortenedResponse = response.results.slice(0, 5);
								shortenedResponse.forEach(function(entry) {
									songPreviews.push({
										songName: entry.trackName,
										previewURL: entry.previewUrl
									});
								});
								const artist = {
									name: entry.name,
									_id: mongoose.Types.ObjectId(),
									songPreviews,
									artistArtworkUrl: `http://graph.facebook.com/v2.8/${entry.id}/pictureheight=300`,
									fbID: entry.id,
									created_time: new Date().getTime()
								}
								artistIDs.push(artist._id);
								new Artist(artist).save(function(err, artist) {
									if (err) {
										return res.status(500).json(err);
									}
								});
								resolve();
							});
					};
				});
			}));
			//If the artist doesn't exist, create it.
		});
		if (promiseArray) {
			Promise.all(promiseArray).then(() => {
				res.locals.artistIDs = artistIDs;
				next();
			});
		}
	}
}