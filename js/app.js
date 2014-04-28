var tfe = angular.module('tfe',['ngAnimate']).config(function($animateProvider) {
	$animateProvider.classNameFilter(/(fadeInOut)|(notification)/);
});

tfe.factory("socket", function(){
	var socket = io.connect("192.168.1.6:8080/");
	return socket;
});


tfe.controller("globalController", ["$scope", "$http", "data", "socket", function ($scope, $http, data, socket){
	$scope.data = data;

	//ON KEY DOWN
	data.guides.active 	= null;
	$scope.keyDown = function(e){
		var key = e.keyCode;
		if(data.chapter < 3 && data.guides.active != 4){
			switch(key){
				case 9: existingKey(key, 0); break; // MAP TAB
				case 27: existingKey(key, 0); break; //ESC QUIT
				case 32: existingKey(key, 1); break; // INVENTORY ESPACE
				//create the iceberg collision
				case 73:
					document.body.className += ' ' + "shake";
					sounds("collision");
				break;

			}
		}
		data.random.oldKeyPressed = key;
		function existingKey(which, guideNmbr){
			e.preventDefault();
			//this hide the guides
			if(key == data.random.oldKeyPressed && data.guides.visible == true || key == 27)
				{
					data.guides.visible = false;
					setTimeout(function(){
						data.guides.active 	= null;
					},200);
					return;
				}
			else{
				//else, we show the guides
				data.guides.visible = true;
			}
			if(!$scope.touchDown){
				//show the right one
				data.guides.active 	= guideNmbr;
			}
			$scope.touchDown = true;
		}
	};


	//ON KEY UP
	$scope.keyUp = function(e){
		var key = e.keyCode;
		//PREVENT TAB REPEAT EFFECT
		if(key == 9){$scope.touchDown = false;}
		if(key == 32){$scope.touchDown = false;}
	};

	//WHEN WE LEAVE THE MOUSE
	$scope.itemsUp = function(){
		data.choices.visible = false;
		data.choicesInv.visible = false;
	}

//Filter items into view, if the path must be draw
	$scope.pathInRooms = function (input){
		if(input.room == data.actualRoom){
			return true;
		}
		else{return false;}
	}
	$scope.imgInRooms = function (input){
 		if(input.svgImg != null || input.svgImg != undefined){
			if(input.room == data.actualRoom){
				return true;
			}
			else{return false;}
		}
		else{return false;}
	}

	//When the map changes
	$scope.mapLoaded = function(){
		//Set the pawn at the right placec
		document.getElementById("pawn").style.webkitTransform = "translate3d("+data.rooms[data.actualRoom].position[0]+"px,"+data.rooms[data.actualRoom].position[1]+"px,0)";
	}

	$scope.$watch("data.actualRoom", function(newVal, oldVal) {
		if(newVal != oldVal){
			switchPath($scope, newVal, oldVal);
			socket.emit("player move", newVal, oldVal, data.actualFloor);
		}
	});


}]);


//========== FACTORY ===========\\

tfe.factory("data", function($http){

//LOADING JSON FILES
	request = new XMLHttpRequest();
	request.open('GET', 'data/items.json', true);
	request.onload = function() { data.items = (JSON.parse(this.response)).items;};
	request.send();
	request = new XMLHttpRequest();
	request.open('GET', 'data/characters.json', true);
	request.onload = function() { data.characters = (JSON.parse(this.response)).characters;};
	request.send();
	request = new XMLHttpRequest();
	request.open('GET', 'data/rooms.json', true);
	request.onload = function() { data.rooms = (JSON.parse(this.response));};
	request.send();

	data = {
			"random" :{
				"oldKeyPressed" : null
			},
			"guides" : {
				"visible" 	: false,
				"active"		: 0
			},
			"choices": {
				"id" : 0,
				"visible" : false
			},
			"choicesInv": {
				"id" : 0,
				"visible" : false
			},
			"actualRoom" : "bedroom_1",
			"actualFloor" : "a",
			"inventory" : [],
			"elevators" : false,
			"stillMapRightAvailable" : false,
			"stillMapLeftAvailable" : true,
			"chapter" : 2,
			"chaptersVisible" : false,
			"itemName": {
				"visible": false
			},
			"sounds" : false,
			"interactionSentence" : "",
			"isALady" : false,
			"notification" : {"visible":false,"msg":""},
			"connectedPlayers" : [],
			"playerName" : ""
		};
	data.interactions = interactions;
	return data;
});
