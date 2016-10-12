export default function() {
  return {
    restrict: 'E'
    , replace: true
    , templateUrl: './src/components/show.html'
    , scope: {
      show: "="
    }
  }
}
