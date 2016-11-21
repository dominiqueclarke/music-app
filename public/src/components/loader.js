export default function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: './src/components/loader.html',
		controllerAs: 'vm',
		controller() {
			rotateEvenTriangles();
			rotateOddTriangles();

			function rotateEvenTriangles() {
				const evenTriangle = angular.element(document.querySelectorAll('.square:nth-child(even) .triangle'));
				evenTriangle.addClass('rotateTriangle');
			}

			function rotateOddTriangles() {
				setTimeout(() => {
					const oddTriangle = angular.element(document.querySelectorAll('.square:nth-child(odd) .triangle'));
					oddTriangle.addClass('rotateTriangle');
				}, 5000);
			}
		}
	}
}