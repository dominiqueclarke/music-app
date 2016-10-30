export default function($http) {
 const myThis = this;
  myThis.currentUser = {};
  this.getCurrentUser = () => {
      return $http({
      url: '/me'
      , type: 'GET'
    })
    .then(function(currentUserData) {
      myThis.currentUser = currentUserData.data;
      return currentUserData.data;
    });
  }
}
