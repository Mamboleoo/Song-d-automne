//========== VIEWS CONTROLLER ============\\

tfe.controller("viewController", ["$scope", "$http", "data",  function ($scope, $http){
	$scope.data = data;

	/* THIS IS SUPPOSED TO HIDE GUIDES */
	$scope.viewClicked = function(){
		if(data.guides.visible){data.guides.visible = false;}
	}

	/* Change the name of the item clicked */
	$scope.showItemName = function(id){
		data.itemName.visible = true;
		$scope.item = data.items[id].name;
	};

	/* CHOICES ARE DISPLAYED */
	$scope.itemsChoices = function(id, e, itemOrPerso){
		data.choices.visible = true;
		if(itemOrPerso==0){
			data.items.id = id;
			$scope.item = data.items[id].name;
			$scope.itemOrPerso = "items";
		}
		else{
			data.characters.id = id;
			$scope.item = data.characters[id].name;
			$scope.itemOrPerso = "characters";
		}
		document.getElementsByClassName("choices")[0].style.left = (e.offsetX-100)+"px";
		document.getElementsByClassName("choices")[0].style.top = (e.offsetY-25)+"px";
	}

	/* WHEN CHOICE IS MADE ... */
	$scope.choice = function(which){
		//on affiche le texte de parler correspondant à l'objet
		data.interactionSentence = data[$scope.itemOrPerso][data[$scope.itemOrPerso].id].choices[which].text;
		//Check if this is the Grab one & if there is an action
		var inventoryLength = data.inventory.length;
		if(which == 0 && data.items[data.items.id].choices[0].action == true){
			//Check if inventory is not full
			if(inventoryLength<=17){
				var checkInventory = true;
				//This check if the item exists inside the 
				for(i=0;i<inventoryLength;i++){
					if(data[$scope.itemOrPerso].id == data.inventory[i]){
						checkInventory = false;
						i = inventoryLength;
						data.interactionSentence = "J'ai déjà cet objet.";
					}
					else{checkInventory=true;}
				}
				//If it inventory doesn't contain this element, add it
				if(checkInventory){
					$scope.item = "";
					//push into the inventory
					data.inventory.push(data[$scope.itemOrPerso].id);
					//Hide it from the screen
					data[$scope.itemOrPerso][data[$scope.itemOrPerso].id].visible = false;
				}
			}
			else{
				data.interactionSentence = "Mon inventaire est trop rempli !";
			}
		}
		//Si c'est prendre mais qu'il y a une interaction spécifique
		else if(which == 0 && data.items[data.items.id].choices[0].action == "interaction"){
			interactions(data.items.id+".0", $scope);
		}
		//Si c'est examiner qui est choisi
		else if(which == 1){
		}
		//Si c'est Parler qui est choisi
		else if(which == 2){
			//S'il existe une interaction, on appelle la fonction qui va éxécuter celle-ci
			if(data[$scope.itemOrPerso][data[$scope.itemOrPerso].id].choices[2].action){
				data.interactions(data.items.id+".2");
			}
		}
	}


}]);

//========== GUIDES CONTROLLER ============\\

