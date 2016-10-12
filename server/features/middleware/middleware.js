
module.export = ( req, res, next ) => {
	if ( req.isAuthenticated() ) {
		return next();
	}
	const notLoggedIn = { userAuthenticated: false };
	return res.json( notLoggedIn );
}
