
BasicGame.Preloader = function (game) {
	this.background = null;
	this.preloadBar = null;
	this.ready = false;
};
BasicGame.Preloader.prototype = {
	preload: function () {
	// These are the assets we loaded in Boot.js
	// A nice sparkly background and a loading progress bar
//		this.background = this.add.sprite(0, 0, 'preloaderBackground');
//		this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');
	// This sets the preloadBar sprite as a loader sprite.
	// What that does is automatically crop the sprite from 0 to full-width
	// as the files below are loaded in.
//		this.load.setPreloadSprite(this.preloadBar);


		this.load.tilemap('map1', 'assets/tilemaps/maps/level1.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('map2', 'assets/tilemaps/maps/level2.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('platforms', 'assets/tilemaps/tilesets/cartoony_platformer/tiles_22.png');
		this.load.image('box', 'assets/tilemaps/tilesets/tiles/box.png');
		this.load.image('bricks', 'assets/tilemaps/tilesets/bricks/scraps_bricks.png');
		this.load.spritesheet('player', 'assets/spritesheets/sara/sara 16x18 source.png', 16, 18);
		this.load.spritesheet('coin', 'assets/spritesheets/coin/spin_coin_big_strip6.png', 9, 10);
		this.load.image('leprechaun', 'assets/spritesheets/surprise/leprechaun.png');
	},
	create: function () {
	// Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
//		this.preloadBar.cropEnabled = false;
	},
	update: function () {
	// You don't actually need to do this, but I find it gives a much smoother game experience.
	// Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
	// You can jump right into the menu if you want and still play the music, but you'll have a few
	// seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
	// it's best to wait for it to decode here first, then carry on.
	// If you don't have any music in your game then put the game.state.start line into the create function and delete
	// the update function completely.
/*		if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		{
			this.ready = true;
			this.state.start('MainMenu');
		}*/
		this.state.start('MainMenu');
	}
};