tfe.controller("guidesController", ["$scope", "$http", "data",  function ($scope, $http){
	$scope.data = data;
	$scope.zoom = 1; //zoo map


	//This change the guide page visible
	$scope.guideChoice = function(which){
		data.guides.active = which;
		data.random.oldKeyPressed = null;
		if(which==0){data.random.oldKeyPressed=9};
		if(which==1){data.random.oldKeyPressed=32};
	};


	/* ALL OF THIS IS MAPS */
	/* ALL OF THIS IS MAPS */
	/* ALL OF THIS IS MAPS */

	$scope.playerName = function(player,e){
		$scope.playerHoverName = player;
		$scope.playerNameVisi = true;
		document.getElementsByClassName("playerName")[0].style.top =e.pageY-20+"px";
		document.getElementsByClassName("playerName")[0].style.left =e.pageX-35+"px";
	};
	$scope.playerNameQuit = function(){$scope.playerNameVisi = false;}
	//Moving the background on drag
		var backgroundPosition = -932;
		var oldMousePosition = 0;
		$scope.mapMoves = function(e){
			var x = e.offsetX;
			var y = e.offsetY;
			var checkUpZoom = (1956*$scope.zoom)-1024;
			// if(e.which==1 && backgroundPosition<=0 && backgroundPosition >= -checkUpZoom){
			if(e.which==1){
				backgroundPosition = backgroundPosition + (x-oldMousePosition);
				//If we are at the extreme left
				if(backgroundPosition>0){
					backgroundPosition = 0;
					data.stillMapLeftAvailable = false;
				}
				//If we are at the extreme right
				if(backgroundPosition<-checkUpZoom){
					backgroundPosition = -checkUpZoom;
					data.stillMapRightAvailable = false;
				}
				//if we are moving in the middle of the map, show both gradient
				if(backgroundPosition<0 && -backgroundPosition<checkUpZoom){
					data.stillMapRightAvailable = true;
					data.stillMapLeftAvailable = true;
				}
				document.getElementById("groupMaps").setAttribute("transform", "matrix("+$scope.zoom+" 0 0 "+$scope.zoom+" "+backgroundPosition+" "+(374-(748*$scope.zoom/2))+")");
			}
			oldMousePosition = x;
		};
		/* WHEN ELEVATORS CHOOSEN */
		$scope.elevators = function(){
			data.stairs = false;
			if(data.actualRoom == data.actualFloor+"elevators"){
				data.elevators = true;
			}
			else{
				data.actualRoom = data.actualFloor+"elevators";
				setTimeout(function(){
					data.stairs = false;
					data.elevators = true;
					$scope.$apply();
				},2000);
			}
		}
		/* THIS FUNCTION CONTROLS THE HANDLE OF THE ELEVATOR */
		var elevatorHandleRotate = -38;
		$scope.elevatorHandle = function(e){
			var y = e.y;
			var checkUpZoom = (1956*$scope.zoom)-1024;
			if(e.which==1){
				elevatorHandleRotate = ((y-140)/3.8)-20;
				if(elevatorHandleRotate>-39 && elevatorHandleRotate<124){
					document.getElementsByClassName("elevatorHandle")[0].style.webkitTransform = "rotate("+elevatorHandleRotate+"deg)";
				}
				else{
					return false;
				}
			}
		};
		$scope.$watch("data.actualFloor", function(newVal, oldVal) {
			if(newVal != oldVal){
				$scope.elevatorHandleUp(data.actualFloor, true);
			}
		});
		$scope.elevatorHandleUp = function(level, stairsChange){
			var transitionOn = false;
			var howMuchRotate = 0;
			if(level!=undefined){
				if(level ==  "a"){
					transitionOn = true;
					howMuchRotate = -39;
					elevatorHandleRotate = -39;
				}
				else if(level ==  "b"){
					transitionOn = true;
					howMuchRotate = -5;
					elevatorHandleRotate = -5;
				}
				else if(level ==  "c"){
					transitionOn = true;
					howMuchRotate = 25;
					elevatorHandleRotate = 25;
				}
				else if(level ==  "d"){
					transitionOn = true;
					howMuchRotate = 58;
					elevatorHandleRotate = 58;
				}
				else if(level ==  "e"){
					transitionOn = true;
					howMuchRotate = 95;
					elevatorHandleRotate = 95;
				}
				else if(level ==  "f"){
					transitionOn = true;
					howMuchRotate = 124;
					elevatorHandleRotate = 124;
				}
				data.actualFloor = level;
			}
			else{
				if(elevatorHandleRotate>-39 && elevatorHandleRotate < -22 ){
					transitionOn = true;
					howMuchRotate = -39;
					data.actualFloor = "a";
				}
				else if(elevatorHandleRotate>-22 && elevatorHandleRotate < 10){
					transitionOn = true;
					howMuchRotate = -5;
					data.actualFloor = "b";
				}
				else if(elevatorHandleRotate>10 && elevatorHandleRotate < 41.5){
					transitionOn = true;
					howMuchRotate = 25;
					data.actualFloor = "c";
				}
				else if(elevatorHandleRotate>41.5 && elevatorHandleRotate < 76.5){
					transitionOn = true;
					howMuchRotate = 58;
					data.actualFloor = "d";
				}
				else if(elevatorHandleRotate>76.5 && elevatorHandleRotate < 109.5){
					transitionOn = true;
					howMuchRotate = 95;
					data.actualFloor = "e";
				}
				else if(elevatorHandleRotate>109.5 && elevatorHandleRotate < 124){
					transitionOn = true;
					howMuchRotate = 124;
					data.actualFloor = "f";
				}
			}
			if(transitionOn){
				document.getElementsByClassName("elevatorHandle")[0].className += ' ' + "transition";
				document.getElementsByClassName("elevatorHandle")[0].style.webkitTransform = "rotate("+howMuchRotate+"deg)";
				if(stairsChange==undefined){
					data.actualRoom  = data.actualFloor+"elevators";
				}
				setTimeout(function(){
					transitionOn = false;
					document.getElementsByClassName("elevatorHandle")[0].className = document.getElementsByClassName("elevatorHandle")[0].className.replace(new RegExp('(^|\\b)' + "transition".split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
					// data.elevators = false;
				},300);
			}
		}
		/* WHEN STAIRS CHOOSEN */
		$scope.stairs= {"up":null, "down":null};
		$scope.stairChoice = function(up, down){
			$scope.stairs.up = up;
			$scope.stairs.down = down;
			data.elevators = false;
			if(data.actualRoom == data.actualFloor+"stairs"){
				data.stairs = true;
			}
			else{
				data.actualRoom = data.actualFloor+"stairs";
				setTimeout(function(){
					data.elevators = false;
					data.stairs = true;
					$scope.$apply();
				},2000);
			}
		}

		/* SPECIAL ROOM */
		$scope.specialRoom = function(room){
			switch(room){
				case "wheelHouse":
					if(data.inventory.indexOf(23) != -1){
						data.actualRoom = "wheelHouse";
					}
					else{
						console.log("Cette pièce est fermée, je n'ai pas la clé");
					}
				break;
			}	
		}

		//Function which check if the player is an item inside the inventory
		hasInInventory = function(id){
			if(data.inventory.indexOf(id) != -1){
				return true;
			}
			else{return false;}
		}

		/* CHOICES FOR THE INVENTORY ARE DISPLAYED */
		$scope.itemsChoicesInv = function(e,id){
			data.choicesInv.visible = true;
			data.items.id = id;
			document.getElementsByClassName("choicesInv")[0].style.left = (e.clientX-100)+"px";
			document.getElementsByClassName("choicesInv")[0].style.top = (e.clientY-25)+"px";
		}
		/* WHEN CHOICE IS MADE FOR THE INVENTORY */
		$scope.choiceInv = function(which){
			//Si c'est prendre qui est choisi
			if(which == 0){
				//We call the interactions functions and add .3 because "use" is the third action
				data.interactions(data.items.id+".3");
			}
			//Si c'est combiner qui est choisi
			else if(which == 1){
			}
			//Si c'est Jeter qui est choisi
			else if(which == 2){
				//delete the object of the inventory
				index = data.inventory.indexOf(data.items.id);
				data.inventory.splice(index, 1);
			}
		}

}]);


tfe.controller("teleCtrl", function($scope, socket){
	$scope.msgs = [];

	$scope.sendMsg = function(){
		socket.emit('send msg', $scope.msg.text);
		$scope.msg.text = "";
	};

	socket.on("get msg", function(author, msg){
		msgReceived = {
			"author": author,
			"msg" : msg
		};
		$scope.msgs.push(msgReceived);
		$scope.$digest();
	});

	/* ============================ */
	/* ========= SOCKET =========== */
	/* ============================ */

	//when we connect
	socket.on("connexion", function(connectedPlayers, playerName){
		console.log(connectedPlayers);
		data.connectedPlayers = connectedPlayers;
		data.playerName = playerName;
		for (var i=0, j = connectedPlayers.length;i<j;i++){
			if(connectedPlayers[i].floor == data.actualFloor){
				console.log(connectedPlayers[i].name+" est déjà au même étage que moi");
			}
		};
	});

	//When new player connects
	var notifTimeOut;
	socket.on("new player", function(player){
		console.log("New Player Name : "+player.name);

		/* NOTIFICATION */
			notifTimeOut = clearTimeout(notifTimeOut);
			data.notification.visible = false;
			//Create a notification
			data.notification.msg = player.name+" vient de se connecter.";
			//Display it
			data.notification.visible = true;
			$scope.$apply();
			//Hide the notif after 3s
			notifTimeOut = setTimeout(function(){
				data.notification.visible = false;
				$scope.$apply();
			},3000);
		/* END OF NOTIFICATION */

		//Push the new player into the data
		data.connectedPlayers.push(player);
	});

	//when a player moves
	socket.on("player move", function(player, to, from, actualFloor){
		//si le joueur quitte d'étage
		console.log("Quelqu'un bouge");
		for (var i=0, j = data.connectedPlayers.length;i<j;i++){
			if(data.connectedPlayers[i].name == player.name){
				data.connectedPlayers[i] = player;
			}
		};
		console.log(player.id);
		switchPath($scope, to, from, player.id);
	});

	//when another player disconnect
	socket.on("player disconnect", function(which){
		console.log(which);
		data.connectedPlayers.splice(which,1);
	});

});