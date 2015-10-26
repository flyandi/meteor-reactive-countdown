/**
 * flyandi:reactivecountdown 
 * A simple reactive countdown timer library
 * @version: v0.0.1
 * @author: Andy Schwarz
 *
 * Created by Andy Schwarz. Please report any bug at http://github.com/flyandi/meteor-reactive-countdown
 *
 * Copyright (c) 2015 Andy Schwarz http://github.com/flyandi
 *
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

ReactiveCountdown = (function () {

    // Constructor
    function ReactiveCountdown(countdown, settings) {
    	this._settings = settings || {};
    	this._dependency = new Tracker.Dependency;
    	this._countdown = countdown;
    	this._interval = this._settings.interval || 1000; 
    	this._steps = this._settings.steps || 1;
    	this._id = false;
    };

    ReactiveCountdown.prototype.start = function(completed, tick){

    	if(completed) this._settings.completed = completed;
    	if(tick) this._settings.tick = tick;

    	this._current = this._countdown;

    	this._id = Meteor.setInterval(function(){

    		this._current = this._current - this._steps;

    		if(typeof(this._settings.tick) == "function") {
    			this._settings.tick();
    		}

            this._dependency.changed();

    		if(this._current <= 0) {

    			this.stop();

    			if(typeof(this._settings.completed) == "function") {
    				this._settings.completed();
    			}
    		}

        }.bind(this), this._interval);
    };

    ReactiveCountdown.prototype.stop = function(){
        Meteor.clearInterval(this._id);
        this._id = false;
    };

    ReactiveCountdown.prototype.add = function(unit) {
    	this._current = this._current + (unit || 0);
    };

    ReactiveCountdown.prototype.remove = function(unit) {
    	this._current = this._current - (unit || 0);
    };

    ReactiveCountdown.prototype.get = function() {

    	this._dependency.depend();

    	return this._current;
    };

    ReactiveCountdown.prototype.getFormattedObject = function(seconds){

        var ms = (seconds | this.__current) * 1000;

        return {
            seconds: Math.floor((ms % 6e4) / 1e3),
            minutes: Math.floor((ms % 3.6e6) / 6e4),
            hours:  (ms % 8.64e7)/ 3.6e6 | 0,
            days: ms / 8.64e7 | 0
        }
    };

    ReactiveCountdown.prototype.getFormattedString = function(format, showZero){

        var format = format instanceof String ? format : '%D days %H hours %M minutes %S seconds',
            current = this.getFormattedObject();

        [['S', 'seconds'], ['M', 'minutes'], ['H', 'hours'], ['D', 'days']].forEach(function(part) {

            var v =  current[part[1]] | 0;

            format = format.replace(new RegExp("%" + part[0], "g"), (showZero && (v >= 0) && (v < 10) ? '0' : '') + v);

        });

        return format;
    };

    return ReactiveCountdown;
})();