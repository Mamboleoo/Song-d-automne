var interactions = function(which, $scope){
	console.log(which);
	mustBeDeleted = false;
	switch(which){
		//When we drink the bottle of wine
		case "1.2":
		case "1.3":
		case "8.2":
		case "8.3":
	 		//Can not be displayed anymore
	 		data.items[which.slice(0,1)].visible = false;
			view = document.getElementsByClassName("view")[0];
			guides = document.getElementsByClassName("view")[0];
			view = view.cloneNode(true);
			guides = guides.cloneNode(true);
			document.body.appendChild(view);
			document.body.appendChild(guides);
	 		document.body.className += ' ' + "drunk";
	 		mustBeDeleted = true;
	 		setTimeout(function(){
				document.body.removeChild(view);
				document.body.removeChild(guides);
				document.body.className = document.body.className.replace(new RegExp('(^|\\b)' + "drunk".split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
	 		},9000);
		break;
		//when we smoke a cigar, high effect
		case "9.2":
		case "9.3":
			document.body.className += ' ' + "high";
			mustBeDeleted = true;
			//Can not be displayed anymore
	 		data.items[which.slice(0,1)].visible = false;
			setTimeout(function(){
				document.body.className = document.body.className.replace(new RegExp('(^|\\b)' + "high".split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
			},20000);
		break;
		//If we use the hat
		case "18.3":
			data.interactionSentence = "Je suis un vraie Lady maintenant !";
			data.isALady = true;
			mustBeDeleted = true;
		break;
		//When we want to jump inside a lifeboat
		case "43.0":
			if(data.isALady || hasInInventory(25)){
				data.chapter = 3;
				data.chaptersVisible = true;
				setTimeout(function(){
					data.chaptersVisible = false;
					data.actualRoom = "outsideLifeBoat";
					$scope.$apply();
				},1500);
				console.log("Sauvé !");
			}
			else{
				console.log("Ce canot est réservé aux femmes & aux enfants !");
			}
		break;
	}
	if(mustBeDeleted){
		mustBeDeleted = false;
		index = data.inventory.indexOf(which.slice(0,1));
		data.inventory.splice(index, 1);
	}
};