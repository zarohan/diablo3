var Utils = {
	'clone': function (obj)
	{
	    var clone = {};
	
	    for (var i in obj) {
	        if (typeof obj[i] == 'object') {
	            clone[i] = _clone(obj[i]);
	        } else {
	            clone[i] = obj[i];
	        }
	    }
	
	    return clone;
	}
}