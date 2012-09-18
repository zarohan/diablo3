var Hero = {
	'data': false,
	'items': false,
	'itemsInfo': {},
	'getItemIds':
		function ()
		{
			if (this.items !== false) {
				return this.items;
			}
			
			this.items = {
				'bracers': {},
				'feet': {},
				'hands': {},
				'head': {},
				'leftFinger': {},
				'legs': {},
				'mainHand': {},
				'neck': {},
				'rightFinger': {},
				'shoulders': {},
				'torso': {},
				'waist': {}
			};
			
			for (slot in this.data.items) {
				this.items[slot] = this.data.items[slot].tooltipParams;
			}
			return this.items;
		},
	'getItemsInfo':
		function ()
		{
			var itemApi = {};
    		for (item in this.items) {
    			itemApi[item] = Object.create(BlizzardApi);
				itemApi[item].callback = this.bind(function (n)
				{
					this.itemsInfo[n] = Utils.clone(itemApi[n].response);
				}, item);
				
				itemApi[item].getItem(this.items[item]);
            }
		},
	'calculateDps': function(dps, stat, itemAttackSpeed, critChance, critDamage)
	{
		var flatDmg = dps * (1 + stat/100) * (1 + itemAttackSpeed);
		var critDmg = flatDmg * critChance * (0.5 + critDamage);
		return flatDmg + critDmg; 
	},
	'getAllStats': function()
	{
		var all = {
			'byItems': {},
			'byAttrs': {}
		};
		for(slot in this.itemsInfo) {
			for (attr in this.itemsInfo[slot].attributesRaw) {
				(all.byItems[slot] || (all.byItems[slot] = []))[attr] = this.itemsInfo[slot].attributesRaw[attr].max;
				(all.byAttrs[attr] || (all.byAttrs[attr] = []))[slot] = this.itemsInfo[slot].attributesRaw[attr].max;
			}
		}
		return all;
	},
	'bind': function(method, param)
		{ 
	        var _this = this;
	        return function()
	        {
	            return method.apply(_this, [param]);
	        };
		}
};