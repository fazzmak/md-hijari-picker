"use strict";function MainCtrl(a,b,c,d,e){function f(a){var e=c.debounce(function(){b(a).toggle().then(function(){d.debug("toggle "+a+" is done")})},300);return e}var g=this;g.logout=function(a){var b=$mdDialog.confirm().title("Logout").content("Save all your work before logout").ariaLabel("Logout").targetEvent(a).ok("Logout").fullscreen(!0).cancel("Cancel");$mdDialog.show(b).then(function(){Auth.logout()},function(){})},g.toggleLeft=f("left")}function LeftCtrl(a,b,c,d){var e=this;e.close=function(){b("left").close().then(function(){})}}angular.module("dateTimePicker",["ngAnimate","ngCookies","ngResource","ngSanitize","ngTouch","ui.router","ngMaterial"]).config(["$stateProvider","$urlRouterProvider","$mdThemingProvider",function(a,b,c){b.otherwise("/home"),a.state("home",{url:"/home",templateUrl:"views/home.html",controller:"MainCtrl",controllerAs:"vm",data:{title:"Dashboard"}}).state("date-time-picker",{url:"/date-time-picker-demo",templateUrl:"views/date-time-picker-demo.html",controller:"MainCtrl",controllerAs:"vm",data:{title:"Date Time Picker Demo"}}).state("date-time-picker-api",{url:"/date-time-picker-api",templateUrl:"views/date-time-picker-api.html",controller:"MainCtrl",controllerAs:"vm",data:{title:"Date Time Picker API"}}).state("range-picker-demo",{url:"/range-picker-demo",templateUrl:"views/range-picker-demo.html",controller:"MainCtrl",controllerAs:"vm",data:{title:"Range Picker Demo"}}),c.theme("default").primaryPalette("red")}]),angular.module("dateTimePicker").controller("MainCtrl",["$timeout","$mdSidenav","$mdUtil","$log","$state",MainCtrl]).controller("LeftCtrl",["$timeout","$mdSidenav","$mdUtil","$log",LeftCtrl]),function(){function a(){return{restrict:"E",scope:{initialDate:"@",minDate:"=",maxDate:"=",format:"@",mode:"@",startDay:"@",selectedDate:"&"},controller:["$scope","$timeout",b],controllerAs:"vm",templateUrl:"picker/calender.html",link:function(a,b,c,d){a.$on("$destroy",function(){b.remove()})}}}var b=function(a,b){var c=this;c.$timeout=b,c.initialDate=a.initialDate,c.startDay=a.startDay,c.minDate=a.minDate,c.maxDate=a.maxDate,c.mode=a.mode,c.format=a.format,c.restrictToMinDate=angular.isUndefined(a.minDate)?!1:!0,c.restrictToMaxDate=angular.isUndefined(a.maxDate)?!1:!0,c.selectedDate=a.selectedDate,c.stopScrollPrevious=!1,c.stopScrollNext=!1,c.view="DATE",c.yearCells=[],c.monthCells=[],c.dateCellHeader=[],c.dateCells=[],c.hourCells=[],c.minuteCells=[],c.monthList=moment.months(),c.moveCalenderAnimation="",c.init()};b.prototype.init=function(){var a=this;a.format=angular.isUndefined(a.format)?"MM-DD-YYYY":a.format,a.startDay=angular.isUndefined(a.startDay)?"Sunday":a.startDay,a.initialDate=angular.isUndefined(a.initialDate)?moment():moment(a.initialDate,a.format),a.currentDate=a.initialDate.clone(),a.restrictToMinDate&&(a.minDate=moment(a.minDate,a.format)),a.restrictToMaxDate&&(a.maxDate=moment(a.maxDate,a.format)),a.buildYearCells(),a.buildDateCells(),a.buildDateCellHeader(),a.buildMonthCells(),a.buidHourCells(),a.buidMinuteCells()},b.prototype.buildYearCells=function(a){var b=this,c=b.initialDate.year()-25;angular.isUndefined(b.minDate)||(c=b.minDate.year());var d=c+25;angular.isUndefined(b.maxDate)||(d=b.maxDate.year());for(var e=c;d>=e;e++)b.yearCells.push(e)},b.prototype.buildMonthCells=function(){var a=this;a.monthCells=moment.months()},b.prototype.buildDateCells=function(){var a=this,b=a.initialDate.month(),c=a.initialDate.clone().date(0).day(a.startDay),d=!1,e=!1;angular.isUndefined(a.minDate)||(a.stopScrollPrevious=a.minDate.unix()>c.unix()),a.dateCells=[];for(var f=0;6>f;f++){for(var g=[],h=0;7>h;h++){var i=c.month()===b;e=i?!1:!0,!a.restrictToMinDate||angular.isUndefined(a.minDate)||e||(e=a.minDate.isAfter(c)),!a.restrictToMaxDate||angular.isUndefined(a.maxDate)||e||(e=a.maxDate.isBefore(c)),console.log();var j={date:c.clone(),dayNum:i?c.date():"",month:c.month(),today:c.isSame(moment(),"day")&&c.isSame(moment(),"month"),year:c.year(),dayName:c.format("dddd"),isWeekEnd:d,isDisabledDate:e,isCurrentMonth:i};g.push(j),c.add(1,"d")}a.dateCells.push(g)}a.restrictToMaxDate&&!angular.isUndefined(a.maxDate)&&(a.stopScrollNext=a.maxDate.unix()<c.unix())},b.prototype.buidHourCells=function(){for(var a=this,b=0;23>=b;b++){var c={hour:b,isCurrent:a.initialDate.hour()===b};a.hourCells.push(c)}},b.prototype.buidMinuteCells=function(){for(var a=this,b=0;59>=b;b++){var c={minute:b,isCurrent:a.initialDate.minute()===b};a.minuteCells.push(c)}},b.prototype.changePeriod=function(a){var b=this;if("p"===a){if(b.stopScrollPrevious)return;b.moveCalenderAnimation="slideLeft",b.initialDate.subtract(1,"M")}else{if(b.stopScrollNext)return;b.moveCalenderAnimation="slideRight",b.initialDate.add(1,"M")}b.buildDateCells(),b.$timeout(function(){b.moveCalenderAnimation=""},500)},b.prototype.selectDate=function(a,b){var c=this;b||(c.currentDate=a)},b.prototype.buildDateCellHeader=function(a){var b=this,c={sunday:{shortName:"Su",fullName:"Sunday",single:"S"},monday:{shortName:"Mo",fullName:"MonDay",single:"M"},tuesday:{shortName:"Tu",fullName:"TuesDay",single:"T"},wednesday:{shortName:"We",fullName:"Wednesday",single:"W"},thursday:{shortName:"Th",fullName:"Thursday",single:"T"},friday:{shortName:"Fr",fullName:"Friday",single:"F"},saturday:{shortName:"Sa",fullName:"Saturday",single:"S"}},d=[];for(var e in c)d.push(e);var f=moment().day(b.startDay).day(),g=0;for(var e in c)b.dateCellHeader.push(c[d[(g+f)%d.length]]),g++},b.prototype.changeView=function(a){var b=this;b.view=a},b.prototype.changeYear=function(a){var b=this;b.initialDate.year(a),b.buildDateCells(),b.view="DATE"},b.prototype.setHour=function(a){var b=this;b.currentDate.hour(a)},b.prototype.setMinute=function(a){var b=this;b.currentDate.minute(a)},b.prototype.selectedDateTime=function(){var a=this;a.selectedDate({date:a.currentDate}),a.view="DATE"},b.prototype.closeDateTime=function(){var a=this;a.selectedDate({date:null}),a.view="DATE"};var c=angular.module("dateTimePicker");c.directive("gjCalender",["$timeout",a])}(),function(){function a(a,b){return{restrict:"EA",replace:!0,scope:{status:"=",value:"=",startDate:"@",weekStartDay:"@",mode:"@",format:"@",minDate:"@",maxDate:"@",fname:"@",lable:"@",isRequired:"@",disable:"=",form:"=",flexSize:"@"},template:'<div flex="{{flexSize}}" flex-gt-sm="100" flex-sm="100" flex-gt-xs="100" flex-xs="100">  <md-input-container  flex="100" style="width:100%;" class="gj-input-container" >    <label  ng-class="{\'required\': required==\'true\'}" ng-if="!lable==\'\'"   for="{{fname}}">{{fname }}</label>      <input name="{{fname}}" ng-model="value"              type="text" placeholde="{{fname}}"             aria-label="{{fname}}" data-ng-required="isRequired"             ng-focus="show()" server-error >          <div ng-messages="form[fname].$error" ng-if="form[fname].$touched">              <div ng-messages-include="modules/core/views/validation-massages.html"></div>          </div>              </md-input-container>  <div id="picker" class="gj-calender-pane">      <gj-calender mode="{{mode}}" selected-date="receiveSelectedDate(date)" data-min-date="minDate" data-max-date="maxDate"  format="{{format}}"  start-day="{{weekStartDay}}" value="value"></gj-calender>  </div></div>',link:function(c,d,e){var f=d[0].querySelector(".gj-input-container"),g=d[0].querySelector(".gj-calender-pane"),h=angular.element(g);c.format=angular.isUndefined(c.format)?"MM-DD-YYYY":c.format,h.addClass("hide"),c.startDate=angular.isUndefined(c.value)?c.startDate:c.value,b.on("click",function(a){g===a.target||f===a.target||g.contains(a.target)||f.contains(a.target)||h.removeClass("show").addClass("hide")}),angular.element(f).on("keydown",function(a){9===a.which&&(h.removeClass("show").addClass("hide"),angular.element(f).focus())}),c.show=function(){var b=f.querySelector("input").getBoundingClientRect(),c=document.body.getBoundingClientRect();h.removeClass("hide"),a("sm")||a("xs")?(g.style.left=(c.width-282)/2+"px",g.style.top=(c.height-450)/2+"px"):(g.style.left=b.left+"px",g.style.top=b.top+"px"),document.body.appendChild(g),h.addClass("show")},c.receiveSelectedDate=function(a){return null===a?void h.removeClass("show").addClass("hide"):(c.value=a.format(c.format),void h.removeClass("show").addClass("hide"))},c.$on("$destroy",function(){g.parentNode.removeChild(g)})}}}var b=function(a){var b=this;b.scope=a,b.clickedButton=0,b.divider=angular.isUndefined(b.scope.divider)?"To":b.scope.divider,b.showCustom=!1,b.startDate=moment().format(b.scope.format),b.endDate=moment().format(b.scope.format),b.selectedRange=a.selectedRange};b.prototype.selectedStartDate=function(a){var b=this;b.startDate=a.format(b.scope.format),b.selectedTabIndex=1},b.prototype.selectedEndDate=function(a){var b=this;b.endDate=a.format(b.scope.format)},b.prototype.dateRangeSelected=function(){var a=this;a.selectedTabIndex=0,a.showCustom=!1,a.selectedRange({startDate:a.startDate,endDate:a.endDate,divider:a.divider})},b.prototype.preDefineDate=function(a){var b=this;b.clickedButton=a;var c=moment();switch(a){case 1:b.startDate=c.clone().startOf("day").format(b.scope.format),b.endDate=c.clone().endOf("day").format(b.scope.format);break;case 2:b.startDate=c.clone().subtract(7,"d").format(b.scope.format),b.endDate=c.clone().format(b.scope.format);break;case 3:b.startDate=c.clone().startOf("month").format(b.scope.format),b.endDate=c.endOf("month").format(b.scope.format);break;case 4:b.startDate=c.clone().subtract(1,"month").startOf("month").format(b.scope.format),b.endDate=c.clone().endOf("month").format(b.scope.format);break;case 5:b.startDate=c.clone().startOf("quarter").format(b.scope.format),b.endDate=c.clone().endOf("quarter").format(b.scope.format);break;case 6:b.startDate=c.clone().startOf("year").format(b.scope.format),b.endDate=c.clone().endOf("year").format(b.scope.format);break;case 7:b.showCustom=!0,b.selectedTabIndex=0;break;case 8:b.startDate=c.clone().startOf("year").format(b.scope.format),b.endDate=c.clone().format(b.scope.format)}7!=a&&b.selectedRange({startDate:b.startDate,endDate:b.endDate,divider:b.divider})};var c=angular.module("dateTimePicker");c.directive("dateTimePicker",["$mdMedia","$document",a])}(),function(){function a(a,b,c,d,e,f){function g(a){return f.isSectionSelected(a)}function h(a){f.toggleSelectSection(a)}function i(a){var b=!1,c=f.openedSection;return c===a?b=!0:a.children&&a.children.forEach(function(a){a===c&&(b=!0)}),b}function j(c){b.go(c),e("left").close().then(function(){a.debug("close RIGHT is done ssss")})}var k=this;k.isOpen=g,k.toggleOpen=h,k.isSectionSelected=i,k.autoFocusContent=!1,k.goToState=j,k.menu=f,k.status={isFirstOpen:!0,isFirstDisabled:!1}}angular.module("dateTimePicker").controller("MenuCtrl",["$log","$state","$timeout","$location","$mdSidenav","menu",a])}(),function(){angular.module("dateTimePicker").run(["$templateCache",function(a){a.put("partials/menu-link.tmpl.html",'<md-button  \n ng-click="focusSection(section)">\n  <md-icon ng-if="section.icon" md-font-icon="material-icons">{{section.icon}}</md-icon>  {{section | humanizeDoc}}\n</md-button>')}]).directive("menuLink",function(){return{scope:{section:"="},templateUrl:"partials/menu-link.tmpl.html",link:function(a,b){var c=b.parent().controller();a.focusSection=function(a){c.autoFocusContent=!0,c.goToState(a.state)}}}})}(),function(){angular.module("dateTimePicker").factory("menu",["$location",function(a){var b=[{name:"Home",state:"home",type:"link",icon:"home"}];b.push({name:"Date Picker",type:"toggle",iconp:"date_range",pages:[{name:"Demo",type:"link",state:"date-time-picker"},{name:"API",type:"link",state:"date-time-picker-api"}]}),b.push({name:"Range Picker",type:"toggle",iconp:"date_range",pages:[{name:"Demo",type:"link",state:"range-picker-demo"}]});var c;return c={sections:b,toggleSelectSection:function(a){c.openedSection=c.openedSection===a?null:a},isSectionSelected:function(a){return c.openedSection===a},selectPage:function(b,d){d&&d.url&&a.path(d.url),c.currentSection=b,c.currentPage=d}}}]).filter("nospace",function(){return function(a){return a?a.replace(/ /g,""):""}}).filter("humanizeDoc",function(){return function(a){return a?"directive"===a.type?a.name.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()}):a.label||a.name:void 0}})}(),function(){angular.module("dateTimePicker").run(["$templateCache",function(a){a.put("partials/menu-toggle.tmpl.html",'<md-button class="md-button-toggle"\n  ng-click="toggle()"\n  aria-controls="side-menu-{{section.name | nospace}}"\n  flex layout="row"\n  aria-expanded="{{isOpen()}}">\n  <md-icon md-font-icon="material-icons">{{section.iconp}}</md-icon> {{section.name}}\n  <span aria-hidden="true" class="pull-right material-icons md-toggle-icon"\n  ng-class="{\'toggled\' : isOpen()}">keyboard_arrow_down</span>\n</md-button>\n<ul ng-show="isOpen()" id="side-menu-{{section.name | nospace}}" class="menu-toggle-list">\n  <li ng-repeat="page in section.pages">\n    <menu-link section="page"></menu-link>\n  </li>\n</ul>\n')}]).directive("menuToggle",["$timeout",function(a){return{scope:{section:"="},templateUrl:"partials/menu-toggle.tmpl.html",link:function(a,b){var c=b.parent().controller();a.isOpen=function(){return c.isOpen(a.section)},a.toggle=function(){c.toggleOpen(a.section)}}}}])}(),angular.module("dateTimePicker").run(["$templateCache",function(a){a.put("views/date-time-picker-api.html",'<md-content class="md-whiteframe-z2" layout-padding> <div> Attributes Details </div> <div> <table> <thead> <tr> <th>Attribute</th> <th>Value</th> <th>Desription</th> </tr> </thead> <tbody> <tr> <td>fname</td> <td>Field name</td> <td>Field Name</td> </tr> <tr> <td>lable</td> <td>Lable for field</td> <td>Lable for field</td> </tr> <tr> <td>form</td> <td>form control name</td> <td>form control name</td> </tr> <tr> <td>value</td> <td>ng-Model</td> <td>ng-Model value here</td> </tr> <tr> <td>flex-size</td> <td>Flex size to setup</td> <td>Flex size to setup</td> </tr> <tr> <td>format</td> <td>date format</td> <td>Moment Js accepted date format</td> </tr> <tr> <td>mode</td> <td>Date picker or Date Time picker mode</td> <td>if DateTime Mode put \'date-time\' else keep blank</td> </tr> <tr> <td>week-start-day</td> <td>Start day for calender</td> <td>Monday or Sunday</td> </tr> <tr> <td>start-date</td> <td>Start date for calender</td> <td>Keep Blank</td> </tr> <tr> <td>is-required</td> <td>is field is required</td> <td>True or false</td> </tr> <tr> <td>min-date</td> <td>Min Date </td> <td>Min date</td> </tr> <tr> <td>max-date</td> <td>Max date</td> <td>Max Date</td> </tr> </tbody> </table> </div> <div> Support Swipe left and right for date movement. </div> <div> <code> &lt;date-time-picker fname="Date of Joining" lable="joiningDate" form="empForm"  value="vm.employee.joiningDate"  start-date="10-15-2015" flex-size="100" max-date="01-12-2016" is-required="{{true}}"  format="MM-DD-YYYY"  week-start-day="Sunday"&gt; &lt;/date-time-picker&gt;  </code> </div> <div> Need your feedback. </div> </md-content>'),a.put("views/date-time-picker-demo.html",'<md-content class="md-whiteframe-z2" layout-padding> <div> DateTime picker, week start date is Monday <date-time-picker fname="Date of Birth" lable="Date of Birth" form="empForm" value="vm.employee.dateOfBirth" flex-size="50" is-required="{{true}}" format="MM-DD-YYYY HH:mm" mode="date-time" week-start-day="Monday"> </date-time-picker> </div> <div> Date picker, Max date set to 01-12-2016 and week start date is Sunday <date-time-picker fname="Date of Joining" lable="joiningDate" form="empForm" value="vm.employee.joiningDate" data-start-date="10-15-2015" flex-size="50" max-date="01-12-2016" is-required="{{true}}" format="MM-DD-YYYY" week-start-day="Sunday"> </date-time-picker> </div> <div> Min date set to 11-10-2015 <date-time-picker fname="Date of Pay" lable="Date of Pay" form="empForm" min-date="11-10-2015" value="vm.employee.dateOfPay" flex-size="50" is-required="{{true}}" format="MM-DD-YYYY HH:mm" mode="date-time" week-start-day="Sunday"> </date-time-picker> </div>  <h2 class="md-headline">Docs</h2> <a href="/#/date-time-picker-api">Docs</a>  </md-content>'),a.put("views/home.html",'<md-content class="md-whiteframe-z2" layout-padding> <div layout="row"> <h2 class="md-headline">Wel Come to Date Time Picker</h2> </div> <div layout="column"> <p style="font-size:16px"> I have developed this component for learning purpose. its based on angular material and momentJs. I have tried to follow material guildlines, however there are some area is left open in material guidlines. </p> <p style="font-size:16px"> What to do if date and time picker is required? How to display date and time? How to transite from date selection to time selection? </p> </div> <div layout="column"> <h2 class="md-headline">Goal for Date picker</h2> <ul style="list-style-type: none"> <li> Should be design as per Material design guide. </li> <li> Should support Min Max Date. </li> <li> Should provide option to select time with date </li> <li> Should able to change year </li> <li> Should support material theme. </li> <li> Should be supported mobile. </li> </ul> </div> </md-content>'),a.put("views/range-picker-demo.html",'<md-content class="md-whiteframe-z2" layout-padding> <div> <h2 class="md-title">Comming soon.</h2> </div> </md-content>')}]);