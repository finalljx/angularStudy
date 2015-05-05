angular.module('ionicApp', ['ionic'])
.controller('MyController',  function($scope){
  $scope.todos=[{"name":"do one"},{"name":"do two"}];
  $scope.doRefresh=function(){
    $scope.todos.unshift({"name":"do three"});
      $scope.$broadcast('scroll.refreshComplete');
      $scope.$apply();
  }
})