export default function($http) {

  //fetch current User
  this.getCurrentUser = () => {
      return $http({
      url: 'http://localhost:4000/me'
      , type: 'GET'
    })
    .then(function(currentUser) {
      return currentUser;
    });
  }
}
