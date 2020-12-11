(function () {
    'use strict';

    angular
        .module('app')
        .controller('userCtrl', ['$scope', '$filter', 'dataService', function ($scope, $filter, dataService) {
            $scope.users = [];
            $scope.currentPage = 1;
            $scope.itemsPerPage = 5;

            getData();
            function getData() {
                dataService.getUsers().then(function (result) {
                    $scope.$watch('searchText', function (term) {
                        $scope.users = $filter('filter')(result, term);
                    })
                });
            }
            $scope.deleteUser = function (id) {
                  dataService.deleteUsers(id).then(function () {
                    toastr.success('User deleted succesfully');
                    getData();
                }, function () {
                    toastr.error('Error in deleting user with Id: ' + id);
                });
            };
            $scope.sortBy = function (column) {
                $scope.sortColumn = column;
                $scope.reverse = !$scope.reverse;
            }
        }])
        .controller('userAddCtrl', ['$scope', '$location', 'dataService', function ($scope, $location, dataService) {
            $scope.createUser = function (user) {
                dataService.addUsers(user).then(function () {
                    toastr.success("User  Created Successfully")
                    $location.path('/');
                }, function () {
                    toastr.error("Failed User Created")
                });
            };
        }])
        .controller('userUpdateCtrl', ['$scope', '$routeParams', '$location', 'dataService', function ($scope, $routeParams, $location,  dataService) {
            $scope.user = {};
            $scope.states = { showUpdateButton: false };
            dataService.getUserById($routeParams.id).then(function (result) {
                $scope.user = result;
                $scope.states.showUpdateButton = true;
            }, function () {
                toastr.error('Error in fetching user with id:' + $routeParams.id);
                });
            $scope.updateUser = function (user) {
                dataService.updateUsers(user).then(function () {
                    toastr.success("User updated successfully")
                    $location.path('/');
                }, function () {
                    toastr.error('Error in updateing user')
                });
            };
        }]);
})();
