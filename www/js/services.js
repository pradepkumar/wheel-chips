angular.module('starter.services', ['ngResource'])

.factory('ReelService', function ($resource) {
    return $resource('http://192.168.1.11:5000/reels/:reelId');
});