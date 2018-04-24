var getCurrentBoard = function(){
    var currentBoard = [];
    //var buttons = document.getElementsByClassName("btn");
    for(var i = 0; i < 9; i++){
        currentBoard.push(getElementById("btn" + i).value);
    }
    return currentBoard;
};

var UserClicked = function(ele){
    ele.value = "x";
    currentBoard = getCurrentBoard();
    var state = new State();

    var ai = new AI();
    var game = new Game(ai);
    ai.plays(game);
    
}