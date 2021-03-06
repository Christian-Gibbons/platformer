
BasicGame.Building = function (game) {
/*
	// When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:
	this.game; // a reference to the currently running game (Phaser.Game)
	this.add; // used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
	this.camera; // a reference to the game camera (Phaser.Camera)
	this.cache; // the game cache (Phaser.Cache)
	this.input; // the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
	this.load; // for preloading assets (Phaser.Loader)
	this.math; // lots of useful common math operations (Phaser.Math)
	this.sound; // the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
	this.stage; // the game stage (Phaser.Stage)
	this.time; // the clock (Phaser.Time)
	this.tweens; // the tween manager (Phaser.TweenManager)
	this.state; // the state manager (Phaser.StateManager)
	this.world; // the game world (Phaser.World)
	this.particles; // the particle manager (Phaser.Particles)
	this.physics; // the physics manager (Phaser.Physics)
	this.rnd; // the repeatable random number generator (Phaser.RandomDataGenerator)
	// You can use any of these from any function within this State.
	// But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
*/
};

	var map;
	var backgroundLayer;
	var fringeLayer;
	var collisionLayer;

	var items;
	var doors;
	var door;

BasicGame.Building.prototype = {
	create: function () {
		this.stage.backgroundColor = '#787878';

		map = this.add.tilemap('buildingInterior');
		map.addTilesetImage('tileset_8', 'happylandTiles');
		map.addTilesetImage('tilesetformattedupdate1', 'indoorRPGTiles');

		backgroundLayer = map.createLayer('Background');
		fringeLayer = map.createLayer('Fringe');
		collisionLayer = map.createLayer('Collision');
		collisionLayer.visible = false;

		this.physics.arcade.enable(collisionLayer);
		map.setCollisionByExclusion([],true,collisionLayer);
		backgroundLayer.resizeWorld();

		createDoors(this);

		playerStart = findObjectsByType('playerStart', map, 'Objects');
		player = this.add.sprite(playerStart[0].x + playerStart[0].width/2, playerStart[0].y + playerStart[0].height/2, playerStart[0].properties.sprite);
		player.anchor.setTo(0.5,0.5);

		this.physics.arcade.enable(player);
		player.body.bounce.y = 0.0;
		player.body.gravity.y = 0;
		player.body.collideWorldBounds = true;

		//add animation here
		player.animations.add('walk_right', [9, 10, 11], 10, true);
		player.animations.add('walk_left', [27, 28, 29], 10, true);
		player.animations.add('walk_up', [0, 1, 2], 10, true);
		player.animations.add('walk_down', [18, 19, 20], 10, true);

		playerDirection = 'down';
		cursors = this.input.keyboard.createCursorKeys();
		//		jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		this.camera.follow(player);
		this.camera.deadzone = new Phaser.Rectangle(100,100,250,400);

	},
	update: function () {
		// Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
		this.physics.arcade.collide(player, collisionLayer);


		this.physics.arcade.overlap(player, doors, enterDoor, null, this);

		player.body.velocity.x = 0;
		player.body.velocity.y = 0;
		var walkSpeed = 75;
		if(cursors.down.isDown){
			player.body.velocity.y += walkSpeed;
			playerDirection = 'down';
			player.animations.play('walk_down');
		}
		else if(cursors.up.isDown){
			player.body.velocity.y -= walkSpeed;
			playerDirection = 'up';
			player.animations.play('walk_up');
		}
		if(cursors.left.isDown){
			player.body.velocity.x -= walkSpeed;
			playerDirection = 'left';
			player.animations.play('walk_left');
		}
		else if(cursors.right.isDown){
			player.body.velocity.x += walkSpeed;
			playerDirection = 'right';
			player.animations.play('walk_right');			
		}
		if(!(cursors.down.isDown || cursors.up.isDown || cursors.left.isDown || cursors.right.isDown)){
			player.animations.stop();
			player.frame = 1;
			switch(playerDirection){
				case 'right':
					player.frame += 9;
					break;
				case 'down':
					player.frame += 18;
					break;
				case 'left':
					player.frame += 27;
					break;
				default:
					break;
			}
		}

	},
	quitGame: function (pointer) {
		// Here you should destroy anything you no longer need.
		// Stop music, delete sprites, purge caches, free resources, all that good stuff.
		// Then let's go back to the main menu.
//	this.state.start('MainMenu');
	}
};
