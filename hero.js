var statObj =  {
		'sum': 0,
		'slots': {
			'bracers': 0,
			'feet': 0,
			'hands': 0,
			'head': 0,
			'leftFinger': 0,
			'legs': 0,
			'mainHand': 0,
			'neck': 0,
			'rightFinger': 0,
			'shoulders': 0,
			'torso': 0,
			'waist': 0,
			'offHand': 0
		},
		'affixes': [{
			'name': '',
			'quotient': 1,
		}],
	};
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
	},
	'const': {
		'stats': {
			'hp': {
				'base': Utils.clone(statObj),
				'max': Utils.clone(statObj),
				'percent': Utils.clone(statObj),
				'regen': Utils.clone(statObj),
				'loh': Utils.clone(statObj)
			},
			'damage': {
				'weaponDps': Utils.clone(statObj),
				'finalDps': Utils.clone(statObj),
				'speed': Utils.clone(statObj),
				'critChance': Utils.clone(statObj),
				'critDamage': Utils.clone(statObj),
				'mainStat': Utils.clone(statObj),
			},
			'defence': {
				'armor': Utils.clone(statObj),
				'bliockChance': Utils.clone(statObj),
				'blockAnountAvg': Utils.clone(statObj),
				'dodge': Utils.clone(statObj),
				'minResist': Utils.clone(statObj),
				'physical': Utils.clone(statObj),
				'fire': Utils.clone(statObj),
				'lighting': Utils.clone(statObj),
				'arcane': Utils.clone(statObj),
				'poison': Utils.clone(statObj),
				'cold': Utils.clone(statObj),
			},
			'base': {
				'str': Utils.clone(statObj),
				'dex': Utils.clone(statObj),
				'int': Utils.clone(statObj),
				'vit': Utils.clone(statObj)
			}
		}
	},
	'setStatsAffixes': function (klass)
	{
		this.const.stats.hp.base.affixes = [{'name': 'Vitality_Item', 'quotient': 35}];
	//	this.const.stats.hp.max.affixes = [{'name': '', 'quotient': 1}];
		this.const.stats.hp.percent.affixes = [{'name': 'Hitpoints_Max_Percent_Bonus_Item', 'quotient': 1}];
		this.const.stats.hp.regen.affixes = [{'name': 'Hitpoints_Regen_Per_Second', 'quotient': 1}];
		this.const.stats.hp.loh.affixes = [{'name': 'Hitpoints_On_Hit', 'quotient': 1}];
		
	//	this.const.stats.hp.weaponDps.affixes = [{'name': '', 'quotient': 1}];
	//	this.const.stats.hp.finalDps.affixes = [{'name': '', 'quotient': 1}];
		this.const.stats.hp.speed.affixes = [{'name': 'Attacks_Per_Second_Percent', 'quotient': 1}];
		this.const.stats.hp.critChance.affixes = [{'name': 'Crit_Percent_Bonus_Capped', 'quotient': 1}];
		this.const.stats.hp.critDamage.affixes = [{'name': 'Crit_Damage_Percent', 'quotient': 1}];
		
		
		this.const.stats.hp.armor.affixes = [{'name': 'Armor_Item', 'quotient': 1}, 'name': 'Armor_Bonus_Item', 'quotient': 1}];
		this.const.stats.hp.bliockChance.affixes = [{'name': 'Block_Chance_Item', 'quotient': 1}];
		this.const.stats.hp.blockAnountAvg.affixes = [{'name': 'Block_Amount_Item_Min', 'quotient': 1}, {'name': 'Block_Amount_Item_Delta', 'quotient': 0.5}];
	//	this.const.stats.hp.dodge.affixes = [{'name': 'Dexterity_Item', 'quotient': -1}];
	//	this.const.stats.hp.minResist.affixes = [{'name': 'Vitality_Item', 'quotient': 1}];
		this.const.stats.hp.physical.affixes = [{'name': 'Resistance#Physical', 'quotient': 1}, {'name': 'Resistance_All', 'quotient': 1}, {'name': 'Intelligence_Item', 'quotient': 0.1}];
		this.const.stats.hp.fire.affixes = [{'name': 'Resistance#fire', 'Quotient': 1}, {'name': 'Resistance_All', 'quotient': 1}, {'name': 'Intelligence_Item', 'quotient': 0.1}];
		this.const.stats.hp.lighting.affixes = [{'name': 'Resistance#Lighting', 'quotient': 1}, {'name': 'Resistance_All', 'quotient': 1}, {'name': 'Intelligence_Item', 'quotient': 0.1}];
		this.const.stats.hp.arcane.affixes = [{'name': 'Resistance#Arcane', 'quotient': 1}, {'name': 'Resistance_All', 'quotient': 1}, {'name': 'Intelligence_Item', 'quotient': 0.1}];
		this.const.stats.hp.poison.affixes = [{'name': 'Resistance#Poison', 'quotient': 1}, {'name': 'Resistance_All', 'quotient': 1}, {'name': 'Intelligence_Item', 'quotient': 0.1}];
		this.const.stats.hp.cold.affixes = [{'name': 'Resistance#Cold', 'quotient': 1}, {'name': 'Resistance_All', 'quotient': 1}, {'name': 'Intelligence_Item', 'quotient': 0.1}];

		this.const.stats.hp.str.affixes = [{'name': 'Strength_Item', 'quotient': 1}];
		this.const.stats.hp.dex.affixes = [{'name': 'Dexterity_Item', 'quotient': 1}];
		this.const.stats.hp.int.affixes = [{'name': 'Intelligence_Item', 'quotient': 1}];
		this.const.stats.hp.vit.affixes = [{'name': 'Vitality_Item', 'quotient': 1}];
		
		switch (klass) {
			case 'barb' :
			break;
		}
		
	}
};

/*
["Armor_Bonus_Item", "Armor_Item", "Attacks_Per_Second_Item", "Attacks_Per_Second_Percent", "Block_Amount_Item_Delta", "Block_Amount_Item_Min", "Block_Chance_Item", "Crit_Damage_Percent", "Crit_Percent_Bonus_Capped", "CrowdControl_Reduction", "Damage_Percent_Bonus_Vs_Elites", "Damage_Percent_Reduction_From_Melee", "Damage_Weapon_Bonus_Min#Physical", "Damage_Weapon_Delta#Physical", "Damage_Weapon_Delta#Poison", "Damage_Weapon_Min#Physical", "Damage_Weapon_Min#Poison", "Damage_Weapon_Percent_Bonus#Physical", "Dexterity_Item", "Durability_Cur", "Durability_Max", "Health_Globe_Bonus_Health", "Hitpoints_On_Hit", "Hitpoints_Regen_Per_Second", "Intelligence_Item", "Resistance#Arcane", "Resistance#Cold", "Resistance#Fire", "Resistance#Lightning", "Resistance#Poison", "Resistance_All", "Resource_Max_Bonus#Arcanum", "Resource_On_Crit#Arcanum", "Sockets", "Strength_Item", "Vitality_Item"] 
  */