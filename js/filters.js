tfe.filter('currentFloorName', function() {
    return function(input) {
      switch(input){
        case "boatDeck":
          return "Pont des embarcations";
        break;
        case "a":
          return "Pont A";
        break;
        case "b":
          return "Pont B";
        break;
        case "c":
          return "Pont C";
        break;
        case "d":
          return "Pont D";
        break;
        case "e":
          return "Pont E";
        break;
        case "f":
          return "Pont F";
        break;
      }
    };
  });
