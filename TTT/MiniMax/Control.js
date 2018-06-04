var getCurrentBoard = function(){
    var currentBoard = [];
    //var buttons = document.getElementsByClassName("btn");
    for(var i = 0; i < 9; i++){
        currentBoard.push(document.getElementById("btn" + i).value);
    }
    return currentBoard;
};

var UserClicked = function(ele){
    //ele.value = "x";
    currentBoard = getCurrentBoard();
    var state = new TTTState();
    state.board = currentBoard;
    state.turn = "x"
    var user = new User(state);
    var state = user.markCell(ele);
    var ui = new TTTUI();
    var ai = new TTTAI();
    var game = new Game(ai, state);
    ai.plays(game);
    state = ai.move("o");
    ui.DisplayState(state);

    
}