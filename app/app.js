'use strict';

// Declare app level module which depends on views, and components
var app= angular.module('myApp', ['ui.bootstrap.contextMenu']);


app.controller('HomeController',['$scope','$http',function($scope,$http){
    $scope.list=[];
    $scope.selectedrow=[];
    $scope.selected = 'None';
    $scope.individualColumnSelected=[];


    for(var i=0;i<10;i++){
        $scope.individualColumnSelected.push([]);
        for(var j=0;j<20;j++){
            $scope.individualColumnSelected[i].push(false);
        }
    }

    console.log($scope.individualColumnSelected);
    $scope.selectOneByOne=function (row,col) {

        $scope.individualColumnSelected[row][col]=!$scope.individualColumnSelected[row][col];

    };
    $scope.items = [
        { name: 'John', otherProperty: 'Foo' },
        { name: 'Joe', otherProperty: 'Bar' }
    ];

    $scope.menuOptions = [
        ['View', function ($itemScope, $event, modelValue, text, $li) {
            $scope.selected = $itemScope.item.name;
        }],
        null, // Dividier
        ['Edit', function ($itemScope, $event, modelValue, text, $li) {
            $scope.items.splice($itemScope.$index, 1);
           console.log($itemScope.$index);
            $scope.selectedrow[$itemScope.$index]=!$scope.selectedrow[$itemScope.$index];


        }]
    ];
    $scope.selectedColumn=[];
    for(var i=0;i<10;i++)
    $scope.list.push({id:i,col1:'col1 '+i,col2:'col2 '+i,col3:'col3 '+i,col4:'col4 '+i,col5:'col5 '+i,col6:'col6 '+i,col7:'col7 '+i,col8:'col8 '+i,col9:'col9 '+i,col10:'col10 '+i,col11:'col11 '+i,col12:'col12 '+i});


    $scope.editON_Off = function(id) {
        console.log(id);
        $scope.selectedrow[id]=!$scope.selectedrow[id];
    };

    $scope.selectComun=function (col) {
        console.log(col);
        if($scope.selectedColumn[col]!==undefined)
        $scope.selectedColumn[col]=!$scope.selectedColumn[col];
        else
            $scope.selectedColumn[col]=true;

    }
}]);


app.directive('ngRightClick', function($parse) {
    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                event.preventDefault();
                fn(scope, {$event:event});
            });
        });
    };
});