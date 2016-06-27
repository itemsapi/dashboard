'use strict';

angular.module('itemsapi')
.controller('DocumentListController', function (APP, $rootScope, $scope, Restangular, $stateParams, $timeout, $http, $state, $location, Pagination, geolocation, $modal) {

  $scope.rows = [];
  Pagination.extendPagination({around_lat_lng: '52.5120804,13.4526408'});
  $scope.pagination = Pagination.pagination;

  $scope.pagination.query = $stateParams.query;
  $scope.name = $stateParams.name;
  $scope.pagination.sort = $stateParams.sort || 'default';


  $scope.explainQuery = _.chain($scope.pagination)
  .pick('page', 'limit', 'query', 'sort', 'aggs')
  .pick(function(value, key) {
    return !!value;
  })
  .value();

  console.log('explainQuery');
  console.log($scope.explainQuery);

  console.log('pagination load');
  console.log($scope.pagination);
  console.log('state params');
  console.log($stateParams);


  //console.log($state.current);

  var defaultSort = {default: {title: 'Default', rank: -1}};

  /*geolocation.getLocation().then(function(data) {
    console.log(data);
  });*/

  $scope.aggregations = {};

  console.log($stateParams.aggs);

  if ($stateParams.aggs) {
    $scope.filters = JSON.parse($stateParams.aggs);
  } else {
    $scope.filters = {};
  }

  $scope.pagination.aggs = $scope.filters;
  //, $stateParams.aggs
  //$scope.filters = _.extend({}, {tags_terms: []});
  console.log('filters');
  console.log($scope.filters);

  var name = $stateParams.name;

  var getRows = function() {
    Pagination.getRows(name, function(res) {
      var data = res.data;
      $scope.rows = data.items;
      Pagination.extendPagination(data.pagination);
      $scope.pagination = Pagination.pagination;
      //$scope.around_lat_lng = Pagination.pagination;
      $scope.aggregations = data.aggregations;
      $scope.sortings = _.extend(data.sortings, defaultSort);
      $scope.meta = res.meta;
      console.log(res.meta);
      $scope.sorting = data.sortings[$scope.pagination.sort] || defaultSort
      //$scope.sortings = [{title: 'Default', name: 'default'}].concat(data.sortings);
    });
  }
  $scope.updateAggs = function() {
    console.log($scope.aggs);
  }

  getRows();

  $scope.removeFilter = function(key, value) {
    console.log('remove filter');
    console.log(key, value);
    //delete $scope.filters[key][value];
    $scope.filters[key].splice($scope.filters[key].indexOf(value), 1);
    console.log($scope.filters);
    $state.go($state.current.name, _.extend(
      Pagination.pagination, {aggs: JSON.stringify($scope.filters)}
    ));
  }

  $scope.changeAggs = function(aggsName, optionsName) {
    console.log('change aggs');
    console.log(aggsName, optionsName);
    console.log($scope.filters);
    //Pagination.extendPagination({page: 1, query: $scope.pagination.query});
    $state.go($state.current.name, _.extend(
      Pagination.pagination, {aggs: JSON.stringify($scope.filters)}
    ));
  }

  $scope.changeQuery = function() {
    console.log('change query');
    console.log(Pagination.pagination);
    Pagination.extendPagination({page: 1, query: $scope.pagination.query});
    console.log('options');
    console.log(_.extend(Pagination.pagination, {}));
    $state.go($state.current.name, _.extend(
      Pagination.pagination, {aggs: JSON.stringify($scope.filters)}
    ));
  }

  $http.get('/metadata?name=' + name).then(function(res) {
    $scope.metadata = res.data;
  }, function(err) {
  });

  $scope.setPage = function(page) {
    console.log('set page');
    console.log(Pagination);
    console.log($scope.pagination);
    console.log(page);
    Pagination.extendPagination({page: $scope.pagination.page});
    $scope.explainQuery.page = $scope.pagination.page;
    getRows();
  }

  $scope.removeItem = function(index) {
    var id = $scope.rows[index].id;
    Restangular.one(name + '/' + id).remove()
    .then(function(res) {
      $scope.rows = _.reject($scope.rows, function(val) {
        return val.id == id;
      })
    });
  }

  $scope.showItem = function (index) {
    var modalInstance = $modal.open({
      templateUrl: 'views/modals/show-item.html',
      controller: 'ModalInstanceCtrl',
      size: 'lg',
      resolve: {
        item: function() {
          return $scope.rows[index];
        }
      }
    });
  };

  $scope.editItem = function (index) {
    var modalInstance = $modal.open({
      templateUrl: 'views/modals/edit-item.html',
      controller: 'ModalInstanceCtrl',
      size: 'lg',
      resolve: {
        item: function() {
          return $scope.rows[index];
        }
      }
    });
  };


});

angular.module('itemsapi').controller('ModalInstanceCtrl', function ($scope, $modalInstance, item, $timeout) {
  $scope.item = item;
  $scope.item2 = JSON.stringify(item, null, 4);

  $scope.codemirrorLoaded = function(_editor){
    _editor.focus();
    _editor.refresh();
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $modalInstance.opened.then(function (selectedItem) {
    $timeout(function() {
      $scope.isRefreshed = true;
    }, 10);
  });

});
