//==
// Steal Ability MV Version 1.0a
//==

/*:
 * @plugindesc Now you can set a skill to steal items or gold!
 * @author Vlue
 *
 * @param Pickpocket Base Chance
 * @desc Base chance to for pickpocket success
 * @default 50
 *
 * @param Ability Steal Base Chance
 * @desc Base chance to copy/steal ability
 * @default 50
 *
 * @param Stolen Abilities Permanent
 * @desc If true, stolen abilities stay after battle
 * @default false
 *
 * @param Steal Item String
 * @desc Text displayed on item theft
 * @default %1 stole a %2 from %3.
 *
 * @param Steal Gold String
 * @desc Text displayed on pickpocket
 * @default %1 pickpocketed %2 %4 from %3!
 *
 * @param Steal Ability String
 * @desc Text displayed on ability theft
 * @default %1 learned %3's %2 ability!
 *
 * @param Fail Theft String
 * @desc Text displayed on failure
 * @default %1 failed to steal anything...
 *
 * @help Steal Ability MV v1.0a
 *
 *  Enemy Notetags:
 *  (id is replaced by id of item and chance is a 0-100 percent value)
 *   <steal item id chance>
 *   <steal weapon id chance>
 *   <steal armor id chance>
 *   <steal ability id>
 *   <steal gold amount>
 *
 *  Skill/Class/Actor/Equip Notetags:
 *   <steal chance bonus> - provides a bonus to steal chances (if skill, only when that skill is used)
 *   Skill Only:
 *    <steal>         - this skill steals items
 *    <pickpocket>    - this skill steals gold
 *    <steal ability> - this skill steals abilities
 *
 *  String replacements:
 *   %1 - User's name
 *   %2 - Item stolen (amount if gold)
 *   %3 - Target of theft
 *   %4 - Currency unit (gold)
 */

function Proximity() {}
 
