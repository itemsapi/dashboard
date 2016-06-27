'use strict';

angular.module('itemsapi')
.controller('CollectionListController', function (APP, $rootScope, $scope, Restangular, $stateParams, $timeout, $http, $state, $location, Pagination, $modal, $log) {

  $scope.rows = [];

  var api = Restangular.all('collections');
  var updateCollections = function() {
    api.getList({}).then(function(data) {
      $scope.rows = data.data.items;
      $scope.pagination = data.pagination;
    });
  }

  $scope.submitText = 'Submit'

  updateCollections()

  $scope.animationsEnabled = true;

  $scope.collection = {}

  $scope.submit = function () {
    var body = $scope.collection
    $scope.submitText = 'Processing...'
    $http.post('/add-data', body, {}).then(function(res) {
      $timeout(function() {
        $scope.submitText = 'Submit'
        $state.go('documents', {name: res.data.name}, {location: 'replace'})
      }, 1000);

      console.log(res);
    }, function(err) {
      $scope.submitText = 'Submit'
      alert(err)
      console.log(err);
    });
  }

  $scope.showMapping = function (name, size) {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'views/modals/mapping.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        mapping: function() {
          var metadataApi = Restangular.one(name + '/metadata');
          return metadataApi.get();
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
      $scope.testowy = "testowy";
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

});

angular.module('itemsapi').controller('ModalInstanceCtrl', function ($scope, $modalInstance, mapping) {

  $scope.mapping = mapping;
  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});

