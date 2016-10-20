export default function($http) {
  // this.saveZipCode = zipCodeInput => {
  //   return zipCodeInput;
  // }
  //
  // this.getZipCode = () => {
  //   return zipCodeInput;
  // }
//  console.log(this.zipCode);
 const myThis = this;
  myThis.currentUser = {};
  this.getCurrentUser = () => {
      return $http({
      url: '/me'
      , type: 'GET'
    })
    .then(function(currentUserData) {
      console.log(currentUserData);
      myThis.currentUser = currentUserData.data;
      return currentUserData.data;
    });
  }
}
