(function () {
    'use strict';

    angular
        .module('app')
        .controller('userCtrl', ['$scope', '$filter', '$uibModal', 'dataService', function ($scope, $filter, $uibModal, dataService) {
            $scope.users = [];
            $scope.currentPage = 1;
            $scope.itemsPerPage = 5;
            $scope.optionPage = ["1", "3", "5", "10", "15"]
            getData();
            function getData() {
                dataService.getUsers().then(function (result) {
                    $scope.$watch('searchText', function (term) {
                        $scope.users = $filter('filter')(result, term);
                    })
                });
            }
            //$scope.deleteUser = function (id) {
            //      dataService.deleteUsers(id).then(function () {
            //        toastr.success('User deleted succesfully');
            //        getData();
            //    }, function () {
            //        toastr.error('Error in deleting user with Id: ' + id);
            //    });
            //};
            $scope.sortBy = function (column) {
                $scope.sortColumn = column;
                $scope.reverse = !$scope.reverse;
            }
            $scope.showFormModal = function (id) {
                $scope.modalInstance = $uibModal.open({
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'app/templates/view.html',
                    controller: 'ModalHandleCtrl',
                    controllerAs: '$scope',
                    size: 'sm',
                    resolve: {

                    }
                });
                console.log("delete id" + id)
            };
        }])
        .controller('ModalHandleCtrl', ['$scope', '$uibModalInstance', 'dataService', function ($scope, $uibModalInstance, dataService) {
            $scope.cancelModal = function () {
                console.log("cancelModal");
                $uibModalInstance.dismiss('cancel');
            }
            $scope.ok = function (id) {
                //$scope.deleteUser = function (id) {
                    dataService.deleteUsers(id).then(function () {
                        toastr.success('User deleted succesfully');
                        getData();
                    }, function () {
                        toastr.error('Error in deleting user with Id: ' + user.id);
                    });
                //};
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
                    toastr.error('Error in updating user')
                });
            };
        }]);
})();
