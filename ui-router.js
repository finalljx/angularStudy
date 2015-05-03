

var myCSSModule = angular.module('MyCSSModule', ['ui.router','myServiceModule']);

myCSSModule.controller('HeaderController', ['$scope','makeName','notify',
    function($scope,makeName,notify) {
        $scope.isError = false;
        $scope.isWarning = false;
        $scope.showError = function() {
            $scope.messageText = 'This is an error!';
            $scope.isError = true;
            $scope.isWarning = false;
            console.log(makeName.name);
            notify("msg");
        };
        $scope.showWarning = function() {
            $scope.messageText = 'Just a warning. Please carry on.';
            $scope.isWarning = true;
            $scope.isError = false;
           console.log(makeName.name);
        };
        $scope.friends =
          [{name:'John', phone:'555-1212', age:40},
           {name:'Mary', phone:'555-9876', age:19},
           {name:'Mike', phone:'555-4321', age:21},
           {name:'Adam', phone:'555-5678', age:35},
           {name:'Julie', phone:'555-8765', age:29}];
    

    }
])
myCSSModule.filter("filter1",function(){
  return function(item){
    return item+"hello";
  }
})
myCSSModule.directive("hello",function(){
  return{
    restrict:"AEC",
    template:"<div> hello everyone{{name}}</div>",
    replace:true,
    link:function(scope,el,attrs,controller){
      el.on("mouseenter",function(){
        console.log("mouse enter");
        console.log(attrs);
      });
      scope.name="zhangsan1";

    }
  }
})

myCSSModule.config(function($stateProvider,$urlRouterProvider){
   $urlRouterProvider.otherwise("/index");
   $stateProvider.state("index",{
    url:"",
    views:{
      "viewA":{
        template:"index.viewa"
      },
      "viewB":{
        template:"index.viewb"
      }
    }
   })
   .state("route1",{
    url:"/router1",
    views:{
      "viewA":{
        templateUrl:"./state1.html",
        controller:"HeaderController"
      },
      "viewB":{
        template:"router1.viewb"
      }
    }
   })
   .state("route2",{
    url:"/router2",
    views:{
      "viewA":{
        template:"router2.viewa"
      },
      "viewB":{
        templateUrl:"./state2.html"
      }
    }
   })
   .state("route2.list",{
    url:"/list",
    templateUrl:"./state2.list.html",
    controller:function($scope){
       $scope.things = ["A", "Set", "Of", "Things"];
    }
   })
})


var mymodule=angular.module('myServiceModule', []).
 controller('MyController', ['$scope','notify', function ($scope, notify) {
   $scope.callNotify = function(msg) {
     notify(msg);
     console.log(makeName.name);
   };
 }]);
mymodule.factory('notify', ['$window', function(win) {
   var msgs = [];
   return function(msg) {
     msgs.push(msg);
     if (msgs.length == 3) {
       win.alert(msgs.join("\n"));
       msgs = [];
     }
   };
 }]);
mymodule.factory('makeName',  function(){
    return {"name":"zhangsan"};
});
