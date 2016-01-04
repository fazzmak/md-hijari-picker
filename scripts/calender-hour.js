!function(){"use strict";function a(){return{restrict:"E",replace:!0,require:["^ngModel","smTime"],scope:{initialTime:"@",format:"@"},controller:["$scope","$timeout",b],controllerAs:"vm",templateUrl:"picker/calender-hour.html",link:function(a,b,c,d){var e=d[0],f=d[1];f.configureNgModel(e),a.$on("$destroy",function(){b.remove()})}}}var b=function(a,b){var c=this;c.$scope=a,c.$timeout=b,c.initialDate=a.initialDate,c.format=a.format,c.hourCells=[],c.minuteCells=[],c.moveCalenderAnimation="",c.format=angular.isUndefined(c.format)?"HH:mm":c.format,c.initialDate=angular.isUndefined(c.initialDate)?moment():moment(c.initialDate,c.format),c.currentDate=c.initialDate.clone(),c.init(),a.$watch("vm.topIndex",angular.bind(this,function(a){var b=Math.floor(a/1);c.selectedYear=b}))};b.prototype.configureNgModel=function(a){this.ngModelCtrl=a;var b=this;a.$render=function(){b.ngModelCtrl.$viewValue=b.currentDate}},b.prototype.setNgModelValue=function(a){var b=this;b.ngModelCtrl.$setViewValue(a),b.ngModelCtrl.$render()},b.prototype.init=function(){var a=this;a.buidHourCells(),a.buidMinuteCells(),a.headerDispalyFormat="HH:mm"},b.prototype.buidHourCells=function(){for(var a=this,b=0;23>=b;b++){var c={hour:b,isCurrent:a.initialDate.hour()===b};a.hourCells.push(c)}},b.prototype.buidMinuteCells=function(){for(var a=this,b=0;59>=b;b++){var c={minute:b,isCurrent:a.initialDate.minute()===b};a.minuteCells.push(c)}},b.prototype.selectDate=function(a,b){var c=this;b||(c.currentDate=a,c.$scope.$emit("calender:date-selected"))},b.prototype.setHour=function(a){var b=this;b.currentDate.hour(a),b.setNgModelValue(b.currentDate.format(b.format))},b.prototype.setMinute=function(a){var b=this;b.currentDate.minute(a),b.setNgModelValue(b.currentDate.format(b.format))},b.prototype.selectedDateTime=function(){var a=this;a.setNgModelValue(a.currentDate.format(a.format)),"time"===a.mode?a.view="HOUR":a.view="DATE",a.$scope.$emit("calender:close")};var c=angular.module("dateTimePicker");c.directive("smTime",["$timeout",a])}();