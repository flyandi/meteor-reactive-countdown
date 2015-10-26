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


    /**
     * Returns an object containing days, hours, minutes and seconds.
     * works only if interval is set to 1 second, 1 minute, 1 hour or 1 day
     * works only if steps is set to 1
     */
    ReactiveCountdown.prototype.getFormattedObj = function(){
        if(this._steps == 1 && (this._interval == 1000 || this._interval == 60*1000 || this._interval == 60*60*1000 || this._interval == 24*60*60*1000)){
            var secs = this.get();
            if(secs){
                secs = Math.round(secs);
                var days = Math.floor(secs / (24 * 60 * 60));

                var divisor_for_hours = secs % (24 * 60 * 60);
                var hours = Math.floor(divisor_for_hours / (60 * 60));

                var divisor_for_minutes = divisor_for_hours % (60 * 60);
                var minutes = Math.floor(divisor_for_minutes / 60);

                var divisor_for_seconds = divisor_for_minutes % 60;
                var seconds = Math.ceil(divisor_for_seconds);

                var formattedObj = {
                    "days": days,
                    "hours": hours,
                    "minutes": minutes,
                    "seconds": seconds
                };
                return formattedObj;
            }
        }
    };

    /**
     * Returns string containing days, hours, minutes and seconds.
     * works only if interval is set to 1 second, 1 minute, 1 hour or 1 day
     * works only if steps is set to 1
     */
    ReactiveCountdown.prototype.getFormattedStr = function(formattedStr, showZero){
        if(typeof formattedStr == undefined){
            return;
        }
        if(typeof showZero == undefined){
            showZero = false;
        }
        if(this._steps == 1 && (this._interval == 1000 || this._interval == 60*1000 || this._interval == 60*60*1000 || this._interval == 24*60*60*1000)){
            var formattedObj = this.getFormattedObj();
            if(formattedObj){
                formattedStr = formattedStr.replace(/(<([^>]*)__D([^>]*)>)/, (formattedObj.days || showZero) ? "$2" + formattedObj.days + "$3" : "");
                formattedStr = formattedStr.replace(/(<([^>]*)__H([^>]*)>)/, (formattedObj.hours || showZero) ? "$2" + formattedObj.hours + "$3" : "");
                formattedStr = formattedStr.replace(/(<([^>]*)__M([^>]*)>)/, (formattedObj.minutes || showZero)? "$2" + formattedObj.minutes + "$3" : "");
                formattedStr = formattedStr.replace(/(<([^>]*)__S([^>]*)>)/, (formattedObj.seconds || showZero)? "$2" + formattedObj.seconds + "$3" : "");
                return formattedStr;
            }
        }
    };

    return ReactiveCountdown;
})();