//=============================================================================
// BattleMembersOnly.js
//=============================================================================

/*:
* @plugindesc Remove non battle members from menu screen.
*/

Window_MenuStatus.prototype.maxItems = function() {
    return $gameParty.battleMembers().length;
};

Window_MenuStatus.prototype.drawItemImage = function(index) {
    var actor = $gameParty.battleMembers()[index];
    var rect = this.itemRect(index);
    this.changePaintOpacity(actor.isBattleMember());
    this.drawActorFace(actor, rect.x + 1, rect.y + 1, 144, rect.height - 2);
    this.changePaintOpacity(true);
};

Window_MenuStatus.prototype.drawItemStatus = function(index) {
    var actor = $gameParty.battleMembers()[index];
    var rect = this.itemRect(index);
    var x = rect.x + 162;
    var y = rect.y + rect.height / 2 - this.lineHeight() * 1.5;
    var width = rect.width - x - this.textPadding();
    this.drawActorSimpleStatus(actor, x, y, width);
};
