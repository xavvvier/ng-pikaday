ng-pikaday
==========

### An [angularjs](https://angularjs.org) directive for [Pikaday](https://github.com/dbushell/Pikaday)

* Works adding a pikaday attribute to the input element
* Uses native datepicker in mobile devices (requires [modernizr](http://modernizr.com) to detect browser capabilities)
* Allows you to change the default date format


## Usage

Load the pikaday files in the head section:

```html
<head>
   <link rel="stylesheet" href="pikaday.css"/>
   <script type="text/javascript" src="pikaday.js"></script>
   <script type="text/javascript" src="angular.min.js"></script>
   <script type="text/javascript" src="ng-pikaday.js"></script>
</head>
```

Add the *pikaday* attribute to the input field and bind the value to your model:

```html
<input type="text" pikaday="" ng-model="dateOfBirth">
```

Load the Pikaday dependency in your module and supply your value in the controller:

```javascript
angular.module('ExampleModule',['Pikaday'])
.controller('BasicCtrl',['$scope', function ($scope){
    $scope.dateOfBirth = 'Tue Nov 23 1999';
}]);
```


[**See the basic example →**](http://xavvvier.github.io/ng-pikaday/examples/basic-usage.html)

#Formatting

For custom formatting **Pikaday** uses [moment](http://momentjs.com). Include the reference to moment file in head section, and add the *format* attribute to the input file:


```html
<script type="text/javascript" src="moment.min.js"></script>
.
.
.
<input type="text" id="datepicker" pikaday="" ng-model="dateOfBirth" format="DD-MM-YYYY">
````


[**See the formatting example →**](http://xavvvier.github.io/ng-pikaday/examples/formatting.html)


#Mobile

When the input file is visualized in a mobile device, the html5 native date picker is used. (See the formatting example)
