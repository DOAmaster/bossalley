// Generated by RPG Maker.
// Do not edit this file directly.
var $plugins =
[
{"name":"Community_Basic","status":true,"description":"Basic plugin for manipulating important parameters.","parameters":{"cacheLimit":"20","screenWidth":"816","screenHeight":"624","changeWindowWidthTo":"","changeWindowHeightTo":"","renderingMode":"auto","alwaysDash":"off"}},
{"name":"MadeWithMv","status":false,"description":"Show a Splash Screen \"Made with MV\" and/or a Custom Splash Screen before going to main screen.","parameters":{"Show Made With MV":"true","Made with MV Image":"MadeWithMv","Show Custom Splash":"false","Custom Image":"","Fade Out Time":"120","Fade In Time":"120","Wait Time":"160"}},
{"name":"SRD_GameUpgrade","status":true,"description":"Enables more customization over the core mechanics of one's game while also providing additional functions for future plugins.","parameters":{"Game Window":"====================================","Game Reconstruction (1.5.X & below)":"true","Game Resolution":"{\"Width\":\"816\",\"Height\":\"624\"}","Screen Resolution":"{\"Width\":\"\",\"Height\":\"\"}","Minimum Resolution":"{\"Width\":\"408\",\"Height\":\"312\"}","Maximum Resolution":"{\"Width\":\"\",\"Height\":\"\"}","Window Title":"","Allow Resize":"true","Initial Fullscreen":"false","Show Frame":"true","Always on Top":"false","Core Defaults":"====================================","Audio Master Volume":"100","Video Master Volume":"100","Image Cache Limit":"30","Decrypter Ignore List":"[\"system/Window.png\"]","JsonEx Max Depth":"100","Retry Intervals":"[\"500\",\"1000\",\"3000\"]","HTML Settings":"====================================","Background Color":"#000000","Image Rendering":"auto","PIXI Settings":"====================================","Garbage Collection Mode":"Automatic","Round Pixels":"false","Scale Mode":"Nearest","Wrap Mode":"Clamp"}},
{"name":"SRD_TitleCommandCustomizer","status":true,"description":"Allows customization over the Title Command Window.\r\nCan customize size, position, rows, columns, and commands.","parameters":{"Command Data":"[\"{\\\"Text\\\":\\\"EVAL: \\\\\\\"\\\\\\\\\\\\\\\\i[73] \\\\\\\" + TextManager.newGame\\\",\\\"Symbol\\\":\\\"newGame\\\",\\\"Action\\\":\\\"this.commandNewGame.bind(this)\\\",\\\"Enabled\\\":\\\"true\\\",\\\"Visible\\\":\\\"true\\\"}\",\"{\\\"Text\\\":\\\"EVAL: this.isContinueEnabled() ? \\\\\\\"\\\\\\\\\\\\\\\\i[75] \\\\\\\" + TextManager.continue_ : \\\\\\\"\\\\\\\\\\\\\\\\i[74] No Saves\\\\\\\"\\\",\\\"Symbol\\\":\\\"continue\\\",\\\"Action\\\":\\\"this.commandContinue.bind(this)\\\",\\\"Enabled\\\":\\\"this.isContinueEnabled()\\\",\\\"Visible\\\":\\\"true\\\"}\",\"{\\\"Text\\\":\\\"EVAL: \\\\\\\"\\\\\\\\\\\\\\\\i[83] \\\\\\\" + TextManager.options\\\",\\\"Symbol\\\":\\\"options\\\",\\\"Action\\\":\\\"this.commandOptions.bind(this)\\\",\\\"Enabled\\\":\\\"true\\\",\\\"Visible\\\":\\\"true\\\"}\",\"{\\\"Text\\\":\\\"\\\\\\\\i[82] Shutdown\\\",\\\"Symbol\\\":\\\"shutdown\\\",\\\"Action\\\":\\\"window.close.bind(window)\\\",\\\"Enabled\\\":\\\"true\\\",\\\"Visible\\\":\\\"true\\\"}\",\"{\\\"Text\\\":\\\"Common Event 1\\\",\\\"Symbol\\\":\\\"common-event-1\\\",\\\"Action\\\":\\\"this.playCommonEvent.bind(this, 1)\\\",\\\"Enabled\\\":\\\"false\\\",\\\"Visible\\\":\\\"false\\\"}\"]","Command Order":"[\"newGame\",\"continue\",\"options\",\"shutdown\"]","Window Settings":"====================================","Allow Text Codes":"true","Command Text Alignment":"left","Command Text Font":"carbon","Window Opacity":"255","Window Padding":"18","Window Position/Size":"====================================","Window X":"(Graphics.boxWidth - this.width) / 2","Window Y":"Graphics.boxHeight - this.height - 96","Window Width":"240 * this.maxCols()","Window Height":"this.fittingHeight(this.numVisibleRows())","Window Rows":"2","Window Columns":"2"}},
{"name":"SRD_CharacterChoices","status":true,"description":"Allows the use of the \"Show Choices\" event to have the Player to select an animated Character.","parameters":{"Walking Speed":"15","Character Padding":"18","Sprite Width":"48","Sprite Height":"48","X Offset":"12","Y Offset":"14"}},
{"name":"SRD_SuperToolsEngine","status":true,"description":"The heart of all maker-style plugins; it adds a playtesting editor that can be opened with F12.","parameters":{"Connect Editor":"true","Auto Open Window":"false","Auto Move Window":"true","Menu Editor Exempt List":"[\"Window_BattleLog\",\"Window_MapName\"]"}},
{"name":"SRD_RemoveTitleScreen","status":false,"description":"This Plugin removes the title screen from the game.","parameters":{}},
{"name":"SRD_BitmapUpgrade","status":false,"description":"Adds various Bitmap functions to allow color transformations to characters, battlers, and weapons.","parameters":{"Default Font":"GameFont","Default Font Size":"28","Default Font Italic":"false","Default Text Color":"#FFFFFF","Default Outline Color":"rgba(0, 0, 0, 0.5)","Default Outline Width":"4"}},
{"name":"SRD_CopyActors","status":true,"description":"Allows you to copy Actors to have multiple instances of the same Actor in your game.","parameters":{"Initial Copy Mode":"true","Starting Copy ID":"1001"}},
{"name":"SRD_TitleMapBackground","status":true,"description":"Allows developers to set a map to be used as the background of their title screen.","parameters":{"Map ID":"2"}},
{"name":"SRD_RemoveFadedContinue","status":true,"description":"This Plugin removes the faded out \"continue\" choice from\r\nthe choices at the title screen.","parameters":{}},
{"name":"SRD_ShakingText","status":true,"description":"Allows you to add Shaking Text to your Show Text events!","parameters":{"Reset Shaking per Box":"true","Default Shaking Power":"$.randomNum(0.2, 0.5)","Default Shaking Max":"1","Default Wave Power":"0.5","Default Wave Max":"4","Default Slide Power":"0.5","Default Slide Max":"4","Copy Outline":"true"}},
{"name":"SRD_SwitchShop","status":true,"description":"Allows you to create a Shop that turns ON Switches when something is purchased from the Shop.","parameters":{"Help Window Lines":"3","Buy Window Cols":"1"}},
{"name":"SRD_CharacterCreator","status":true,"description":"Allows players to create their own custom characters.","parameters":{"Wait for Loading":"false","Layers":"Tail Part2, Wing Part2, Body, Eyes, Eyebrows, Nose, Mouth, Rear Hair Part1, Front Hair Part2, Rear Hair Part2, Clothing, Accessory A, Front Hair Part1, Beast Ears, Glasses, Accessory B, Tail Part1, Wing Part1","Order":"Body, Eyes, Eyebrows, Nose, Mouth, Clothing, Front Hair, Rear Hair, Accessory A, Accessory B, Glasses, Beast Ears, Wing, Tail","Mandatory":"Body, Eyes, Eyebrows, Nose, Mouth","Mandatory Color":"#FFFF00","Print to Console":"false","== Color Picker ==":"","Number of Colors":"13","Color Chooser Text":"Color: %1","Color Change SE":"Cursor1","Color Confirm SE":"Save","== Visual Options ==":"","Active Color Load":"true","Use Fade Transition":"true","Use Background":"true","Small Piece Cols":"3","Big Piece Cols":"1","== Dialogues ==":"","Leave Dialogue":"Are you sure you want\\n to save this character?","Mandatory Dialogue":"You need to have all the mandatory sections \\nfilled out before exiting.","== Size Options ==":"","Character Width":"48","Character Height":"48","SV Char Width":"64","SV Char Height":"64","Face Width":"144","Face Height":"144","== Defaults ==":"","Default Source":"Char","Default Dir":"0","Default Color":"true","Default Condition":"true","== Section 1 ==":"","Section 1 Name":"Body","Section 1 Label Name":"","Section 1 Source":"Face","Section 1 Dir":"","Section 1 Color":"false","Section 1 Condition":"true","== Section 2 ==":"","Section 2 Name":"Clothing","Section 2 Label Name":"","Section 2 Source":"Char","Section 2 Dir":"","Section 2 Color":"false","Section 2 Condition":"true","== Section 3 ==":"","Section 3 Name":"Rear Hair","Section 3 Label Name":"","Section 3 Source":"Char","Section 3 Dir":"3","Section 3 Color":"true","Section 3 Condition":"true","== Section 4 ==":"","Section 4 Name":"Tail","Section 4 Label Name":"","Section 4 Source":"Char","Section 4 Dir":"3","Section 4 Color":"true","Section 4 Condition":"true","== Section 5 ==":"","Section 5 Name":"Wing","Section 5 Label Name":"","Section 5 Source":"Char","Section 5 Dir":"3","Section 5 Color":"true","Section 5 Condition":"true","== Section 6 ==":"","Section 6 Name":"Eyebrows","Section 6 Label Name":"","Section 6 Source":"Face","Section 6 Dir":"","Section 6 Color":"true","Section 6 Condition":"true","== Section 7 ==":"","Section 7 Name":"Nose","Section 7 Label Name":"","Section 7 Source":"Face","Section 7 Dir":"","Section 7 Color":"false","Section 7 Condition":"true","== Section 8 ==":"","Section 8 Name":"Mouth","Section 8 Label Name":"","Section 8 Source":"Face","Section 8 Dir":"","Section 8 Color":"false","Section 8 Condition":"true","== Section 9 ==":"","Section 9 Name":"Eyes","Section 9 Label Name":"","Section 9 Source":"Face","Section 9 Dir":"","Section 9 Color":"true","Section 9 Condition":"true","== Section 10 ==":"","Section 10 Name":"","Section 10 Label Name":"","Section 10 Source":"","Section 10 Dir":"","Section 10 Color":"","Section 10 Condition":"true","== Section 11 ==":"","Section 11 Name":"","Section 11 Label Name":"","Section 11 Source":"","Section 11 Dir":"","Section 11 Color":"","Section 11 Condition":"true","== Section 12 ==":"","Section 12 Name":"","Section 12 Label Name":"","Section 12 Source":"","Section 12 Dir":"","Section 12 Color":"","Section 12 Condition":"true","== Section 13 ==":"","Section 13 Name":"","Section 13 Label Name":"","Section 13 Source":"","Section 13 Dir":"","Section 13 Color":"","Section 13 Condition":"true","== Section 14 ==":"","Section 14 Name":"","Section 14 Label Name":"","Section 14 Source":"","Section 14 Dir":"","Section 14 Color":"","Section 14 Condition":"true","== Section 15 ==":"","Section 15 Name":"","Section 15 Label Name":"","Section 15 Source":"","Section 15 Dir":"","Section 15 Color":"","Section 15 Condition":"true","== Section 16 ==":"","Section 16 Name":"","Section 16 Label Name":"","Section 16 Source":"","Section 16 Dir":"","Section 16 Color":"","Section 16 Condition":"true","== Section 17 ==":"","Section 17 Name":"","Section 17 Label Name":"","Section 17 Source":"","Section 17 Dir":"","Section 17 Color":"","Section 17 Condition":"true","== Section 18 ==":"","Section 18 Name":"","Section 18 Label Name":"","Section 18 Source":"","Section 18 Dir":"","Section 18 Color":"","Section 18 Condition":"true","== Section 19 ==":"","Section 19 Name":"","Section 19 Label Name":"","Section 19 Source":"","Section 19 Dir":"","Section 19 Color":"","Section 19 Condition":"true","== Section 20 ==":"","Section 20 Name":"","Section 20 Label Name":"","Section 20 Source":"","Section 20 Dir":"","Section 20 Color":"","Section 20 Condition":"true","== Section 21 ==":"","Section 21 Name":"","Section 21 Label Name":"","Section 21 Source":"","Section 21 Dir":"","Section 21 Color":"","Section 21 Condition":"true","== Section 22 ==":"","Section 22 Name":"","Section 22 Label Name":"","Section 22 Source":"","Section 22 Dir":"","Section 22 Color":"","Section 22 Condition":"true","== Section 23 ==":"","Section 23 Name":"","Section 23 Label Name":"","Section 23 Source":"","Section 23 Dir":"","Section 23 Color":"","Section 23 Condition":"true","== Section 24 ==":"","Section 24 Name":"","Section 24 Label Name":"","Section 24 Source":"","Section 24 Dir":"","Section 24 Color":"","Section 24 Condition":"true","== Section 25 ==":"","Section 25 Name":"","Section 25 Label Name":"","Section 25 Source":"","Section 25 Dir":"","Section 25 Color":"","Section 25 Condition":"true","== Section 26 ==":"","Section 26 Name":"","Section 26 Label Name":"","Section 26 Source":"","Section 26 Dir":"","Section 26 Color":"","Section 26 Condition":"true","== Section 27 ==":"","Section 27 Name":"","Section 27 Label Name":"","Section 27 Source":"","Section 27 Dir":"","Section 27 Color":"","Section 27 Condition":"true","== Section 28 ==":"","Section 28 Name":"","Section 28 Label Name":"","Section 28 Source":"","Section 28 Dir":"","Section 28 Color":"","Section 28 Condition":"true","== Section 29 ==":"","Section 29 Name":"","Section 29 Label Name":"","Section 29 Source":"","Section 29 Dir":"","Section 29 Color":"","Section 29 Condition":"true","== Section 30 ==":"","Section 30 Name":"","Section 30 Label Name":"","Section 30 Source":"","Section 30 Dir":"","Section 30 Color":"","Section 30 Condition":"true","== Section 31 ==":"","Section 31 Name":"","Section 31 Label Name":"","Section 31 Source":"","Section 31 Dir":"","Section 31 Color":"","Section 31 Condition":"true","== Section 32 ==":"","Section 32 Name":"","Section 32 Label Name":"","Section 32 Source":"","Section 32 Dir":"","Section 32 Color":"","Section 32 Condition":"true","== Section 33 ==":"","Section 33 Name":"","Section 33 Label Name":"","Section 33 Source":"","Section 33 Dir":"","Section 33 Color":"","Section 33 Condition":"true","== Section 34 ==":"","Section 34 Name":"","Section 34 Label Name":"","Section 34 Source":"","Section 34 Dir":"","Section 34 Color":"","Section 34 Condition":"true","== Section 35 ==":"","Section 35 Name":"","Section 35 Label Name":"","Section 35 Source":"","Section 35 Dir":"","Section 35 Color":"","Section 35 Condition":"true","== Section 36 ==":"","Section 36 Name":"","Section 36 Label Name":"","Section 36 Source":"","Section 36 Dir":"","Section 36 Color":"","Section 36 Condition":"true","== Section 37 ==":"","Section 37 Name":"","Section 37 Label Name":"","Section 37 Source":"","Section 37 Dir":"","Section 37 Color":"","Section 37 Condition":"true","== Section 38 ==":"","Section 38 Name":"","Section 38 Label Name":"","Section 38 Source":"","Section 38 Dir":"","Section 38 Color":"","Section 38 Condition":"true","== Section 39 ==":"","Section 39 Name":"","Section 39 Label Name":"","Section 39 Source":"","Section 39 Dir":"","Section 39 Color":"","Section 39 Condition":"true","== Section 40 ==":"","Section 40 Name":"","Section 40 Label Name":"","Section 40 Source":"","Section 40 Dir":"","Section 40 Color":"","Section 40 Condition":"true","== Section 41 ==":"","Section 41 Name":"","Section 41 Label Name":"","Section 41 Source":"","Section 41 Dir":"","Section 41 Color":"","Section 41 Condition":"true","== Section 42 ==":"","Section 42 Name":"","Section 42 Label Name":"","Section 42 Source":"","Section 42 Dir":"","Section 42 Color":"","Section 42 Condition":"true","== Section 43 ==":"","Section 43 Name":"","Section 43 Label Name":"","Section 43 Source":"","Section 43 Dir":"","Section 43 Color":"","Section 43 Condition":"true","== Section 44 ==":"","Section 44 Name":"","Section 44 Label Name":"","Section 44 Source":"","Section 44 Dir":"","Section 44 Color":"","Section 44 Condition":"true","== Section 45 ==":"","Section 45 Name":"","Section 45 Label Name":"","Section 45 Source":"","Section 45 Dir":"","Section 45 Color":"","Section 45 Condition":"true","== Section 46 ==":"","Section 46 Name":"","Section 46 Label Name":"","Section 46 Source":"","Section 46 Dir":"","Section 46 Color":"","Section 46 Condition":"true","== Section 47 ==":"","Section 47 Name":"","Section 47 Label Name":"","Section 47 Source":"","Section 47 Dir":"","Section 47 Color":"","Section 47 Condition":"true","== Section 48 ==":"","Section 48 Name":"","Section 48 Label Name":"","Section 48 Source":"","Section 48 Dir":"","Section 48 Color":"","Section 48 Condition":"true","== Section 49 ==":"","Section 49 Name":"","Section 49 Label Name":"","Section 49 Source":"","Section 49 Dir":"","Section 49 Color":"","Section 49 Condition":"true","== Section 50 ==":"","Section 50 Name":"","Section 50 Label Name":"","Section 50 Source":"","Section 50 Dir":"","Section 50 Color":"","Section 50 Condition":"true"}},
{"name":"MrTS_RareEnemies","status":true,"description":"Adds a chance of encountering rare versions of enemies.","parameters":{}},
{"name":"MrTS_QuestLog","status":true,"description":"Tracks quests, awards players for completing them.","parameters":{"--Icons--":"","All Quests Icon":"296","Ongoing Quests Icon":"5","Completed Quests Icon":"3","Failed Quests Icon":"15","Gold Icon":"313","--Text--":"","Description Text":"Description","Objective Text":"Current Objective","Rewards Text":"Rewards","Quest Log Text":"Quest Log","No Objective Text":"- No Objectives","--Colors--":"","Started Color":"#FFFFFF","Completed Color":"#11FF11","Failed Color":"#FF1111","--Windows--":"","Quest Log Menu":"True","Quest Category X":"Graphics.boxWidth/2 - 816/2","Quest Category Y":"Graphics.boxHeight/2 - 624/2","Quest Category Width":"266","Quest Category Height":"72","Quest List X":"Graphics.boxWidth/2 - 816/2","Quest List Y":"Graphics.boxHeight/2 - 624/2 + 72","Quest List Width":"266","Quest List Height":"624-72","Description X":"Graphics.boxWidth/2 - 816/2 + 266","Description Y":"Graphics.boxHeight/2 - 624/2","Description Width":"816-266","Description Height":"624"}},
{"name":"MrTS_EventNames","status":true,"description":"Allows events to show their names above them.","parameters":{"Default Range":"3","Font Size":"24","Font Name":"november","Fade":"True","Fade Timer":"30"}},
{"name":"SRD_HUDMaker","status":true,"description":"Allows developers to create their own map-based HUD through an in-game GUI window!","parameters":{"HUD Configurations":"[]","Active Updating":"false","Show During Events":"transparent","Map Global Condition":"","Battle Global Condition":"","Disable Delete Key":"true"}}
];
