export default function($http) {
  // this.saveZipCode = zipCodeInput => {
  //   return zipCodeInput;
  // }
  //
  // this.getZipCode = () => {
  //   return zipCodeInput;
  // }
  console.log(this.zipCode);
  this.getCurrentUser = () => {
      return $http({
      url: 'http://localhost:4000/me'
      , type: 'GET'
    })
    .then(function(currentUser) {
      return currentUser.data;
    });
  }
}
