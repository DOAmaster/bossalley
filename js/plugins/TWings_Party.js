//=============================================================================
// TWings Plugins
// TWings_Party.js
//=============================================================================

/*:
 * @plugindesc v1.10 (MV 1.5+) Create a Party management window
 * @author TWings (Pierre-Alain Huille)
 *
 * @param pMode
 * @type select
 * @text Party Type
 * @desc Type of party : Suikoden-like or default.
 * @option Suikoden
 * @value 1
 * @option Free
 * @value 2
 * @default 1
 *
 * @param DispTexts
 * @text Texts
 *
 * @param cmdName
 * @parent DispTexts 
 * @type text
 * @text Menu command name
 * @desc Name in the menu.
 * @default Tavern
 *
 * @param txtSwitch
 * @parent DispTexts  
 * @type text
 * @text Switch command
 * @desc Switch command text.
 * @default Switch
 *
 * @param txtRemove
 * @parent DispTexts  
 * @type text
 * @text Remove command
 * @desc Remove command text.
 * @default Remove 
 *
 * @param CharsParams
 * @text Characters 
 *
 * @param CharRoster
 * @parent CharsParams  
 * @type struct<CharRoster>[]
 * @text Party
 * @desc List of all actors able to join the party.
 *
 * @param WinParams
 * @text Windows
 *
 * @param cmdDisplaySwitchId
 * @parent WinParams  
 * @type switch
 * @text Menu access switch
 * @desc Specified switch controls Menu access.
 * @default 0
 *
 * @param detailStat
 * @parent WinParams  
 * @type select
 * @text Status Display
 * @desc Type of display.
 * @option Simple
 * @value 1
 * @option Detailed
 * @value 2
 * @option Portraits
 * @value 3
 * @default 2
 *
 * @param wWidth
 * @parent WinParams 
 * @type number
 * @min 816
 * @text Window width
 * @desc Width of the upper window.
 * @default 816
 *
 * @param wHeight
 * @parent WinParams  
 * @type number
 * @min 624
 * @text Window height
 * @desc Height of the upper window.
 * @default 624 
 *
 *
 * @help
 * Free to use with proper credit for non-commercial games.
 * Contact me for commercial games : Discord https://discord.gg/m85SkuY
 * 
 * --------------------------------------------------------------------------------
 *
 * This plugin create a new menu that allows to manage your party.
 * It's inspired from the Suikoden games Tavern.
 * You can choose which character to include.
 *
 * If you're also using my Characters List pluginn,
 * this plugin must be placed after it.
 *
 * This plugin requires to be properly parametered to work :
 *
 * - You need to define the Party with at least the following param :
 *   + Actor : refers to the actors from the database.
 * 
 * --------------------------------------------------------------------------------
 * 
 * Plugin Commands:
 *
 * --------------------------------------------------------------------------------
 *  
 * openPartyList
 * Directly open the Party window.
 *
 * preloadPartyPics
 * Preloads the characters sprites.
 * To use before openPartyList if you notice some pictures missing.
 * You'll also want to add a wait command between the two commands.
 *
 * Use example : 
 *           preloadPartyPics
 *           wait 15
 *           openPartyList
 *
 * partyLockActor x
 * Prevent actor x from beeing removed from the party.
 * Example :
 *          partyLockActor 1
 *          The actor id 1 from the databse will be locked into the party.
 *
 * partyLockClear 
 * Clear all current party locks.
 * 
 * --------------------------------------------------------------------------------
 *
 * Parameters:
 *
 * --------------------------------------------------------------------------------
 *
 * - Party Type :
 *   Defines the type of party system.
 *   Suikoden : Similarto the Suikoden games (party restricted to battle members).
 *   Free : Allow non battle members in the party.
 *
 * - Texts :
 * Customise some of the plugin's default texts.
 *   - Menu command name :
 *   Name of the command used to access the feature in the pause menu. 
 *   - Switch command :
 *   Name of the command used to switch characters. 
 *   - Remove command :
 *   Name of the command used to remove characters.   
 *
 * - Characters :
 * Parameters used to define your characters list.
 *   - Party :
 *   Core of the plugin. You need to properly define all the relevant actors here.
 *   Every actor you wish to manage through the Party menu should be added here.
 *     - Actor : 
 *     Actor from the database. This is a required parameter !
 *     - Found Switch : 
 *     When this switch is ON, unlock the character availibility.
 *     if none, the character is available by default.
 *
 * - Windows :
 * Customise some of the plugin's default texts.
 *   - Menu access switch :
 *   Switch to use to enable/disable access in the pause menu.
 *   - Status Display :
 *   Simple : The party display is minimal with only sprites and names.
 *   Detailed : More informations will be displayed next to each actor's name.
 *   Portraits : Detailed display with portraits instead of sprites.
 *   - Window width :
 *   Width of the party list windows.
 *   - Window height :
 *   Height of the party list windows. 
 * 
 * --------------------------------------------------------------------------------
 *
 * Versions history :
 *
 * -------------------------------------------------------------------------------- 
 *
 * - Version 1.10 : 
 *      + New Free mode.
 *      + New Actor lock plugin command.
 *      + New Portrait display mode.
 *      + Fixed a bug with the actor names display.
 *      + Fixed a bug Yanfly Party System. 
 *
 * - Version 1.00 : 
 *      + Release.
 */
