var player = {
	name: '',
	hand: '', 
	wins: 0
};
var comp = {
	name: 'Computer',
	hand: '',
	wins: 0
}
var hands = ['Rock', 'Paper', 'Scissors'];

const showRules = function(){
	var howToPlay = "This is a variation on the classic choosing game that people have been playing for years. You choose either Rock, Paper, or Scissors using the buttons below. At the same time, the computer will choose. (Don't worry, the computer won't peek at your choice.) Both results are displayed, and then a winner of the round will be declared. Remember: Rock breaks Scissors, Paper covers Rock, and Scissors cut Paper. (Click 'Rules' again to hide these rules.)";

	const pageInfo = document.getElementById("rule_info").innerHTML;
	if(pageInfo.length === 0){
		document.getElementById("rule_info").innerHTML = howToPlay;
	} else {
		document.getElementById("rule_info").innerHTML = null;
	}
};

const capFirst = function(str) {
  if(str.length > 0){
    var first = str.charAt(0).toUpperCase();
    return first + str.slice(1);
  } else {
    return str;
  }
};

const getPlayerName = function(){
	str = prompt("Welcome player, please enter your first name:", "John").toLowerCase();
	str.length>0 ? player.name = capFirst(str) : player.name = "John";
//console.log(playerName.length);
	var playButton = document.getElementById("wanna_play");
	player.name.length>0 ? playButton.style.visibility="hidden" : playButton.style.visibility="visible";
//console.log(playerName+", make your choice:");
		showChoices();	
};

const showChoices = function(){
//if(player.wins+comp.wins>0){console.log("another hand");}
	document.getElementById("trigger").innerHTML=player.name+", make your choice:";
	var showing =  document.getElementsByClassName("choices");
//console.log(showing[0].style.visibility);
	if(showing[0].style.visibility == "hidden"){
		showing[0].style.visibility = "visible";
	}
};

const getCompHand = function(){
	return hands[parseInt(Math.random()*10)%3];
};

const getPlayerChoice = function(clicked){
	(function(){
		var choices = document.getElementsByClassName("bttn");
//console.log(choices[0].style);
		for(var i=0; i<choices.length; i++){
			choices[i].style.visibility = "hidden";
		}
	})();
	comp.hand = getCompHand();
//console.log(comp.hand);
	player.hand = capFirst(clicked);
//console.log(player.hand);
	checkForWin();
};

const showScore = function(){
	if(player.wins!=0 || comp.wins!=0){
//var stuff = document.getElementsByClassName("stats");
//console.log(stuff[0].style);
		document.getElementsByClassName("stats")[0].style.visibility="visible";
		document.getElementById("score").innerHTML="The score is: "+player.name+" - "+player.wins+", and the Computer - "+comp.wins;
	}
};

const showResults = function(winr){
	var result = '';
	if(winr==0){
		result = "No winner, it is a tie each with "+player.hand;
		document.getElementsByClassName("stats")[0].style.visibility="visible";
		document.getElementById("results").innerHTML=result;
	} else if(winr==1){
		result = player.name+" wins with "+player.hand+" over "+comp.name+"'s "+comp.hand;
		document.getElementsByClassName("stats")[0].style.visibility="visible";
		document.getElementById("results").innerHTML=result;
	} else if(winr==-1){
		result = comp.name+" wins with "+comp.hand+" over "+player.name+"'s "+player.hand;
		document.getElementsByClassName("stats")[0].style.visibility="visible";
		document.getElementById("results").innerHTML=result;
	}
	document.getElementsByClassName("gameControl")[0].style.visibility="visible";
};

const checkForWin = function(){
	var winner = 0;
	if(player.hand===comp.hand){
		winner = 0;
//console.log("No winner, it is a tie each with "+player.hand);
	}	else if((player.hand==='Rock' && comp.hand==='Scissors') || (player.hand==='Paper' && comp.hand==='Rock')	|| (player.hand==='Scissors' && comp.hand==='Paper')){
		player.wins += 1;
		winner = 1;
//console.log(`${player.name} wins with ${player.hand} over ${comp.name}\`s ${comp.hand}`);
	} else {
		comp.wins += 1;
		winner = -1;
//console.log(`${comp.name} wins with ${comp.hand} over ${player.name}\`s ${player.hand}`);
	}
		showScore();
		showResults(winner);
};

const playAgain = function(more){
//console.log(more);
	if(more==="again"){
//console.log(document.getElementsByClassName("choices")[0]);
		document.getElementsByClassName("choices")[0].style.visibility="visible";
		(function(){
		var choices = document.getElementsByClassName("bttn");
		for(var i=0; i<choices.length; i++){
			choices[i].style.visibility = "visible";
		}
	})();
		document.getElementsByClassName("gameControl")[0].style.visibility="hidden";
		showChoices();
	} else if(more==="bye"){
		beDone();
	}
};

const beDone = function(){
	document.getElementsByClassName("info")[0].style.visibility="hidden";
	document.getElementsByClassName("stats")[0].style.visibility="hidden";	
	document.getElementById("again").style.visibility="hidden";
	document.getElementById("bye").style.visibility="hidden";
	document.getElementById("trigger").style.visibility="hidden";
	var byebye = "Hasta la vista, "+hands[parseInt(Math.random()*10)%3]+"-meister!";
	document.getElementById("hasta").innerHTML=byebye;
};