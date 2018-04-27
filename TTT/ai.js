var AI = function(s, m){
    var state = s;
    var marker = m;
    this.performMove = function(){
        var possibleMoves = state.emptyCells();
        var possibleStates = [];
        var m = marker;
        for(var i = 0; i < possibleMoves.length; i++){
            var score = 0;
            var count = 0;
            possibleStates.push({move: possibleMoves[i], score: CalculateMove2(possibleMoves[i], score, state.board, marker, count)});
            
        }

        possibleStates.sort(function(a,b){
            return b.score - a.score;
        });
        var moveCell = possibleStates[0].move;
        //var moveCell = GetWinningCell(possibleMoves);
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

    var sortAscending = function(first, second){
        if(first.score < second.score){
            return -1;
        }
        else if(first.score > second.score){
            return 1
        }
        else{
            return 0;
        }
    };

    var CalculateMove2 = function(move, score, brd, mark, count){
        if(mark == marker){
            count++;
        }
        var newBoard = brd.slice(0);
        newBoard[move] = mark;
        if(state.CheckPlayerWon(mark, newBoard)){
            if(mark == marker){
                score += (10 - count);
            }
            else{
                score -= (10 - count);
            }
        }
        if(state.checkDraw(newBoard)){
            score += 0;
        }
        if(count == 3){
            return score;
        }
        var moves = state.emptyCells(newBoard);
        if(mark == marker){
            mark = "x";
        }
        else{
            mark = marker;
        }

        for(var i = 0; i < moves.length; i++){
            score += CalculateMove2(moves[i], score, newBoard, mark, count);
        }
        return score;


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