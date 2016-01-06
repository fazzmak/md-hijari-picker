# SM Date, Time and Range Picker

Picker are design to be used with Angular Material.

  - for Demo [http://mominsamir.github.io/date-time-picker/]

### Feature
    - Angular Material based.
    - No JQuery Dependency
    - MomentJs
    - Anuglar Material Theme supported
    - Range Picker
    - Date Picker
    - DateTime Picker
    

### Installation
```sh
  bower install --save smDateTimeRangePicker
```
```sh
  angular.module('Your App',["ngMaterial","smDateTimeRangePicker"]); 
```
####  DateTime Picker
```sh

      <div  layout="row"> 
            <sm-date-time-picker 
                fname="field" 
                lable="Date of Birth"
                form="empForm" 
                value="vm.employee.dateOfBirth" 
                flex="50"
                flex-sm="100"
                flex-xs="100"                          
                is-required="{{true}}" 
                format="MM-DD-YYYY HH:mm"
                mode="date-time" 
                week-start-day="Monday">
            </sm-date-time-picker>
    </div>
```
####  Date Picker
```sh

      <div  layout="row"> 
            <sm-date-time-picker 
                fname="field" 
                lable="Date of Birth"
                form="empForm" 
                value="vm.employee.dateOfBirth" 
                flex="50"
                flex-sm="100"
                flex-xs="100"                          
                is-required="{{true}}" 
                format="MM-DD-YYYY HH:mm"
                week-start-day="Monday">
            </sm-date-time-picker>
    </div>
```
####  Range Picker
```sh
	    <div layout="row">
	        <sm-range-picker-input
	                fname="dayOfPay" 
	                lable="Date of Pay"
	                form="empForm"
	                value="vm.employee.dateOfPay" 
	                flex="50"                         
	                is-required="{{true}}" 
	                format="MM-DD-YYYY"
	                mode="date-time" 
	                week-start-day="Sunday">
	        </sm-range-picker-input>
	    </div>
```


###License

The MIT License (MIT)

Copyright (c) 2015 Anatoliy

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.