/*~struct~CharRoster:
 * @param charId
 * @type actor
 * @text Actor
 * @default 1
 * @desc Actor to include.
 * @param charSwitch
 * @type switch
 * @default 0
 * @text Found Switch
 * @desc Switch to indicate this character is available (if none, available by default)
 */

var Imported=Imported||{},TW=TW||{};function TW_actorTracker(t,i){this.id=t,this.swValue=i}function TW_Roster(){this.charList=Array(),this.nbChars=0,this.addChar=function(t,i){this.charList[this.nbChars]=new TW_actorTracker(t,i),this.nbChars++},this.getHeroList=function(){for(var t=Array(),i=0;i<this.nbChars;i++){var a=this.charList[i];2==TW.party.pMode?$gameParty.members().contains($gameActors.actor(a.id))||0!=a.swValue&&!$gameSwitches.value(a.swValue)||t.push(this.charList[i]):$gameParty.battleMembers().contains($gameActors.actor(a.id))||0!=a.swValue&&!$gameSwitches.value(a.swValue)||t.push(this.charList[i])}return t},this.getLength=function(){return this.nbChars}}TW.party=TW.party||{},TW.windows=TW.windows||{},TW.windows.TWParty=TW.windows.TWParty||{},TW.party.params=PluginManager.parameters("TWings_Party"),TW.windows.TWParty.cmdDisplaySwitchId=Number(TW.party.params.cmdDisplaySwitchId||1),TW.windows.TWParty.cmdName=String(TW.party.params.cmdName||"Tavern"),TW.windows.TWParty.txtSwitch=String(TW.party.params.txtSwitch||"Switch"),TW.windows.TWParty.txtRemove=String(TW.party.params.txtRemove||"Remove"),TW.windows.TWParty.detailStat=Number(TW.party.params.detailStat),TW.windows.TWParty.wWidth=Number(TW.party.params.wWidth||816),TW.windows.TWParty.wHeight=Number(TW.party.params.wHeight||624),TW.party.pMode=Number(TW.party.params.pMode),TW.party.aCharPool=JSON.parse(TW.party.params.CharRoster),TW.party.poolLength=TW.party.aCharPool.length,TW.party.charPool=new TW_Roster;for(var i=0;i<TW.party.poolLength;i++){var charPoolEntry=JSON.parse(TW.party.aCharPool[i]);TW.party.charPool.addChar(charPoolEntry.charId,charPoolEntry.charSwitch)}function Scene_TWParty(){this.initialize.apply(this,arguments)}function Window_TWPartyCommand(){this.initialize.apply(this,arguments)}function Window_TWActiveParty(){this.initialize.apply(this,arguments)}function Window_TWRoster(){this.initialize.apply(this,arguments)}TW.party.params=!0,TW.party.aCharPool=[],TW.party.locks=Array(),TW.party.Game_Interpreter_pluginCommand=Game_Interpreter.prototype.pluginCommand,Game_Interpreter.prototype.pluginCommand=function(t,i){TW.party.Game_Interpreter_pluginCommand.call(this,t,i),"preloadPartyPics"===t&&TW.preLoad(),"openPartyList"===t&&SceneManager.push(Scene_TWParty),"partyLockActor"===t&&(TW.party.locks[Number(i[0])]=1),"partyLockClear"===t&&(TW.party.locks=Array())},Window_Base.prototype.reserveFaceImages=function(){TW.preLoad()},TW.preLoad=TW.preLoad||function(){$gameActors._data.forEach(function(t){null!=t&&(ImageManager.loadFace(t.faceName()),ImageManager.loadCharacter(t.characterName()))},this)},Scene_Menu.prototype.commandTWCharList=function(){SceneManager.push(Scene_TWParty)},TW.windows.TWParty.Scene_Menu_createCommandWindow=Scene_Menu.prototype.createCommandWindow,Scene_Menu.prototype.createCommandWindow=function(){TW.windows.TWParty.Scene_Menu_createCommandWindow.call(this),$gameSwitches.value(TW.windows.TWParty.cmdDisplaySwitchId)&&this._commandWindow.setHandler("TWParty",this.commandTWCharList.bind(this))},TW.windows.TWParty.Window_MenuCommand_addOriginalCommands=Window_MenuCommand.prototype.addOriginalCommands,Window_MenuCommand.prototype.addOriginalCommands=function(){TW.windows.TWParty.Window_MenuCommand_addOriginalCommands.call(this),$gameSwitches.value(TW.windows.TWParty.cmdDisplaySwitchId)&&this.addTWPartyCommand()},Window_MenuCommand.prototype.addTWPartyCommand=function(){this.needsCommand("TWParty")&&this.addCommand(TW.windows.TWParty.cmdName,"TWParty",!0)},Scene_TWParty.prototype=Object.create(Scene_MenuBase.prototype),Scene_TWParty.prototype.constructor=Scene_TWParty,Scene_TWParty.prototype.initialize=function(){Scene_MenuBase.prototype.initialize.call(this)},Scene_TWParty.prototype.create=function(){Scene_MenuBase.prototype.create.call(this),this.createCommandWindow(),this.createListWindow(),this.createDetailWindow()},Scene_TWParty.prototype.createCommandWindow=function(){this._commandWindow=new Window_TWPartyCommand,this._commandWindow.setHandler("switch",this.commandChoice.bind(this,1)),this._commandWindow.setHandler("remove",this.commandChoice.bind(this,2)),this._commandWindow.setHandler("cancel",this.popScene.bind(this)),this.addWindow(this._commandWindow)},Scene_TWParty.prototype.createListWindow=function(){var t=this._commandWindow.height,i=(TW.windows.TWParty.wHeight?TW.windows.TWParty.wHeight:Graphics.boxHeight)-t;this._listWindow=new Window_TWActiveParty(t,i),this._listWindow.setHandler("ok",this.partyChange.bind(this)),this._listWindow.setHandler("cancel",this.cancelPartyWindow.bind(this)),this.addWindow(this._listWindow)},Scene_TWParty.prototype.createDetailWindow=function(){var t=this._listWindow.width,i=this._commandWindow.height,a=this._listWindow.width,e=this._listWindow.height;this._detailWindow=new Window_TWRoster(t,i,a,e),this._detailWindow.setHandler("ok",this.partySwitch.bind(this)),this._detailWindow.setHandler("cancel",this.cancelDetailWindow.bind(this)),this._listWindow.setDetailWindow(this._detailWindow),this.addWindow(this._detailWindow)},Scene_TWParty.prototype.start=function(){Scene_MenuBase.prototype.start.call(this)},Scene_TWParty.prototype.activatePartyWindow=function(t){this._listWindow.setAction(t),this._listWindow.activate(),this._listWindow.select(0)},Scene_TWParty.prototype.partyChange=function(){1==this._listWindow._action?this._detailWindow.activate():(2==TW.party.pMode?$gameParty.removeActor($gameParty.members()[this._listWindow.index()]._actorId):$gameParty.removeActor($gameParty.battleMembers()[this._listWindow.index()]._actorId),this.cancelPartyWindow(),this._listWindow.refresh(),this._detailWindow.refresh())},Scene_TWParty.prototype.partySwitch=function(){$gameParty._actors[this._listWindow.index()]=Number(this._detailWindow._roster[this._detailWindow.index()].id),Imported.YEP_PartySystem&&$gameParty.initializeBattleMembers(),$gamePlayer.refresh(),$gameMap.requestRefresh(),this._detailWindow.refresh(),this.cancelDetailWindow(),this._listWindow.refresh(),this._listWindow.activate()},Scene_TWParty.prototype.cancelPartyWindow=function(t){this._listWindow.deactivate(),this._listWindow.deselect(),this._commandWindow.activate()},Scene_TWParty.prototype.cancelDetailWindow=function(t){this._detailWindow.deselect(),this._detailWindow.deactivate(),this._listWindow.activate()},Scene_TWParty.prototype.commandChoice=function(t){this.activatePartyWindow(t)},Window_TWPartyCommand.prototype=Object.create(Window_HorzCommand.prototype),Window_TWPartyCommand.prototype.constructor=Window_TWPartyCommand,Window_TWPartyCommand.prototype.initialize=function(){Window_HorzCommand.prototype.initialize.call(this,0,0)},Window_TWPartyCommand.prototype.windowWidth=function(){return TW.windows.TWParty.wWidth},Window_TWPartyCommand.prototype.maxCols=function(){return 3},Window_TWPartyCommand.prototype.makeCommandList=function(){this.addCommand(TW.windows.TWParty.txtSwitch,"switch"),this.addCommand(TW.windows.TWParty.txtRemove,"remove"),this.addCommand(TextManager.cancel,"cancel")},Window_TWActiveParty.prototype=Object.create(Window_Selectable.prototype),Window_TWActiveParty.prototype.constructor=Window_TWActiveParty,Window_TWActiveParty.prototype.initialize=function(t,i){var a=TW.windows.TWParty.wWidth/2;Window_Selectable.prototype.initialize.call(this,0,t,a,i),this.setTopRow(0),this.setAction(0),this.refresh()},Window_TWActiveParty.prototype.setAction=function(t){this._action=t,this.refresh()},Window_TWActiveParty.prototype.maxCols=function(){return 1},Window_TWActiveParty.prototype.maxItems=function(){return 2==TW.party.pMode?$gameParty.members().length+(1==this._action?1:0):Math.min($gameParty.battleMembers().length+(1==this._action?1:0),$gameParty.maxBattleMembers())},Window_TWActiveParty.prototype.itemHeight=function(){return TW.windows.TWParty.detailStat>1?100:50},Window_TWActiveParty.prototype.isCurrentItemEnabled=function(){return this.isEnabled(this.index())},Window_TWActiveParty.prototype.isEnabled=function(t){return(!TW.party.ActorList[t]||!TW.party.locks[TW.party.ActorList[t]._actorId])&&(1==this._action?this._detailWindow.maxItems()>0:2!=this._action||this.maxItems()>1)},Window_TWActiveParty.prototype.refresh=function(){this.createContents(),this.drawAllItems()},Window_TWActiveParty.prototype.drawAllItems=function(){var t=this.topIndex();2==TW.party.pMode?TW.party.ActorList=$gameParty.members():TW.party.ActorList=$gameParty.battleMembers(),TW.party.colCount=0;var i=6,a=40,e=20;if(!TW.windows.TWParty.detailStat>1)var o=(this.width-15)/this.maxCols();else o=75;for(var r=this.itemHeight(),n=0;n<this.maxPageItems();n++){var s=t+n;if(s<this.maxItems()){if(TW.party.colCount=s+1,TW.party.ActorList[s])var d=TW.party.ActorList[s];else d="Add";this.drawItem(d,i,a,e,o,r,s),TW.party.colCount%this.maxCols()==0?(i+=r,a=40,e=20):(a+=o,e+=o)}}},Window_TWActiveParty.prototype.drawItem=function(t,i,a,e,o,r,n){if("Add"!=t){if(this.changePaintOpacity(this.isEnabled(n)),TW.windows.TWParty.detailStat<3?(this.drawActorName(t,a,i,o),this.drawActorCharacter(t,e,i+40)):(this.drawActorFace(t,e-18,i-4,100,80),this.drawActorName(t,a,i+60)),TW.windows.TWParty.detailStat>1){var s=a+100,d=i-20;TW.windows.TWParty.detailStat<3?(this.drawActorLevel(t,a+105,d+r/2+10),this.drawActorClass(t,a,d+r/2+10,95)):(this.drawActorLevel(t,a+185,d+r/2+5),this.drawActorClass(t,a+70,d+r/2+5,95)),this.drawActorHp(t,s,i,100),this.drawActorMp(t,s+105,i,100)}}else this.drawText(t,a,i,o)},Window_TWActiveParty.prototype.setDetailWindow=function(t){this._detailWindow=t,this.update()},Window_TWRoster.prototype=Object.create(Window_Selectable.prototype),Window_TWRoster.prototype.constructor=Window_TWRoster,Window_TWRoster.prototype.initialize=function(t,i,a,e){Window_Selectable.prototype.initialize.call(this,t,i,a,e),this.setTopRow(0),this.refresh()},Window_TWRoster.prototype.maxCols=function(){return 1},Window_TWRoster.prototype.maxItems=function(){return TW.party.charPool.getHeroList().length},Window_TWRoster.prototype.itemHeight=function(){return TW.windows.TWParty.detailStat>1?100:50},Window_TWRoster.prototype.activate=function(){Window_Selectable.prototype.activate.call(this),this.select(0)},Window_TWRoster.prototype.drawAllItems=function(){var t=this.topIndex(),i=this.maxItems();this._roster=TW.party.charPool.getHeroList();var a=6,e=40,o=20;if(!TW.windows.TWParty.detailStat>1)var r=(this.width-15)/this.maxCols();else r=75;for(var n=this.itemHeight(),s=0;s<this.maxPageItems();s++){var d=t+s;if(d<i){var c=this._roster[d];this.drawItem(c,a,e,o,r,n),a+=n,e=40,o=20}}},Window_TWRoster.prototype.drawItem=function(t,i,a,e,o,r){var n=$gameActors.actor(t.id);if(TW.windows.TWParty.detailStat<3?(this.drawActorName(n,a,i,o),this.drawActorCharacter(n,e,i+40)):(this.drawActorFace(n,e-18,i-4,100,80),this.drawActorName(n,a,i+60)),TW.windows.TWParty.detailStat>1){var s=a+100,d=i-20;TW.windows.TWParty.detailStat<3?(this.drawActorLevel(n,a+105,d+r/2+10),this.drawActorClass(n,a,d+r/2+10,95)):(this.drawActorLevel(n,a+185,d+r/2+5),this.drawActorClass(n,a+70,d+r/2+5,95)),this.drawActorHp(n,s,i,100),this.drawActorMp(n,s+95+10,i,100)}},Window_TWRoster.prototype.refresh=function(){this.createContents(),this.drawAllItems()};