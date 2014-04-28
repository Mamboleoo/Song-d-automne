tfe.directive("map", function(){
	return {
		restrict: "AE",
		transclude: false,
		scope: {"zoom" : "="},
		link: function(scope, el, attr){
			scope.width = 1956;
			scope.height = 748;
			el[0].addEventListener("mousewheel", function(e){
				//if ZOOM IN
				if(e.deltaY<0){
					if(scope.zoom<=1.3){
						scope.zoom+=.1;
						scope.zoom = Math.round(scope.zoom*10)/10;
					}
				}
				//if ZOOM OUT
				if(e.deltaY>0){
					if(scope.zoom>=.8){
						scope.zoom -= .1;
					}
				}
				scope.zoom = Math.round(scope.zoom*10)/10;
				if(scope.zoom >= .5 && scope.zoom <= 1.5){
					if(el[0].style.backgroundPosition < -(1956*scope.zoom)-1024){
						console.log("ok");
					}
					//on récupère la matrice de la map
					matrixMap = document.getElementById("groupMaps").getAttribute("transform");
					//on détecte qu'elle existe
					if(matrixMap!=null){
						matrixMap = matrixMap.split(" ");
					}//sinon, c'est que c'est la 1ere foisqu'on scrolle et donc elle n'existe pas encore
					else{matrixMap=[0,0,0,0,0];}
					//on applique la matrice
					console.log(matrixMap);
					if(e.deltaY>0 && matrixMap[4]<-930){
						console.log("ok");
						document.getElementById("groupMaps").setAttribute("transform", "matrix("+scope.zoom+" 0 0 "+scope.zoom+" -932 "+(374-(748*scope.zoom/2))+")");
					}
					else{
						document.getElementById("groupMaps").setAttribute("transform", "matrix("+scope.zoom+" 0 0 "+scope.zoom+" "+matrixMap[4]+" "+(374-(748*scope.zoom/2))+")");
					}
				}
				
			});
		}
	}
});

//Ceci permet de ne pas avoir d'erreur de console quand il gènere les D & width & height de mes svg
tfe.directive("ngD", function(){
	return function(scope, element, attrs) {
		// scope.$watch(attrs.ngD, function(value) {
	 	   element[0].setAttribute('d', attrs.ngD);
		// });
	};
});

tfe.directive("ngWidth", function(){
	return function(scope, element, attrs) {
		// scope.$watch(attrs.ngD, function(value) {
	 	   element[0].setAttribute('width', attrs.ngWidth);
		// });
	};
});
tfe.directive("ngHeight", function(){
	return function(scope, element, attrs) {
		// scope.$watch(attrs.ngD, function(value) {
	 	   element[0].setAttribute('height', attrs.ngHeight);
		// });
	};
});
