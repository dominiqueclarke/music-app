export default function($http, userService, showsService, mapService, $scope) {

	const vm = this;
	const getCurrentUser = userService.getCurrentUser;
	const getShows = showsService.getShowsData;

	vm.loaded = false;
	vm.showSavedShows = false;
	vm.savedShowsBtnPressed = false;

	vm.savedShows = [];
	vm.featuredIndex = "Featured";
	vm.currentUser;
	vm.shows;
	vm.currentDate;

    $scope.$on('newShowSaved', function(event, show) {
		vm.savedShows.push(show);
		vm.savedShows = sortSavedShows(vm.savedShows);
	});

	$scope.$on('showUnsaved', function(event, newSavedShows) {
		vm.savedShows = newSavedShows;
		vm.savedShows = sortSavedShows(vm.savedShows);
	});

    getCurrentUser().then(currentUser => {
		vm.currentUser = currentUser;
		vm.savedShows = currentUser.savedShows;
		vm.savedShows = sortSavedShows(vm.savedShows);

		getShows(vm.currentUser, sessionStorage.zipCode, process.env.JAMBASE_KEY).then(function(shows) {
			vm.loaded = true;
			vm.shows = shows.data.Events;
			vm.currentDate = new Date(vm.shows[0].Date).getTime();
			vm.featuredShow = shows.data.Venues[0].nextShow;
			const venues = vm.venues = shows.data.Venues;
			vm.shows.forEach(function(show) {
				show.epochTime = new Date(show.Date).getTime();
				for (let i = 0; i < vm.savedShows.length; i++) {
					if (show.Id === vm.savedShows[i].jamBaseId) {
						show._id = vm.savedShows[i]._id;
						show.saved = "saved";
					}
				}
			})
			$scope.$broadcast('featuredShowAssigned', vm.featuredShow);
			mapService.getMap(vm.venues).then(map => {
				map.on('click', (e) => {
					const features = map.queryRenderedFeatures(e.point, {
						layers: ['points']
					});
					const venueName = features[0].properties.title;
					$scope.$apply(function() {
						for (let venue in venues) {
							if (venueName === venues[venue].name) {
								vm.featuredShow = venues[venue].nextShow;
								$scope.$broadcast('newFeaturedShow', vm.featuredShow);
								$scope.$broadcast('mapClick', vm.featuredShow.Artists);
								break;
							}
						}
					});
					//  if there are features within the given radius of the click event,
					//  fly to the location of the click event
					if (features.length) {
						// Get coordinates from the symbol and center the map on those coordinates
						map.flyTo({
							center: features[0].geometry.coordinates
						});
					}
					var feature = features[0];
				});
			});
		})
	});

    vm.pressSavedShowsBtn = () => {
        vm.savedShowsBtnPressed = true;
    }

	vm.getUpdatedSavedShows = () => {
		getCurrentUser().then(user => {
			vm.savedShows = user.savedShows;
			vm.savedShows = sortSavedShows(vm.savedShows);
		});
	}

	function sortSavedShows(savedShows) {
		let sortedShows = savedShows;
		sortedShows.sort(function(a, b) {
			if (new Date(a.Date).getTime() > new Date(b.Date).getTime()) {
				return 1;
			}
			if (new Date(a.Date).getTime() < new Date(b.Date).getTime()) {
				return -1;
			}
			// a must be equal to b
			return 0;
		});
		return sortedShows;
	}

}
