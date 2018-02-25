var player = 0;
var player1 = "X", player2 = "O";
var winningCombinations = [[1,2,3],
                           [1,5,9],
                           [1,4,7],
                           [2,5,8],
                           [3,6,9],
                           [3,5,7],
                           [4,5,6],
                           [7,8,9]
                          ];
var count = 0;
//var compID = 0;
var playedCells = [];
function setup(){
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  var spacerHeight = w/3;
  spacerHeight = h - spacerHeight;
  spacerHeight /= 2;
  $(".spacer").css({"min-height":spacerHeight + "px"});
  $("#xo").hide();
  $(".game").hide();
  $("#player1").hide();
  $("#player2").hide();
}

function checkWin(){
  for( var j = 0; j < winningCombinations.length; j++ ){
    var matches = 0;
    for( var i = (playedCells.length - 1); i >= 0; i = i - 2 ){
      if ( winningCombinations[j].indexOf(Number(playedCells[i])) >= 0 ){
        console.log(matches);
        matches++;
      }
    }
    if(matches == 3) {
      return 1;
    } 
  } 
}

function resetGame() {
  for( var i = 1; i<=9; i++ ) {
    document.getElementById(i).innerHTML = "";  
  }  
  playedCells = [];
  count = 0;
  isWin = 0;
  $("#playersNum").show();
  $(".game").hide();
  $("#player1").hide();
  $("#player2").hide();
}

function computerPlays() {
  console.log("Computer is Playing");
  var toPlay = Math.floor(Math.random() * (8) + 1);
  console.log("PlayedCells: " + playedCells);
  console.log("toPlay: " + toPlay);
  console.log("IndexOf" + playedCells.indexOf(Number(toPlay)));
  while (playedCells.indexOf(Number(toPlay)) >= 0){
    console.log("played cells: " + playedCells);
    toPlay = Math.floor((Math.random() * (8)) + 1);
    console.log("toPlay: " + toPlay);
  }
  console.log(Number(toPlay));
  return toPlay;
  //console.log("")
}

$(document).ready(function(){
  setup();
  $("#single").on("click", function(){
    player = 1;
    $("#playersNum").hide();
    $("#xo").show(500);
  });
  $("#double").on("click", function(){
    player = 2;
    $("#playersNum").hide();
    $("#xo").show(500);
  });
  $("#cross").on("click", function(){
    player1 = "X";
    player2 = "O";
    $("#xo").hide();
    $(".game").show(500);
  });
  $("#naught").on("click", function(){
    player1 = "O";
    player2 = "X";
    $("#xo").hide();
    $(".game").show(500);
  });
  $(".cell").on("click",function(){
    var isWin = 0;
    var myID = $(this).children().attr('id');
    if( playedCells.indexOf(Number(myID)) >= 0 ) {
      window.alert("You can't play the cell which has already been played");
      window.alert("You really thought I wouldn't have thought of that!");
      return;
    }
    console.log(myID);
    if ( player == 1 ){
      console.log("Player1: " + player1);
      console.log("Player2: " + player2);
      document.getElementById(myID).innerHTML = player1;
      playedCells.push(Number(myID));
      count++;
      if(count >= 5){
        isWin = checkWin();
        if(isWin == 1){
          window.alert(document.getElementById(myID).innerHTML + " WINS !! ");
          resetGame();
          return;
        }
      }
      var compID = computerPlays();
      document.getElementById(compID).innerHTML = player2;
      playedCells.push(Number(compID));
      count++;
      console.log("PlayedCells after computer plays " + playedCells);
      if(count >= 5){
        isWin = checkWin();
        if(isWin == 1){
          window.alert(document.getElementById(compID).innerHTML + " WINS !! ");
          resetGame();
          return;
        }
      }
    } else if ( player == 2 ){
      if ( count%2==0 ){
        document.getElementById(myID).innerHTML = player1;  
        playedCells.push(Number(myID));
        $("#player1").hide();
        $("#player2").show();
      } else {
        document.getElementById(myID).innerHTML = player2;
        playedCells.push(Number(myID));
        $("#player2").hide();
        $("#player1").show();
      }
      count++;
      if(count >= 5){
        isWin = checkWin();
        if(isWin == 1){
          window.alert(document.getElementById(myID).innerHTML + " WINS !! ");
          resetGame();
          return;
        }
      }
      if( count >= 9 ){
        window.alert("Game Draw");
        resetGame();
      }
    }
  });
});