(function() {

	var parameters = PluginManager.parameters('StealAbility');
	var pickpocketBaseChance = Number(parameters['Pickpocket Base Chance'] || 50);
	var abilityBaseChance = Number(parameters['Ability Steal Base Chance'] || 50);
	var abilityStealPerm = (parameters['Stolen Abilities Permanent'] || "false").toLowerCase() == "true";
	var stealItemString = parameters['Steal Item String'] || "%1 stole a %2 from %3.";
	var stealGoldString = parameters['Steal Gold String'] || "%1 pickpocketed %2 %4 from %3!"
	var stealAbilityString = parameters['Steal Ability String'] || "%1 learned %3's %2 ability!"
	var stealFailString = parameters['Fail Theft String'] || "%1 failed to steal anything..."

	var steal_game_enemy_initialize = Game_Enemy.prototype.initialize;
	Game_Enemy.prototype.initialize = function(id,x,y) {
		steal_game_enemy_initialize.call(this,id,x,y);
		this._steal = this.stealArray();
		this._gold = this.goldAmount();
		this._ability = this.stealAbility();
	}
	Game_Enemy.prototype.stealArray = function() {
		var steal = [];
		var note = this.enemy().note.toLowerCase();
		var items = note.match(/<steal item (\d+) (\d+)>/g);
		var weapons = note.match(/<steal weapon (\d+) (\d+)>/g);
		var armors = note.match(/<steal armor (\d+) (\d+)>/g);
		if(items) {
			for(var i = 0;i < items.length;i++) {
				var itemData = items[i].match(/<steal item (\d+) (\d+)>/);
				steal.push({type:"item",id:Number(itemData[1]),chance:Number(itemData[2])});
			}
		}
		if(weapons) {
			for(var i = 0;i < weapons.length;i++) {
				var itemData = weapons[i].match(/<steal weapon (\d+) (\d+)>/);
				steal.push({type:"weapon",id:Number(itemData[1]),chance:Number(itemData[2])});
			}
		}
		if(armors) {
			for(var i = 0;i < armors.length;i++) {
				var itemData = armors[i].match(/<steal armor (\d+) (\d+)>/);
				steal.push({type:"armor",id:Number(itemData[1]),chance:Number(itemData[2])});
			}
		}
		return steal;
	}
	Game_Enemy.prototype.goldAmount = function() {
		var amount = this.enemy().note.toLowerCase().match(/<steal gold (\d+)>/);
		return amount ? Number(amount[1]) : 0;
	}
	Game_Enemy.prototype.stealAbility = function() {
		var ability = this.enemy().note.toLowerCase().match(/<steal ability (\d+)>/);
		return ability ? Number(ability[1]) : 0;
	}
	Game_Enemy.prototype.steal = function(user, skill) {
		for(var i = 0;i < this._steal.length;i++) {
			var stealData = this._steal[i];
			if(Math.random() * 100 < stealData.chance + user.stealBonus(skill)) {
				var item = $gameParty.getContainer(stealData.type)[stealData.id];
				$gameParty.gainItem(item,1);
				stealData.chance = -1000;
				return item;
			}
		}
		return null;
	}
	Game_Enemy.prototype.pickpocket = function(user, skill) {
		if(this._gold > 0) {
			if(Math.random() * 100 < pickpocketBaseChance + user.stealBonus(skill)) {
				amount = Math.random() * this.goldAmount() / 5 * (1 + user.stealBonus(skill) / 100);
				if(amount > this._gold) { amount = this._gold; }
				this._gold -= amount;
				$gameParty.gainGold(amount);
				return amount;
			}
			return null;
		}
		return null;
	}
	Game_Enemy.prototype.getAbility = function(user, skill) {
		if(this._ability > 0) {
			if(Math.random() * 100 < abilityBaseChance + user.stealBonus(skill)) {
			
				console.log(user);
				user.addStolenAbility(this._ability);
				return this._ability;
			}
			return null;
		}
		return null;
	}
	
	BattleManager.getStealChance = function(note) {
		var chance = note.toLowerCase().match(/<steal chance (\d+)>/);
		return chance ? Number(chance[1]) : 0;
	}
	
	Game_Item.prototype.isSteal = function() {
		if(this.object()) {
			return this.object().note.toLowerCase().match(/<steal>/) ? true : false
		}
	}
	Game_Item.prototype.isPickpocket = function() {
		if(this.object()) {
			return this.object().note.toLowerCase().match(/<pickpocket>/) ? true : false
		}
	}
	Game_Item.prototype.isStealAbility = function() {
		if(this.object()) {
			return this.object().note.toLowerCase().match(/<steal ability>/) ? true : false
		}
	}
	Game_Item.prototype.getStealChance = function() {
		if(this.object()) {
			return BattleManager.getStealChance(this.object().note);
		}
		return 0;
	}
	
	Game_Actor.prototype.getStealChance = function() {
		var chance = 0;
		chance += BattleManager.getStealChance(this.actor().note);
		chance += BattleManager.getStealChance(this.currentClass().note);
		return chance;
	}
	Game_Actor.prototype.stealBonus = function(skill) {
		var bonus = skill.getStealChance();
		bonus += this.getStealChance();
		for(var i = 0;i < this._equips.length;i++) {
			var item = this._equips[i];
			if(item.isEquipItem()) {
				console.log(item.getStealChance());
				bonus += item.getStealChance();
			}
		}
		return bonus;
	}
	Game_Actor.prototype.addStolenAbility = function(skillId) {
		if(this.isLearnedSkill(skillId)) { return; }
		if(!this._stolenAbility) { this._stolenAbility = []; }
		this._stolenAbility.push(skillId);
		this.learnSkill(skillId);
	}
	Game_Actor.prototype.clearStolenAbility = function() {
		if(!abilityStealPerm && this._stolenAbility) {
			for(var i = 0;i < this._stolenAbility.length;i++) {
				this.forgetSkill(this._stolenAbility[i]);
			}
		}
	}
	var steal_game_actor_onbattleend = Game_Actor.prototype.onBattleEnd;
	Game_Actor.prototype.onBattleEnd = function() {
		steal_game_actor_onbattleend.call(this);
		this.clearStolenAbility();
	}
	
	Game_Party.prototype.getContainer = function(item) {
		if(item == "weapon") {return $dataWeapons; }
		if(item == "armor") {return $dataArmors; }
		if(item == "item") {return $dataItems; }
		return [];
	}
	
	var steal_game_action_apply = Game_Action.prototype.apply;
	Game_Action.prototype.apply = function(target) {
		steal_game_action_apply.call(this, target);
		if(target.result().isHit()) {
			var stolenItem = null;
			var stolenGold = null;
			var stolenAbility = null;
			var item = new Game_Item(this.item());
			if(item.isSteal()) {
				stolenItem = target.steal(this.subject(),item);
				this.makeSuccess(target);
			}
			console.log(stolenItem);
			if(item.isPickpocket()) {
				stolenGold = Math.floor(target.pickpocket(this.subject(),item));
				console.log(stolenGold);
				this.makeSuccess(target);
			}
			if(item.isStealAbility()) {
				stolenAbility = target.getAbility(this.subject(),item);
				this.makeSuccess(target);
			}
			var logWindow = BattleManager._logWindow;
			if(stolenItem) {
				logWindow.displayTheft(this.subject(),target,stolenItem);
			}
			if(stolenGold) {
				logWindow.displayPickpocket(this.subject(),target,stolenGold);
			}
			if(stolenAbility) {
				logWindow.displayAbilityTheft(this.subject(),target,stolenAbility);
			}
			if(item.isSteal() || item.isPickpocket() || item.isStealAbility()) {
				if(!stolenItem && !stolenGold && !stolenAbility) {
					logWindow.displayTheftFail(this.subject(),target);
				}
			}
		}
	}
	
	Window_BattleLog.prototype.displayTheft = function(user, target, item) {
		this.push('addText', this.parseTheftText(stealItemString, user, target, item));
		this.push('waitForNewLine');
	}
	Window_BattleLog.prototype.displayTheftFail = function(user, target) {
		this.push('addText', this.parseTheftText(stealFailString, user, target));
		this.push('waitForNewLine');
	}
	Window_BattleLog.prototype.displayPickpocket = function(user, target, gold) {
		this.push('addText', this.parseTheftText(stealGoldString, user, target, gold));
		this.push('waitForNewLine');
	}
	Window_BattleLog.prototype.displayAbilityTheft = function(user, target, item) {
		this.push('addText', this.parseTheftText(stealAbilityString, user, target, $dataSkills[item]));
		this.push('waitForNewLine');
	}
	Window_BattleLog.prototype.parseTheftText = function(text, user, target, item) {
		text = text.replace("%1", user.name());
		text = text.replace("%2", (item && isNaN(item)) ? item.name : item);
		text = text.replace("%3", target.name());
		text = text.replace("%4", TextManager.currencyUnit);
		return text;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})();