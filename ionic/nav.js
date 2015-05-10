angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    .state('tabs.home', {
      url: "/home",
      views: {
        'home-tab': {
          templateUrl: "templates/home.html",
          controller: "HomeCtrl"
        }
      }
    })
    
    .state('tabs.fileList', {
      url: "/fileList?param1&param2",
      views: {
        'home-tab': {
          templateUrl: "templates/fileList.html",
          controller: "FileListCtrl"
        }
      }
    })
    .state('tabs.transList', {
      url: "/transList",
      views: {
        'trans-tab': {
          templateUrl: "templates/transList.html",
           controller:'transListCtrl'
        }
      }
    })
    
    .state('tabs.more', {
      url: "/more",
      views: {
        'more-tab': {
          templateUrl: "templates/more.html",
          controller:'moreCtrl'
        }
      }
    });


   $urlRouterProvider.otherwise("/tab/home");

})
.controller('HomeCtrl',  function($scope,$ionicLoading,$http,$state,$ionicHistory){
  $scope.fileLists=[];
  $http.get("./test/home.json").success(function(data, status, headers, config){

       $scope.fileLists=data;

    }).error(function(data, status, headers, config){
      $scope.fileLists=[];
    })
  $scope.doRefresh=function(){
    $scope.fileLists.unshift({"name":"do three","id":"file3","type":"directory"});
      $scope.$broadcast('scroll.refreshComplete');
      $scope.$apply();
  };
  $scope.openDirectory=function(item){
    console.log(item);
     $state.go('tabs.fileList',{"param1":item.id,"param2":item.name});
  }
  $scope.edit=function(item){
    console.log(item);
  }
  $scope.share=function(item){
    console.log(item);
  }
 

})
.controller('HomeTabCtrl', function($scope) {
  console.log('HomeTabCtrl');
})
.controller('FileListCtrl',function($scope,$http,$stateParams,$state,$ionicHistory,$ionicNavBarDelegate){
   console.log($stateParams);
   $scope.fileTitle=$stateParams.param2;
  //根据上层文件夹id获取文件列表
  $scope.fileLists=[];
  $http.get("./test/dir1.json").success(function(data, status, headers, config){

       $scope.fileLists=data;

    }).error(function(data, status, headers, config){
      $scope.fileLists=[];
    })
    $scope.doRefresh=function(){
    $scope.fileLists.unshift({"name":"do three","id":"file3","type":"directory"});
      $scope.$broadcast('scroll.refreshComplete');
      $scope.$apply();
  };
  $scope.getFileList=function(item){
    
     $state.go('tabs.fileList',{"param1":item.id,"param2":item.name});
  }
})
.controller('transListCtrl', function($scope,$http){
  $scope.transList=[
    {"src":"aa.jpg",title:"111",date:"2014-01-02"},
    {"src":"aa.jpg",title:"333",date:"2014-01-03"}
  ]
  $scope.getTransingList=function(){
    $http.get("./test/transing.json").success(function(data, status, headers, config){

       $scope.transList=data;

    }).error(function(data, status, headers, config){
      $scope.transList=[];
    })
  };
  $scope.getTransedList=function(){
    $http.get("./test/transed.json").success(function(data, status, headers, config){

       $scope.transList=data;

    }).error(function(data, status, headers, config){
      $scope.transList=[];
    })
  }
})
.controller('moreCtrl', ['$scope', function($scope){
  $scope.devList = [
    { text: "HTML5", checked: true },
    { text: "CSS3", checked: false },
    { text: "JavaScript", checked: false }
  ];
}])