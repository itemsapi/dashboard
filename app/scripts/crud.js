angular.module('my-crud', [
  'ngCookies',
  'ngResource',
  'restangular',
])
.factory('Pagination', ['$http', '$cookieStore', '$cookies', 'Restangular', '$q', function($http, $cookieStore, $cookies, Restangular, $q) {
  return {
    getRows: function(resource, success, error) {
      var self = this;

      var rowsApi = Restangular.all(resource);
      console.log('pagionation options');
      console.log(self.pagination);
      rowsApi.getList(_.extend({page: self.pagination.page, per_page: self.pagination.limit }, self.pagination)).then(function(data) {
        self.extendPagination({count: parseInt(data.pagination.total)});
        success(data);
      }, function(response) {
        error(response);
      });
    },
    extendPagination: function(data) {
      this.pagination = _.extend(this.pagination, data);
    },
    pagination: {page: 1, limit: 12}
  };
}]);
