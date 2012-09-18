var Utils = {
	'clone': function (obj)
	{
	    var clone = {};
	
	    for (var i in obj) {
	        if (typeof obj[i] == 'object') {
	            clone[i] = Utils.clone(obj[i]);
	        } else {
	            clone[i] = obj[i];
	        }
	    }
	
	    return clone;
	},
	'round': function round(num, dec)
	{
		var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
		return result;
	}
}