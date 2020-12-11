(function () {
    'use strict';

    angular
        .module('app')
        .factory('dataService', ['$http', '$q', function ($http, $q) {
            var service = {};

            service.getUsers = function () {
                var deferred = $q.defer();
                $http.get('/User/Index').then(function (result) {
                    deferred.resolve(result.data);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            service.getUserById = function (id) {
                var deferred = $q.defer();
                $http.get('/User/Details/' + id).then(function (result) {
                    deferred.resolve(result.data);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            service.addUsers = function (user) {
                var deferred = $q.defer();
                $http.post('/User/Create', user).then(function () {
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            service.updateUsers = function (user) {
                var deferred = $q.defer();
                $http.post('/User/Update', user).then(function () {
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            service.deleteUsers = function (id) {
                var deferred = $q.defer();
                $http.post('/User/Delete', { id: id }).then(function () {
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };


            return service;
        }]);

})();