const {Strategy: FBStrategy} = require('passport-facebook');
let config;
if ( process.env.NODE_ENV !== "production" ) {
  config = require( "../../../config" );
}

const strategy = new FBStrategy(
	{
    clientID: process.env.FB_CLIENT_ID || config.facebook.clientID,
    clientSecret: process.env.FB_SECRET || config.facebook.secret,
    callbackURL: process.env.FB_CB || config.facebook.cbUrl,
    profileFields: ['id', 'emails', 'displayName', 'name', 'picture.type(large)', 'friends']
	},
	( accessToken, refreshToken, extraParams, profile, done ) => {
        // accessToken is the token to call Auth0 API (not needed in the most cases)
        // extraParams.id_token has the JSON Web Token
        // profile has all the information from the user
		return done( null, profile );
	}
);

module.exports = strategy;
