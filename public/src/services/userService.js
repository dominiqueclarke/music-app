export default function($http) {
	const user = this;
	user.currentUser = {};
	this.getCurrentUser = () => {
		return $http({
				url: '/me',
				type: 'GET'
			})
			.then(function(currentUserData) {
				user.currentUser = currentUserData.data;
				return currentUserData.data;
			});
	}
}
