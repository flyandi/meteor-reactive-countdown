ReactiveCountdown.prototype.getformattedString = function(format, showZero){

    var format = format instanceof String ? format : '%D days %H hours %M minutes %S seconds',
        current = this.getFormattedObject();

    if(typeof showZero == undefined){
        showZero = false;
    }
    if(this._steps == 1 && (this._interval == 1000 || this._interval == 60*1000 || this._interval == 60*60*1000 || this._interval == 24*60*60*1000)){
        if(formattedObj){
            format = format.replace(/(<([^>]*)__D([^>]*)>)/, (formattedObj.days || showZero) ? "$2" + formattedObj.days + "$3" : "");
            format = format.replace(/(<([^>]*)__H([^>]*)>)/, (formattedObj.hours || showZero) ? "$2" + formattedObj.hours + "$3" : "");
            format = format.replace(/(<([^>]*)__M([^>]*)>)/, (formattedObj.minutes || showZero)? "$2" + formattedObj.minutes + "$3" : "");
            format = format.replace(/(<([^>]*)__S([^>]*)>)/, (formattedObj.seconds || showZero)? "$2" + formattedObj.seconds + "$3" : "");
            return format;
        }
    }
};


    ReactiveCountdown.prototype.getFormattedString = function(){
        
        var format = (typeof format == 'string' || format instanceof String) ? format : '<%DD days ><%HH hours ><%MM minutes ><%SS seconds>',
            current = this.getFormattedObject();
        
        for(var part in [['S', 'seconds'], ['M', 'minutes'], ['H', 'hours'], ['D', 'days']]) {

            var v =  current[part[1]] | 0;


            format = format.replace(new RegExp("<<([^>]*)(%" + part[0] + part[0] + "?)([^>]*)>>", "g"), v ? "<$1$2$3>" : "" )
                            .replace(new RegExp("<([^>]*)%" + part[0] + part[0] + "([^>]*)>", "g"), "$1" + ((v >= 0) && (v < 10) ? '0' : '') + v + "$2")
                            .replace(new RegExp("<([^>]*)%" + part[0] + "([^>]*)>", "g"), "$1" + v + "$2");

        };

        return format;
    };