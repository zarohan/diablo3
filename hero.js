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
			itemApi = Object.create(BlizzardApi);
    		for (item in this.items) {
    			console.log(this.items[item]);
			//	itemApi.getItem(this.items[item]);
				//itemApi.callback = function ()
				{
					this.itemsInfo = Utils.clone(itemApi.response);
				}
            }
		}
};