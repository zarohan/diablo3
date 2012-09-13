var Profile = {
	'data': false,
	'heroes': false,
	'getHeroesIds':
		function ()
		{
			if (this.heroes !== false) {
				return this.heroes;
			}
			this.heroes = {};
			for (var i = 0; i < this.data.heroes.length; i++) {
				this.heroes[this.data.heroes[i].name] = this.data.heroes[i].id;
			}
			return this.heroes;
		}
};