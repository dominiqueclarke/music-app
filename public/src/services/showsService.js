export default function($http) {
  this.getShowsData = () {
    return $http({
      url: 'http://api.jambase.com/events?zipCode=75201&radius=25&page=0&api_key=mg7dkv3nzbyb79cdu9gcbesb&o=json'
    , type: 'GET'
    })
    .then(function(results) {
      console.log(results);
      return results;
    });
  }
  //
  // getJamBaseData().then(function(results) {
  //   console.log(results);
  //   $scope.jamBaseData = results;
  // });

}
