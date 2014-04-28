function sounds(which){
	switch (which){
		case "collision":
			var audio = new Audio('../sounds/collision.ogg').play();
		break;
	}
}
setTimeout(function(){
	// document.body.className += ' ' + "shake";
	if(data.sounds){
		// sounds("collision");
	}
	// data.chapter = 2;
	setTimeout(function(){
		document.body.className = document.body.className.replace(new RegExp('(^|\\b)' + "shake".split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
	},19200);
},30000);