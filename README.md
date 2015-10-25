Meteor Reactive Countdown
======

Reactive Countdown is a simple library providing a reactive countdown timer.

## Install it

Install the library via the meteor command:

```meteor add flyandi:reactive-countdown```


## How to use it

See the example below to get an idea how to use this library.

```html
<template name="foo">
 
 <big>{{getCountdown}}</big> seconds left!

</template>
```

```javasscript

var countdown = new ReactiveCountdown(30);

countdown.start(function() {
	
	// do something when this is completed

});

Template.foo.helpers({
		
	getCountdown: function() {
		return countdown.get();
	};

});
```


## Constructor

The constructor allows to pass the initial value of the countdown (e.g. in seconds) and a optional settings structure. The settings can override the behavior of the countdown, e.g. instead of seconds use half seconds, etc.

```javascript
new ReactiveCountdown(<countdown>, <settings>);

var countdown = new ReactiveCountdown(30, {
  
  // Value substracted every tick from the current countdown value
  steps: 1,  

  // Specify the countdown's interval in milliseconds
  interval: 1000,

  // Callback: Tick, called on every interval
  tick: function() {},

  // Callback: Complete, called when the countdown has reached 0
  completed: function() {},

});
```

Examples for constructors:

```javascript
	
	// use half seconds for countdown

	var halfSecondCountdown = new ReactiveCountdown(30, {
		interval: 500, 
	});

	// run countdown every 5s
	var fiveSecondCountdown = new ReactiveCountdown(60, {

		interval: 5000,

		step: 5,
	});

```


## Methods

```javascript
 .start(<completed>, <tick>);
```

Resets the countdown and starts it. Optional allows to override the callbacks **completed** and **tick**.


```javascript
 .stop();
```

Stops the countdown. Doesn't execute any callbacks.


```javascript
 .add(<number>);
```

Adds the amount specified to the countdown value. Useful when the countdown value needs to be dynamically adjusted.


```javascript
 .remove(<number>);
```

Removes the amount specified from the countdown value. 


```javascript
 .get();
```

Returns the current value of the countdown. This method is reactive.


```javascript
 .getFormattedObj();
```

Returns the current value of the countdown as an object containing ```days```, ```hours```, ```minutes``` and ```seconds```.
eg. if ```.get()``` returns 612, ```.getFormattedObj()``` will return ```{days : 0, hours : 0, minutes : 10, seconds : 12}```
This method (purposefully) works only if steps is set to 1 (default) and if interval is set to the 1000 (1 second)(default), 60000(1 minute), 3600000 (1 hour) or 86400000 (1 day).


```javascript
 .getFormattedStr();
```

Returns the current value of the countdown as a formatted string. eg. ```4 hours, 15 minutes, 10 seconds```
If true is passed as first parameter, this methods also include zero components in the formatted string. eg. ```0 days, 15 hours, 0 minutes, 12 seconds```
This method (purposefully) works only if steps is set to 1 (default) and if interval is set to the 1000 (1 second)(default), 60000(1 minute), 3600000 (1 hour) or 86400000 (1 day).


## License

Copyright (c) 2015 Andy Schwarz http://github.com/flyandi

The MIT License (http://www.opensource.org/licenses/mit-license.php)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.