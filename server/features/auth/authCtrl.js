const {Strategy: FBStrategy} = require('passport-facebook');
const config = require ('../../../config.js');

const strategy = new FBStrategy(
	{
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.secret,
    callbackURL: config.facebook.cbUrl,
    profileFields: ['id', 'emails', 'displayName', 'name', 'picture.type(large)', 'music', 'friends', 'location']
	},
	( accessToken, refreshToken, extraParams, profile, done ) => {
        // accessToken is the token to call Auth0 API (not needed in the most cases)
        // extraParams.id_token has the JSON Web Token
        // profile has all the information from the user
				console.log(profile);
		return done( null, profile );
	}
);

module.exports = strategy;
