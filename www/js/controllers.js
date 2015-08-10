angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('SearchCtrl', function($scope, $http) {

  $http.get('http://www.omdbapi.com/', {
      params: {
        s: 'dexter',
        plot: 'short',
        r: 'json'
      }
      }).
      then(function(response) {
        $scope.searchres = response.data.Search;
        console.log($scope.searchres);
      }, function(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });



})

.controller('ComingsoonCtrl', function($scope, $http) {

  $http.get('http://www.myapifilms.com/imdb/comingSoon').
      then(function(response) {
        $scope.comingsoon = response.data;
        console.log($scope.comingsoon);
      }, function(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
})

.controller('ReelsCtrl', function($scope, ReelService) {
    $scope.reels = ReelService.query();
    console.log($scope.reels);
})

.controller('ReelCtrl', function($scope, $stateParams, ReelService, $http) {
    $scope.reel = ReelService.get({reelId: $stateParams.reelId});

    $http.get('http://www.omdbapi.com/', {
        params: {
          i: $stateParams.reelId,
          plot: 'short',
          r: 'json'
        }
    }).
        then(function(response) {
          $scope.poster = response.data.Poster;
          $scope.reel = response.data;
          console.log($scope.poster, $scope.reel);
        }, function(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
});
