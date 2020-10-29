//=============================================================================
// Trb_EquipSound.js
//=============================================================================
/*:
 * @plugindesc Plugin for equipment SE & ME
 * @author Trb
 * 
 * @help Allows you to add specified SE/ ME when equipping items.
 * There's a function that display text window at the same time.
 * 
 * <How to use>
 * Can be used by using following tags in the Note field on Equipment.
 * 
 * 
 * ・Play SE for equipment
 *   <equipSE: Filename, volume, pitch, pan> or
 *   <equipmentSE: Filename, volume, pitch, pan>
 * 
 *   Use the filename of SE that you're using.
 *   Enter any numerical value for volume, pitch, pan.
 *   You can leave the SE filename by itself without adjusting- volume, pitch, pan.
 *   By default: volume becomes 90, pitch 100, pan 0.
 * 
 * 
 * 
 * ・Play ME for equipment
 *   <equipME: Filename, volume, pitch, pan> or
 *   <equipmentME: Filename, volume, pitch, pan>
 * 
 *   Filename should be the same name as ME file that you're using. 
 * 
 * 
 * 
 * ・For Wait
 *   <equipWait: number of frames> or
 *   <equipmentWait: number of frames>
 * 
 *   Processing can be stopped by setting wait on equipment.
 *   Use it when you want to wait until ME stops playing.
 *   Enter numerical value for the number of frames.
 * 
 * 
 * 
 * ・Display text
 *   <equipText:text> or
 *   <equipmentText:text>
 * 
 *   equipment can display texts through show text window.
 *   Line breaks are \n.
 *   If you want to write "%1" it will display actor's name with equipment.
 * 
 *   Example- 
 *   <equipText:%1 \ngot Cursed！>
 *   When you typed this down, it'll display:
 *   「Harold
 *   　got Cursed！」
 *   Like so.
 * 
 * 
 * 
 */
(function () {

    //convert array string for se,me
    var henkan = function(params){
        var param = params.split(',');
        var name = param[0];
        if(name[0] === ' '){
            name = name.slice(1);
        }
        var volume = Number(param[1]) || 90;
        var pitch = Number(param[2]) || 100;
        var pan = Number(param[3]) || 0;
        return {name: name, volume: volume, pitch: pitch, pan: pan};
    };

    var frag_seCancel = false,//flag used to prevent equipment se from playing
        seWaitCount = 0;//se for wait setting on performance


	var Scene_Equip_onItemOk = Scene_Equip.prototype.onItemOk;
	Scene_Equip.prototype.onItemOk = function() {
		var item = this._itemWindow.item();
		if(item){
            //Se,Me,etc...
            var se = item.meta.equipSE || item.meta.equipmentSE;
            if(se){
                AudioManager.playSe(henkan(se));
                frag_seCancel = true;
            }
            var me = item.meta.equipME || item.meta.equipmentME;
            if(me){
                AudioManager.playMe(henkan(me));
                frag_seCancel = true;
            }
            //Wait Setting
            var wait = item.meta.equipWait || item.meta.equipmentWait;
            if(wait){
                seWaitCount = Number(wait);
            }
            //Message Setting
            var text = item.meta.equipText || item.meta.equipmentText;
            if(text){
                if(text[0] === ' '){
                    text = text.slice(1);
                }
                text = text.format(this.actor().name()).replace('\\n','\n');
                $gameMessage.add(text);
            }
		}
		Scene_Equip_onItemOk.call(this);
	};

    //Cancel Normal Equipment SE (due to duplicate)
    var SoundManager_playEquip = SoundManager.playEquip;
    SoundManager.playEquip = function() {
        if(frag_seCancel){
            frag_seCancel = false;
            return;
        }
        SoundManager_playEquip.call(this);
    };

    //Add Wait Processing
    var Window_EquipSlot_update = Window_EquipSlot.prototype.update;
    Window_EquipSlot.prototype.update = function() {
        if(this.updateWait()){
            return;
        }
        Window_EquipSlot_update.call(this);
    };

    Window_EquipSlot.prototype.updateWait = function() {
        if(seWaitCount > 0){
            seWaitCount --;
        }
        return seWaitCount > 0 || $gameMessage.hasText();

    };

    //Create Message Window
    var Scene_Equip_create = Scene_Equip.prototype.create;
    Scene_Equip.prototype.create = function() {
        Scene_Equip_create.call(this);
        this.createMessageWindow();
    };

    Scene_Equip.prototype.createMessageWindow = function() {
        this._messageWindow = new Window_Message();
        this.addWindow(this._messageWindow);
    };

})();