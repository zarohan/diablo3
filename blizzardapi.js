var BlizzardApi = {
	'baseUrl': 'http://eu.battle.net',
	'profileUrl': '/api/d3/profile/',
	'itemUrl': '/api/d3/data/',
	'response': false,
	'script': false,
	'callback': function() {},
	'_apiLoaded': false,
	'_apiCallback': function()
		{
			this._apiLoaded = true;
			this.callback();
			delete this.script;
		},
	'_apiCall': 
		function (request, type)
		{
			this._apiLoaded = false;
			if (typeof(type) === 'undefined') {
				type = 'profile';
			}
			
			switch (type) {
				case 'item':
					sectionUrl = this.itemUrl;
				break;
				case 'profile':
					sectionUrl = this.profileUrl;
				break;
				case 'hero':
					sectionUrl = this.profileUrl;
				break;
			}
			
			this.script = document.createElement('script');
			this.script.type = 'text/javascript';
			this.script.src = this.baseUrl + sectionUrl + request + (type == 'profile' ? '/' : '') + '?callback=BlizzardApi._saveLastResponse';
			this.script.onload = this.bind(this._apiCallback);
			var head = document.getElementsByTagName('head')[0];
			head.appendChild(this.script);
		},
	'_saveLastResponse':
		function(response)
		{
			this.response = response;
		},
	'getProfile':
		function (login, tag)
		{
			this._apiCall(login + '-' + tag, 'profile');
		},
	'getItem':
		function (itemCode)
		{
			this._apiCall(itemCode, 'item');
		},
	'getHero':
		function (login, tag, heroId)
		{
			this._apiCall(login + '-' + tag + '/hero/' + heroId, 'hero');
		},
	'bind': function(method)
		{ 
	        var _this = this;
	        return function()
	        {
	            return method.apply(_this, arguments);
	        } 
		}
};
