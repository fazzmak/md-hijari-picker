!function(){"use strict";function a(){return{restrict:"E",require:"^ngModel",replace:!0,scope:{initialDate:"@",minDate:"=",maxDate:"=",format:"@",mode:"@",startDay:"@"},templateUrl:"picker/date-picker.html",link:function(a,b,c,d){function e(b){switch(b){case"date-time":a.view="DATE",a.headerDispalyFormat="ddd, MMM DD HH:mm";break;case"time":a.view="HOUR",a.headerDispalyFormat="HH:mm";break;default:a.view="DATE"}}e(a.mode),a.currentDate=isNaN(d.$viewValue)?moment().format(a.format):d.$modelValue,d.$viewChangeListeners.push(function(){a.currentDate=d.$modelValue}),a.selectedDateTime=function(){var b=moment(a.selectedDate,"MM-DD-YYYY");if(b.isValid()||(b=moment()),!angular.isUndefined(a.selectedTime)){var c=a.selectedTime.split(":");b.hour(c[0]).minute(c[1])}d.$setViewValue(b.format(a.format)),d.$render(),e(a.mode),a.$emit("calender:close")},a.closeDateTime=function(){a.$emit("calender:close")},a.$on("$destroy",function(){b.remove()})}}}var b=angular.module("dateTimePicker");b.directive("smDatePicker",["$timeout",a])}();