function switchPath($scope, newVal, oldVal, id){
	switch(oldVal){
		// A DECK
		case "bedroom_1":
			switch(newVal){
				case "readingRoom":addClassPath("from0to1");break;
				case "smokeRoom":addClassPath("from0to2");break;
				case "veranda":addClassPath("from0to3");break;
				case "astairs":addClassPath("from0to6");break;
				case "aelevators":addClassPath("from0to7");break;
			}
		break;
		case "readingRoom":
			switch(newVal){
				case "bedroom_1":addClassPath("from1to0");break;
				case "smokeRoom":addClassPath("from1to2");break;
				case "veranda":addClassPath("from1to3");break;
				case "astairs":addClassPath("from1to6");break;
				case "aelevators":addClassPath("from1to7");break;
			}
		break;
		case "smokeRoom":
			switch(newVal){
				case "bedroom_1":addClassPath("from2to0");break;
				case "readingRoom":addClassPath("from2to1");break;
				case "veranda":addClassPath("from2to3");break;
				case "astairs":addClassPath("from2to6");break;
				case "aelevators":addClassPath("from2to7");break;
			}
		break;
		case "veranda":
			switch(newVal){
				case "bedroom_1":addClassPath("from3to0");break;
				case "readingRoom":addClassPath("from3to1");break;
				case "smokeRoom":addClassPath("from3to2");break;
				case "astairs":addClassPath("from3to6");break;
				case "aelevators":addClassPath("from3to7");break;
			}
		break;
		case "astairs":
			switch(newVal){
				case "bedroom_1":addClassPath("from6to0");break;
				case "readingRoom":addClassPath("from6to1");break;
				case "smokeRoom":addClassPath("from6to2");break;
				case "veranda":addClassPath("from6to3");break;
				case "aelevators":addClassPath("from6to7");break;
			}
		break;
		case "aelevators":
			switch(newVal){
				case "bedroom_1":addClassPath("from7to0");break;
				case "readingRoom":addClassPath("from7to1");break;
				case "smokeRoom":addClassPath("from7to2");break;
				case "veranda":addClassPath("from7to3");break;
				case "astairs":addClassPath("from7to6");break;
			}
		break;
		// BOAT DECK
		case "boatDeckstairs":
			switch(newVal){
				case "firstClassBoat":addClassPath("from8to4");break;
				case "wheelHouse":addClassPath("from8to5");break;
			}
		break;
		case "wheelHouse":
			switch(newVal){
				case "firstClassBoat":addClassPath("from5to4");break;
				case "boatDeckstairs":addClassPath("from5to8");break;
			}
		break;
		case "firstClassBoat":
			switch(newVal){
				case "wheelHouse":addClassPath("from4to5");break;
				case "boatDeckstairs":addClassPath("from4to8");break;
			}
		break;

		// B DECK
		case "bstairs":
			switch(newVal){
				case "belevators":addClassPath("from9to14");break;
			}
		break;
		case "belevators":
			switch(newVal){
				case "bstairs":addClassPath("from14to9");break;
			}
		break;

		// C DECK
		case "cstairs":
			switch(newVal){
				case "celevators":addClassPath("from10to15");break;
			}
		break;
		case "celevators":
			switch(newVal){
				case "cstairs":addClassPath("from15to10");break;
			}
		break;

		// D DECK
		case "dstairs":
			switch(newVal){
				case "delevators":addClassPath("from11to16");break;
			}
		break;
		case "delevators":
			switch(newVal){
				case "dstairs":addClassPath("from16to11");break;
			}
		break;

		// E DECK
		case "estairs":
			switch(newVal){
				case "eelevators":addClassPath("from12to17");break;
			}
		break;
		case "eelevators":
			switch(newVal){
				case "estairs":addClassPath("from17to12");break;
			}
		break;

		// F DECK
		case "fstairs":
			switch(newVal){
				case "felevators":addClassPath("from13to18");break;
				case "turkishBath":addClassPath("from13to19");break;
			}
		break;
		case "felevators":
			switch(newVal){
				case "fstairs":addClassPath("from18to13");break;
				case "turkishBath":addClassPath("from18to19");break;
			}
		break;
		case "turkishBath":
			switch(newVal){
				case "fstairs":addClassPath("from19to13");break;
				case "felevators":addClassPath("from19to18");break;
			}
		break;
	}

	function addClassPath(pathClass){
		if(id == undefined){
			document.getElementById("pawn").style.webkitAnimationName = pathClass;
		}
		else{
			document.getElementById(id).style.webkitAnimationName = pathClass;
		}
	};
};