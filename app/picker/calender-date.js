(function(){

'use strict';

function Calender(){
	return {
	  restrict : 'E',
	  replace:true,
      require: ['^ngModel', 'smCalender'],
      scope :{
	      	initialDate : "@",
	      	minDate:"=",
	      	maxDate:"=",
	      	format:"@",
	      	mode:"@",
	      	startView:"@",	      	
	      	startDay:"@",
	      	showDisplayHeader:"@"
	    },
	   	controller:["$scope","$timeout",CalenderCtrl],
	    controllerAs : 'vm',
	    templateUrl:"picker/calender-date.html",
		link : function(scope,element,att,ctrls){
			var ngModelCtrl = ctrls[0];
	        var calCtrl = ctrls[1];
	        calCtrl.configureNgModel(ngModelCtrl);

			scope.$on('$destroy',function(){
			   element.remove();
			});
		}      
	}
}

var CalenderCtrl = function($scope,$timeout){
	var self  = this;

	self.$scope = $scope;
	self.$timeout = $timeout;
	self.initialDate = $scope.initialDate; 	//if calender to be  initiated with specific date 
	self.startDay = angular.isUndefined($scope.startDay) || $scope.startDay==='' ? 'Sunday' : $scope.startDay ;	   	//if calender to be start on specific day default is sunday
	self.minDate = $scope.minDate;			//Minimum date 
	self.maxDate = $scope.maxDate;			//Maximum date 
	self.mode = angular.isUndefined($scope.mode) ? 'DATE' : $scope.mode;
	self.format = $scope.format;
	self.restrictToMinDate = angular.isUndefined($scope.minDate) ? false : true;
	self.restrictToMaxDate = angular.isUndefined($scope.maxDate) ? false : true;
	self.stopScrollPrevious =false;
	self.stopScrollNext = false;
	self.yearCells = [];
	self.monthCells=[];
	self.dateCellHeader= [];	
	self.dateCells = [];
	self.hourCells =[];
	self.minuteCells =[];
	self.monthList = moment.months();
	self.moveCalenderAnimation='';
	self.format = angular.isUndefined(self.format) ? 'MM-DD-YYYY': self.format;
	self.initialDate =	angular.isUndefined(self.initialDate)? moment() : moment(self.initialDate,self.format);
	self.currentDate = self.initialDate.clone();
	if(self.restrictToMinDate) 
		self.minDate = moment(self.minDate, self.format);
	if(self.restrictToMaxDate) 
		self.maxDate = moment(self.maxDate, self.format);
	self.init();
	$scope.$watch('vm.topIndex', angular.bind(this, function(topIndex) {
          var scrollYear = Math.floor(topIndex / 1);
          self.selectedYear = scrollYear;
    }));
}


 CalenderCtrl.prototype.configureNgModel = function(ngModelCtrl) {
    this.ngModelCtrl = ngModelCtrl;
    var self = this;
    ngModelCtrl.$render = function() {
      self.ngModelCtrl.$viewValue= self.currentDate;
    };
  };


  CalenderCtrl.prototype.setNgModelValue = function(date) {
  	var self = this;
    self.ngModelCtrl.$setViewValue(date);
    self.ngModelCtrl.$render();
  };

CalenderCtrl.prototype.init = function(){
	var self = this;
	self.buildYearCells();
	self.buildDateCells();
	self.buildDateCellHeader();
	self.buildMonthCells();
	self.buidHourCells();
	self.buidMinuteCells();
	self.setView()
};

CalenderCtrl.prototype.setView = function(){
	var self = this;
	self.headerDispalyFormat = "ddd, MMM DD";	
	switch(self.mode) {
	    case 'date-time':
			self.view = 'DATE'
			self.headerDispalyFormat = "ddd, MMM DD HH:mm";			
	        break;
	    case 'time':
	        self.view = 'HOUR';
			self.headerDispalyFormat = "HH:mm";
	        break;
	    default:
	        self.view = 'DATE';
	}	
}


CalenderCtrl.prototype.buildYearCells = function(y){
	var self = this;
	var startYear = self.initialDate.year() -60;
	if(!angular.isUndefined(self.minDate)){
		startYear = self.minDate.year();		
	}
	var endYear = self.initialDate.year() +25;
	if(!angular.isUndefined(self.maxDate)){
		endYear = self.maxDate.year();		
	}	
	for (var i = startYear ; i <= endYear; i++) {
		self.yearCells.push(i);
	};	
};

CalenderCtrl.prototype.buildMonthCells = function(){
	var self = this;
	self.monthCells = moment.months();
};

CalenderCtrl.prototype.buildDateCells = function(){
	var self = this;
	var currentMonth = self.initialDate.month();
    var calStartDate  = self.initialDate.clone().date(0).day(self.startDay);
    var weekend = false;
    var isDisabledDate =false;

    /*
    	Check if min date is greater than first date of month
    	if true than set stopScrollPrevious=true 
    */
	if(!angular.isUndefined(self.minDate)){	
		self.stopScrollPrevious	 = self.minDate.unix() > calStartDate.unix();
	}

    self.dateCells =[];
	for (var i = 0; i < 6; i++) {
		var week = [];
		for (var j = 0; j < 7; j++) {
			
			var isCurrentMonth = (calStartDate.month()=== currentMonth);	
			

			if(isCurrentMonth){isDisabledDate=false}else{isDisabledDate=true};
			

			if(self.restrictToMinDate && !angular.isUndefined(self.minDate) && !isDisabledDate)
				isDisabledDate = self.minDate.isAfter(calStartDate);
			
			if(self.restrictToMaxDate && !angular.isUndefined(self.maxDate) && !isDisabledDate)
				isDisabledDate = self.maxDate.isBefore(calStartDate);
			

			var  day = {
	            	date : calStartDate.clone(),
	                dayNum: isCurrentMonth ? calStartDate.date() :"",
	                month : calStartDate.month(),
	                today: calStartDate.isSame(moment(),'day') && calStartDate.isSame(moment(),'month'),
	                year : calStartDate.year(),
	                dayName : calStartDate.format('dddd'),
	                isWeekEnd : weekend,
	                isDisabledDate : isDisabledDate,
	                isCurrentMonth : isCurrentMonth
			};
			
			week.push(day);
            calStartDate.add(1,'d')
		}
		self.dateCells.push(week);
	}
    /*
    	Check if max date is greater than first date of month
    	if true than set stopScrollPrevious=true 
    */
	if(self.restrictToMaxDate && !angular.isUndefined(self.maxDate)){	
		self.stopScrollNext	= self.maxDate.unix() < calStartDate.unix();
	}

	if(self.dateCells[0][6].isDisabledDate && !self.dateCells[0][6].isCurrentMonth){
		self.dateCells[0].splice(0);
	}

};

CalenderCtrl.prototype.buidHourCells = function(){
	var self = this;
	for (var i = 0 ; i <= 23; i++) {
		var hour={
			hour : i,
			isCurrent :(self.initialDate.hour())=== i 
		}
		self.hourCells.push(hour);
	};	
};

CalenderCtrl.prototype.buidMinuteCells = function(){
	var self = this;
	for (var i = 0 ; i <= 59; i++) {
		var minute = {
			minute : i,
			isCurrent : (self.initialDate.minute())=== i,
		}
		self.minuteCells.push(minute);
	};
};

CalenderCtrl.prototype.changePeriod = function(c){
	var self = this;
	if(c === 'p'){
		if(self.stopScrollPrevious) return;
		self.moveCalenderAnimation='slideLeft';
		self.initialDate.subtract(1,'M');
	}else{
		if(self.stopScrollNext) return;
		self.moveCalenderAnimation='slideRight';
		self.initialDate.add(1,'M');
	}

	self.buildDateCells();
	self.$timeout(function(){
		self.moveCalenderAnimation='';
	},500);
};


CalenderCtrl.prototype.selectDate = function(d,isDisabled){
	var self = this;
	if (isDisabled) return;
	self.currentDate = d;
	self.setNgModelValue(d);
	self.$scope.$emit('calender:date-selected');

}


CalenderCtrl.prototype.buildDateCellHeader = function(startFrom){
	var self = this;
	var daysByName = {
		sunday    : {'shortName':'Su','fullName':'Sunday','single':'S'}, 
		monday    : {'shortName':'Mo','fullName':'MonDay','single':'M'}, 
		tuesday   : {'shortName':'Tu','fullName':'TuesDay','single':'T'}, 
		wednesday : {'shortName':'We','fullName':'Wednesday','single':'W'}, 
		thursday  : {'shortName':'Th','fullName':'Thursday','single':'T'}, 
		friday    : {'shortName':'Fr','fullName':'Friday','single':'F'}, 
		saturday  : {'shortName':'Sa','fullName':'Saturday','single':'S'}
	}
	var keys = [];
	for (var key in daysByName) {
		keys.push(key)
	}
	var startIndex = moment().day(self.startDay).day(), count = 0;
	for (var key in daysByName) {

    	self.dateCellHeader.push(daysByName[ keys[ (count + startIndex) % (keys.length)] ]);
        count++; // Don't forget to increase count.
    }  
}
/*
	Month Picker
*/

CalenderCtrl.prototype.changeView = function(view){
	var self = this;
	self.view =view;
}

/*
	Year Picker
*/


CalenderCtrl.prototype.changeYear = function(yr){
	var self = this;
	self.initialDate.year(yr);
	self.buildDateCells();
	self.view='DATE';	
}

/*
	Hour and Time
*/


CalenderCtrl.prototype.setHour = function(h){
	var self = this;
	self.currentDate.hour(h);
}

CalenderCtrl.prototype.setMinute = function(m){
	var self = this;
	self.currentDate.minute(m);
}

CalenderCtrl.prototype.selectedDateTime = function(){
	var self = this;
	self.setNgModelValue(self.currentDate);
	if(self.mode === 'time') 
		self.view='HOUR' 
	else 
		self.view='DATE';
	self.$scope.$emit('calender:close');			
}

CalenderCtrl.prototype.closeDateTime = function(){
	var self = this;
	if(self.mode === 'time') 
		self.view='HOUR' 
	else 
		self.view='DATE';
	self.$scope.$emit('calender:close');

}



function DateTimePicker($mdUtil,$mdMedia,$document,picker){
    return {
      restrict : 'E',
      replace:true,
      scope :{
        value: '=',
        startDate : '@',
        weekStartDay : '@',
        startView:"@",                  
        mode : '@',
        format : '@',
        minDate : '@',
        maxDate : '@',
        fname : "@",
        lable : "@",
        isRequired : '@',
        disable : '=',
        form : '='
      },
      template: '  <md-input-container  >'
                +'    <label for="{{fname}}">{{lable }}</label>'
                +'    <input name="{{fname}}" ng-model="value" ng-readonly="true"'
                +'             type="text" placeholde="{{lable}}"'
                +'             aria-label="{{fname}}" data-ng-required="isRequired"'
                +'             ng-focus="show()" server-error class="sm-input-container">'
                +'    <div ng-messages="form.fname.$error" ng-if="form[fname].$touched">'
                +'    		<div ng-messages-include="{{ngMassagedTempaltePath}}"></div>'
                +'    </div>'
                +'    	<div id="picker" class="sm-calender-pane md-whiteframe-15dp">'
                +'     		<sm-date-picker '
                +'              id="{{fname}}Picker" '  
                +'              ng-model="value" '
                +'				initial-date="{{value}}"'
                +'              mode="{{mode}}" '
                +'              start-view="{{startView}}" '  
                +'              data-min-date="minDate" '
                +'              data-max-date="maxDate"  '
                +'              format="{{format}}"  '
                +'          	start-day="{{weekStartDay}}" > '
                +'			</sm-date-picker>'
                +'    	</div>'                
                +'  </md-input-container>',
      link :  function(scope,$element,attr){
        var inputPane = $element[0].querySelector('.sm-input-container');
        var calenderPane = $element[0].querySelector('.sm-calender-pane');
        var cElement = angular.element(calenderPane);
        scope.ngMassagedTempaltePath =picker.path;
        // check if Pre defined format is supplied
        scope.format = angular.isUndefined(scope.format) ? 'MM-DD-YYYY': scope.format;
        
        // Hide calender pane on initialization
        cElement.addClass('hide');

        // set start date
        scope.startDate  = angular.isUndefined(scope.value)? scope.startDate : scope.value;

        // Hide Calender on click out side
        $document.on('click', function (e) {
            if ((calenderPane !== e.target && inputPane !==e.target) && (!calenderPane.contains(e.target) && !inputPane.contains(e.target))) {
              cElement.removeClass('show').addClass('hide');
              $mdUtil.enableScrolling();      
            }
        });

        // if tab out hide key board
        angular.element(inputPane).on('keydown', function (e) {
            if(e.which===9){
              cElement.removeClass('show').addClass('hide');
              angular.element(inputPane).focus();
              $mdUtil.enableScrolling();      
            }
        });

        // show calender 
        scope.show= function(){
          var elementRect = inputPane.getBoundingClientRect();
          var bodyRect = document.body.getBoundingClientRect();

          cElement.removeClass('hide');
          if($mdMedia('sm') ||  $mdMedia('xs')){
            calenderPane.style.left = (bodyRect.width-282)/2+'px';
            calenderPane.style.top =  (bodyRect.height-450)/2+ 'px';
          }else{
            var rect = getVisibleViewPort(elementRect,bodyRect);
            calenderPane.style.left = (rect.left) + 'px';
            calenderPane.style.top = (rect.top) + 'px';
          }
          document.body.appendChild(calenderPane);
          $mdUtil.disableScrollAround(calenderPane);
          cElement.addClass('show');
        }

        // calculate visible port to display calender
        function getVisibleViewPort(elementRect,bodyRect){
          var calenderHeight = 460;
          var calenderWidth = 296;

          var top =elementRect.top;
          if(elementRect.top +calenderHeight > bodyRect.bottom){
            top = elementRect.top - ((elementRect.top +calenderHeight) - (bodyRect.bottom -20));
          }
          var left = elementRect.left;
          if(elementRect.left +calenderWidth > bodyRect.right){
             left = elementRect.left - ((elementRect.left +calenderWidth) - (bodyRect.right -10));
          }
          return {top : top, left : left };
        }

        //listen to emit for closing calender
        scope.$on('calender:close',function(){
            cElement.removeClass('show').addClass('hide');
            calenderPane.parentNode.removeChild(calenderPane);          
            $mdUtil.enableScrolling();            
        });
        // remove element on scope destroyed
 /*       scope.$on('$destroy',function(){
          calenderPane.parentNode.removeChild(calenderPane);
        });*/

    }
  }
} 

function picker(){
	var massagePath;
	var divider= " To ";
	return{
		setMassagePath : function(param){
			massagePath = param
		},
		setDivider : function(value){
			divider = value
		},  
		$get: function(){
			return {
				path : massagePath,
				divider : divider
			}
		}
	}
}

var app = angular.module('dateTimePicker');

app.directive('smCalender',['$timeout',Calender]);
app.directive('smDateTimePicker',['$mdUtil','$mdMedia','$document','picker',DateTimePicker]);
app.provider('picker',[picker]);

})();