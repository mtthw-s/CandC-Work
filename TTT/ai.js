var AI = function(s, m){
    var state = s;
    var marker = m;
    this.performMove = function(){
        var possibleMoves = state.emptyCells();
        var moveCell = GetWinningCell(possibleMoves);
        if(moveCell != null){
            state.board[moveCell] = marker;
            return state;
        }
        moveCell = GetBlockingCell(possibleMoves);
        if(moveCell != null){
            state.board[moveCell] = marker;
            return state;
        }
        moveCell = CalculateMove(possibleMoves);
        if(moveCell != null){
            state.board[moveCell] = marker;
            return state;
        }
    };

    var GetWinningCell = function(moves){
        for(var i = 0; i < moves.length; i++){
            var newBoard = state.board.slice(0);
            newBoard[moves[i]] = marker;
            var won = state.CheckPlayerWon(marker, newBoard);
            if(won){
                return moves[i];
            }
        }
        return null;
    };
    var GetBlockingCell = function(moves){
        for(var i = 0; i < moves.length; i++){
            var newBoard = state.board.slice(0);
            newBoard[moves[i]] = "x";
            if(state.CheckPlayerWon("x", newBoard)){
                return moves[i];
            }
        }
        return null;
    };
    var removeFrompossible = function(possible, cell){
        var index = possible.indexOf(cell);
        if (index > -1) {
            possible.splice(index, 1);
        }
        return possible;
    };
    //This needs work.  This should be the brains of the app
    var CalculateMove = function(moves){
        if(moves.includes(4)){
            return 4;
        }
        if(moves.includes(0) && moves.includes(8)){
            moves = removeFrompossible(moves, 0);
            moves = removeFrompossible(moves, 8);
            CalculateMove(moves);
        }
        if(moves.includes(2) && moves.includes(6)){
            moves = removeFrompossible(moves, 2);
            moves = removeFrompossible(moves, 6);
            CalculateMove(moves);
        }
        return moves[GetRandomNumber(moves.length - 1)];
    }

    var GetRandomNumber = function(max){
        var min = Math.ceil(0);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};