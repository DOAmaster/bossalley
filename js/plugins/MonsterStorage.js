var COLD = COLD || {};

COLD.BREED = COLD.BREED || {};

COLD.Param = COLD.Param || {};

 /*:
 * @plugindesc Makes a monster/actor storage box system.
 * @author Jeremy Cannady
 *
 * @help
 * Version 1.0, This plugin makes a monster/actor storage box system.
 * Plugin command of "openMonsterBox" to initiate. 
 *
*/

(function(){	
	var openMonsterBox_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		openMonsterBox_pluginCommand.call(this, command, args);
		if (command === "openMonsterBox") {
			SceneManager.push(COLD.BREED.Scene_Breed_Select)
		};
	};

	/**
    * Create an array that holds the currently deposited actors.
	* Hook it into the Game_System initialize.
    */
	COLD.BREED.GSytemI = Game_System.prototype.initialize;
	Game_System.prototype.initialize = function() {
		COLD.BREED.GSytemI.call(this);
		this.depositedActors = [];
	};

	/**
    * Create window of party members.
    */
	COLD.BREED.partyWindow = function() {
		this.initialize.apply(this, arguments);
	};

	COLD.BREED.partyWindow.prototype = Object.create(Window_Selectable.prototype);
	COLD.BREED.partyWindow.prototype.constructor = COLD.BREED.partyWindow;

	COLD.BREED.partyWindow.prototype.initialize = function(x, y) {
		Window_Selectable.prototype.initialize.call(this, x, y, this.windowWidth(), this.windowHeight());
		this.preloadImages();
		this.select(0);
	};
	
	COLD.BREED.partyWindow.prototype.preloadImages = function(){
		for(var i = 0; i < $gameParty.members().length; i++){
			var bitmap = ImageManager.loadCharacter($gameParty.members()[i]._characterName);
			bitmap.addLoadListener(function() {this.refresh()}.bind(this));
		};
	};
	
	COLD.BREED.partyWindow.prototype.drawItem = function(index) {
		this.drawActorList(index);
		this.drawWindowTitle();
	};

	COLD.BREED.partyWindow.prototype.drawWindowTitle = function(){
		this.drawText("Party", 0, 0, this.windowWidth() - this.standardPadding() * 2, 'center');
	};
	
	COLD.BREED.partyWindow.prototype.drawActorList = function(index) {
		var rect = this.itemRect(index);
		var actor = $gameParty.members()[index];
		this.drawCharacter(actor._characterName, actor._characterIndex, rect.x + 48 / 2, rect.y + 48);
	};

	COLD.BREED.partyWindow.prototype.itemRect = function(index) {
		var rect = new Rectangle();
		var maxCols = this.maxCols();
		rect.width = this.itemWidth();
		rect.height = this.itemHeight();
		rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX;
		rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY + this.lineHeight();
		return rect;
	};
	
	COLD.BREED.partyWindow.prototype.windowWidth = function(){
		return this.standardPadding() * 5 + 48 * this.maxCols();
	};

	COLD.BREED.partyWindow.prototype.windowHeight = function(){
		return this.standardPadding() * 5 + 48 * this.numVisibleRows();
	};

	COLD.BREED.partyWindow.prototype.maxItems = function() {
		return $gameParty.members().length;
	};

	COLD.BREED.partyWindow.prototype.itemHeight = function() {
		return 48 + this.spacing() / 2;
	};

	COLD.BREED.partyWindow.prototype.itemWidth = function() {
		return 48 + this.spacing() / 2;
	};

	COLD.BREED.partyWindow.prototype.numVisibleRows = function() {
		return 4;
	};

	COLD.BREED.partyWindow.prototype.spacing = function() {
		return this.standardPadding() / 2;
	};

	COLD.BREED.partyWindow.prototype.maxCols = function() {
		return 4;
	};

	COLD.BREED.partyWindow.prototype.selectLast = function() {
		this.select(0);
	};

	/**
    * Create the window of deposited actors.
    */
	COLD.BREED.depositedWindow = function() {
		this.initialize.apply(this, arguments);
	};

	COLD.BREED.depositedWindow.prototype = Object.create(Window_Selectable.prototype);
	COLD.BREED.depositedWindow.prototype.constructor = COLD.BREED.depositedWindow;

	COLD.BREED.depositedWindow.prototype.initialize = function(x, y) {
		Window_Selectable.prototype.initialize.call(this, x, y, this.windowWidth(), this.windowHeight());
		this.preloadImages();
		this.select(0);
		
		this.refresh();
	};
	
	COLD.BREED.depositedWindow.prototype.preloadImages = function(){
		for(var i = 0; i < $gameSystem.depositedActors.length; i++){
			var bitmap = ImageManager.loadCharacter($gameActors.actor($gameSystem.depositedActors[i])._characterName);
			bitmap.addLoadListener(function() {this.refresh()}.bind(this));
		};
	};

	COLD.BREED.depositedWindow.prototype.drawItem = function(index) {
		this.drawActorList(index);
		this.drawWindowTitle();
	};

	COLD.BREED.depositedWindow.prototype.drawWindowTitle = function(){
		this.drawText("Deposited", 0, 0, this.windowWidth() - 2 * this.standardPadding(), 'center');
	};
	
	COLD.BREED.depositedWindow.prototype.drawActorList = function(index) {
		var rect = this.itemRect(index);
		if($gameSystem.depositedActors.length > 0){
			var actor = $gameActors.actor($gameSystem.depositedActors[index]);
			this.drawCharacter(actor._characterName, actor._characterIndex, rect.x + 48 / 2, rect.y + 48);
		};
	};

	COLD.BREED.depositedWindow.prototype.itemRect = function(index) {
		var rect = new Rectangle();
		var maxCols = this.maxCols();
		rect.width = this.itemWidth();
		rect.height = this.itemHeight();
		rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX;
		rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY + this.lineHeight();
		return rect;
	};
	
	COLD.BREED.depositedWindow.prototype.windowWidth = function(){
		return this.standardPadding() * 5 + 48 * this.maxCols();
	};

	COLD.BREED.depositedWindow.prototype.windowHeight = function(){
		return this.standardPadding() * 5 + 48 * this.numVisibleRows();
	};

	COLD.BREED.depositedWindow.prototype.maxItems = function() {
		return $gameSystem.depositedActors.length || 1;
	};

	COLD.BREED.depositedWindow.prototype.itemHeight = function() {
		return 48 + this.spacing() / 2;
	};

	COLD.BREED.depositedWindow.prototype.itemWidth = function() {
		return 48 + this.spacing() / 2;
	};

	COLD.BREED.depositedWindow.prototype.numVisibleRows = function() {
		return 4;
	};

	COLD.BREED.depositedWindow.prototype.spacing = function() {
		return this.standardPadding() / 2;
	};

	COLD.BREED.depositedWindow.prototype.maxCols = function() {
		return 4;
	};

	COLD.BREED.depositedWindow.prototype.selectLast = function() {
		this.select(0);
	};
	
	/**
    * Create the details window.
    */
	COLD.BREED.detailsWindow = function(){
		this.initialize.apply(this, arguments);
	}

	COLD.BREED.detailsWindow.prototype = Object.create(Window_Selectable.prototype);
	COLD.BREED.detailsWindow.prototype.constructor = COLD.BREED.detailsWindow;

	COLD.BREED.detailsWindow.prototype.initialize = function(x, y) {
		Window_Selectable.prototype.initialize.call(this, x, y, this.windowWidth(), this.windowHeight());
		this.preloadImages();
	};
	
	COLD.BREED.detailsWindow.prototype.preloadImages = function(){
		for(var i = 0; i < $gameSystem.depositedActors.length; i++){
			var faceName = $gameActors.actor($gameSystem.depositedActors[i]).faceName();
			var bitmap = ImageManager.loadFace(faceName);
			bitmap.addLoadListener(function() {this.refresh()}.bind(this));
		};
		for(var i = 0; i < $gameParty.members().length; i++){
			var faceName = $gameParty.members()[i].faceName();
			var bitmap = ImageManager.loadFace(faceName);
			bitmap.addLoadListener(function() {this.refresh()}.bind(this));
		};
	};
	
	COLD.BREED.detailsWindow.prototype.windowWidth = function(){
		return 282;
	};

	COLD.BREED.detailsWindow.prototype.windowHeight = function(){
		return 282;
	};
	
	COLD.BREED.detailsWindow.prototype.drawAllItems = function() {
		if(this.currentActorId){
			this.drawDetails(this.currentActorId);
		};
	};
	
	COLD.BREED.detailsWindow.prototype.currentActorId = null;
	
	COLD.BREED.detailsWindow.prototype.drawDetails = function(actorId){
		var actor = $gameActors.actor(actorId);
		this.drawText(actor._name, 0, 0, this.windowWidth() - this.standardPadding() * 2, 'center');
		this.drawText($dataClasses[actor._classId].name, 0, this.lineHeight(), this.windowWidth()- this.standardPadding()*2,'center');
		this.drawText($dataSystem.terms.basic[1] + actor._level, 0, this.lineHeight() * 2, this.windowWidth()- this.standardPadding()*2,'center');	
		this.drawActorFace(actor, (this.windowWidth()-Window_Base._faceWidth)/2 - this.standardPadding(), this.lineHeight() * 3, Window_Base._faceWidth, Window_Base._faceHeight);
	};
	
	/**
    * Create the main menu for selecting:
	* Deposit, withdraw, and cancel commands.
    */
	COLD.BREED.mainMenu = function(){
		this.initialize.apply(this, arguments);
	}

	COLD.BREED.mainMenu.prototype = Object.create(Window_Command.prototype);
	COLD.BREED.mainMenu.prototype.constructor = COLD.BREED.mainMenu;

	COLD.BREED.mainMenu.prototype.initialize = function(x, y) {
		Window_Command.prototype.initialize.call(this, x, y);
		this.selectLast();
	};

	COLD.BREED.mainMenu.prototype._lastCommandSymbol = null;

	COLD.BREED.mainMenu.prototype.initCommandPosition = function() {
		this._lastCommandSymbol = null;
	};

	COLD.BREED.mainMenu.prototype.windowWidth = function() {
		return 200;
	};

	COLD.BREED.mainMenu.prototype.numVisibleRows = function() {
		return this.maxItems();
	};

	COLD.BREED.mainMenu.prototype.makeCommandList = function() {
		this.addMainCommands();
	};

	COLD.BREED.mainMenu.prototype.addMainCommands = function() {
		this.addCommand('Deposit', 'deposit', ($gameParty.members().length > 1));
		this.addCommand('Withdraw', 'withdraw', ($gameSystem.depositedActors.length > 0));
		this.addCommand('Cancel', ' cancel', true);
	};

	COLD.BREED.mainMenu.prototype.processOk = function() {
		COLD.BREED.mainMenu._lastCommandSymbol = this.currentSymbol();
		Window_Command.prototype.processOk.call(this);
	};

	COLD.BREED.mainMenu.prototype.selectLast = function() {
		this.selectSymbol(COLD.BREED.mainMenu._lastCommandSymbol);
	};
	
	/**
    * Create the main menu for selecting:
	* Deposit || withdraw, details, and cancel commands.
    */
	COLD.BREED.detailsMenu = function(){
		this.initialize.apply(this, arguments);
	}

	COLD.BREED.detailsMenu.prototype = Object.create(Window_Command.prototype);
	COLD.BREED.detailsMenu.prototype.constructor = COLD.BREED.detailsMenu;

	COLD.BREED.detailsMenu.prototype.initialize = function(x, y) {
		Window_Command.prototype.initialize.call(this, x, y);
		this.selectLast();
	};

	COLD.BREED.detailsMenu.prototype._lastCommandSymbol = null;

	COLD.BREED.detailsMenu.prototype.initCommandPosition = function() {
		this._lastCommandSymbol = null;
	};

	COLD.BREED.detailsMenu.prototype.windowWidth = function() {
		return 200;
	};

	COLD.BREED.detailsMenu.prototype.numVisibleRows = function() {
		return this.maxItems();
	};

	COLD.BREED.detailsMenu.prototype.makeCommandList = function() {
		this.addMainCommands();
	};
	
	COLD.BREED.detailsMenu.prototype.command = null;
	
	COLD.BREED.detailsMenu.prototype.addMainCommands = function() {
		if(this.command == 'deposit'){
			this.addCommand('Deposit', 'deposit', ($gameParty.members().length > 1));
		}else if(this.command == 'withdraw'){
			this.addCommand('Withdraw', 'withdraw', ($gameSystem.depositedActors.length > 0));
		}else{
			this.addCommand('Null', 'null', true);
		};
		this.addCommand('Details', 'details', true);
		this.addCommand('Cancel', ' cancel', true);
	};

	COLD.BREED.detailsMenu.prototype.processOk = function() {
		COLD.BREED.detailsMenu._lastCommandSymbol = this.currentSymbol();
		Window_Command.prototype.processOk.call(this);
	};

	COLD.BREED.detailsMenu.prototype.selectLast = function() {
		this.selectSymbol(COLD.BREED.detailsMenu._lastCommandSymbol);
	};
	
	/**
	* Create a monster storage box
	*/

	COLD.BREED.Scene_Breed_Select = function() {
		this.initialize.apply(this, arguments);
	}

	COLD.BREED.Scene_Breed_Select.prototype = Object.create(Scene_MenuBase.prototype);
	COLD.BREED.Scene_Breed_Select.prototype.constructor = COLD.BREED.Scene_Breed_Select;

	COLD.BREED.Scene_Breed_Select.prototype.initialize = function() {
		Scene_MenuBase.prototype.initialize.call(this);
	};
	COLD.BREED.Scene_Breed_Select.prototype.create = function() {
		Scene_MenuBase.prototype.create.call(this);
		this.createWindowLayer();
		this.createAllWindows();
	};
	
	COLD.BREED.Scene_Breed_Select.prototype.createAllWindows = function() {
		this.createMenu();
		this.createDetailsMenu();
		this.createActorWindow();
		this.createDepositedWindow();
		this.createDDetails();
		this.createPDetails();
	};
	
	COLD.BREED.Scene_Breed_Select.prototype.createActorWindow = function() {
		var x = Graphics.width - COLD.BREED.partyWindow.prototype.windowWidth();
		this._actorWindow = new COLD.BREED.partyWindow(x, 0);
		this._actorWindow.setHandler('ok', this.activateDetails.bind(this));
		this._actorWindow.setHandler('cancel', this.onDepositCancel.bind(this));
		this.addWindow(this._actorWindow);
		this._actorWindow.deactivate();
	};
	
	COLD.BREED.Scene_Breed_Select.prototype.createDepositedWindow = function() {
		var x = Graphics.width - COLD.BREED.partyWindow.prototype.windowWidth();
		var y = COLD.BREED.partyWindow.prototype.windowHeight()
		this._depositedWindow = new COLD.BREED.depositedWindow(x, y);
		this._depositedWindow.setHandler('ok', this.activateDetails.bind(this));
		this._depositedWindow.setHandler('cancel', this.onWithdrawCancel.bind(this));
		this.addWindow(this._depositedWindow);
		this._depositedWindow.deactivate();
	};
	
	COLD.BREED.Scene_Breed_Select.prototype.createMenu = function() {
		var x = Graphics.width - COLD.BREED.partyWindow.prototype.windowWidth() - COLD.BREED.mainMenu.prototype.windowWidth();
		this._menuWindow = new COLD.BREED.mainMenu(x, 0);
		this._menuWindow.setHandler('deposit', this.activateDeposit.bind(this));
		this._menuWindow.setHandler('withdraw', this.activateWithdraw.bind(this));
		this._menuWindow.setHandler('cancel', this.onSceneCancel.bind(this));
		this.addWindow(this._menuWindow);
		this._menuWindow.activate();
	};
	
	COLD.BREED.Scene_Breed_Select.prototype.createDetailsMenu = function() {
		var x = Graphics.width - COLD.BREED.partyWindow.prototype.windowWidth() - COLD.BREED.mainMenu.prototype.windowWidth();
		this._detailsMenu = new COLD.BREED.detailsMenu(x, 0);
		this._detailsMenu.setHandler('deposit', this.choseDeposit.bind(this));
		this._detailsMenu.setHandler('withdraw', this.choseWithdraw.bind(this));
		this._detailsMenu.setHandler('details', this.activateDetailsW.bind(this));
		this._detailsMenu.setHandler('cancel', this.cancelDetailsMenu.bind(this));
		this.addWindow(this._detailsMenu);
		this._detailsMenu.deactivate();
		this._detailsMenu.hide();
	};
	
	COLD.BREED.Scene_Breed_Select.prototype.createPDetails = function() {
		var x =Graphics.width - COLD.BREED.partyWindow.prototype.windowWidth();
		var y = 0;
		var width = COLD.BREED.partyWindow.prototype.windowWidth();
		var height = COLD.BREED.partyWindow.prototype.windowHeight();
		this._partyDetails = new COLD.BREED.detailsWindow(x, y, width, height);
		this._partyDetails.setHandler('ok', this.closeDetails.bind(this));
		this._partyDetails.setHandler('cancel', this.closeDetails.bind(this));
		this.addWindow(this._partyDetails);
		this._partyDetails.hide();
		this._partyDetails.deactivate();
	};
	
	COLD.BREED.Scene_Breed_Select.prototype.createDDetails = function() {
		var x = Graphics.width - COLD.BREED.partyWindow.prototype.windowWidth();
		var y = COLD.BREED.partyWindow.prototype.windowHeight();
		var width = COLD.BREED.depositedWindow.prototype.windowWidth();
		var height = COLD.BREED.depositedWindow.prototype.windowHeight();
		this._depositedDetails = new COLD.BREED.detailsWindow(x, y, width, height);
		this._depositedDetails.setHandler('ok', this.closeDetails.bind(this));
		this._depositedDetails.setHandler('cancel', this.closeDetails.bind(this));
		this.addWindow(this._depositedDetails);
		this._depositedDetails.hide();
		this._depositedDetails.deactivate();
	};
	
	COLD.BREED.Scene_Breed_Select.prototype.activateDetails = function(){
		this._detailsMenu.command = this._menuWindow.currentSymbol();
		this._menuWindow.deactivate();
		this._menuWindow.hide();
		this._detailsMenu.refresh();
		this._detailsMenu.activate();
		this._detailsMenu.show();
	};
	
	COLD.BREED.Scene_Breed_Select.prototype.activateDetailsW = function(){
		switch(this._menuWindow.currentSymbol()){
			case 'deposit':
				this._partyDetails.currentActorId = $gameParty.members()[this._actorWindow.index()]._actorId;
				this._partyDetails.refresh();
				this._actorWindow.hide();
				this._partyDetails.show();
				this._partyDetails.activate();
				break;
			case 'withdraw':
				this._depositedDetails.currentActorId = $gameSystem.depositedActors[this._depositedWindow.index()]
				this._depositedDetails.refresh();
				this._depositedWindow.hide();
				this._depositedDetails.show();
				this._depositedDetails.activate();
				break;
		};
	};
	
		COLD.BREED.Scene_Breed_Select.prototype.closeDetails = function(){
		switch(this._menuWindow.currentSymbol()){
			case 'deposit':
				this._partyDetails.deactivate();
				this._partyDetails.hide()
				this._detailsMenu.activate();
				this._actorWindow.show();
				break;
			case 'withdraw':
				this._depositedDetails.deactivate();
				this._depositedDetails.hide()
				this._detailsMenu.activate();
				this._depositedWindow.show();
				break;
		};
	};
	
	COLD.BREED.Scene_Breed_Select.prototype.cancelDetailsMenu = function(){
		switch(this._menuWindow.currentSymbol()){
			case 'deposit':
				this._detailsMenu.deactivate();
				this._detailsMenu.hide();
				this._menuWindow.show();
				this._actorWindow.activate();
				break;
			case 'withdraw':
				this._detailsMenu.deactivate();
				this._detailsMenu.hide();
				this._menuWindow.show();
				this._depositedWindow.activate();
				break;
		};
	};
	
	COLD.BREED.Scene_Breed_Select.prototype.activateDeposit = function(){
		this._menuWindow.deactivate();
		this._actorWindow.activate();
	};
	
	COLD.BREED.Scene_Breed_Select.prototype.activateWithdraw = function(){
		this._menuWindow.deactivate();
		this._depositedWindow.activate();
	}
	
	COLD.BREED.Scene_Breed_Select.prototype.onDepositCancel = function(){
		this._menuWindow.activate();
		this._actorWindow.deactivate();
		this.popScene();
	};
	
	COLD.BREED.Scene_Breed_Select.prototype.onWithdrawCancel = function(){
		this._menuWindow.activate();
		this._menuWindow.refresh();
		this._depositedWindow.deactivate();
	};
	
	COLD.BREED.Scene_Breed_Select.prototype.choseDeposit = function(){
		this._detailsMenu.deactivate();
		this._detailsMenu.hide();
		this._menuWindow.show();
		if($gameParty.members().length > 1){
			$gameSystem.depositedActors.push($gameParty.members()[this._actorWindow.index()]._actorId)
			$gameParty.removeActor($gameParty.members()[this._actorWindow.index()]._actorId);
			this._actorWindow.selectLast();
			this._actorWindow.activate();
		}else{
			this._actorWindow.deactivate();
			this._menuWindow.activate();
		};
		this.refreshAll();
	};
	
	COLD.BREED.Scene_Breed_Select.prototype.choseWithdraw = function(){
		this._detailsMenu.deactivate();
		this._detailsMenu.hide();
		this._menuWindow.show();
		if($gameSystem.depositedActors.length > 0){
			var actorId = $gameSystem.depositedActors[this._depositedWindow.index()];
			$gameParty.addActor(actorId);
			$gameSystem.depositedActors.splice(this._depositedWindow.index(), 1);
			this._depositedWindow.selectLast();
			this._depositedWindow.activate();
		}else{
			this._depositedWindow.deactivate();
			this._menuWindow.activate();
		}
		this.refreshAll();
	};
	
	COLD.BREED.Scene_Breed_Select.prototype.refreshAll = function(){
		this._actorWindow.refresh();
		this._menuWindow.refresh();
		this._depositedWindow.refresh();
	};
	
	COLD.BREED.Scene_Breed_Select.prototype.onSceneCancel = function(){
		this.popScene();
	};
	
})();