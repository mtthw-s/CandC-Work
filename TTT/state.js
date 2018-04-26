var State = function(state){
    this.currentMarker;
    this.board;
    this.currentState;
    var futureState;

    if(state){
        this.currentState = new State();
        this.currentState.board = state.board.slice(0);
    }

    this.CheckPlayerWon = function(mark, b){
        var marker = mark
        if(!marker){
            marker = this.currentMarker;
        }
        return checkWin(marker, b);
    };

    this.checkDraw = function(b){
        var _board = b;
        if(!_board){
            _board = this.board;
        }
        return draw(_board);
    }

    this.emptyCells = function(b){
        var brd = b;
        if(!brd){
            brd = this.board;
        }
        var cellIndexes = [];
		for(var i = 0; i < 9; i++){
			if(brd[i] == "_"){
				cellIndexes.push(i);
			}
		}
		return cellIndexes;
    };

    this.applyMove = function(cell, mark){
        this.board[cell] = mark;
    };

    //checks all possible row wins
	function winRow(marker, b){
        return CheckThree(marker, 0, 1, 2, b) || CheckThree(marker, 3, 4, 5, b) || CheckThree(marker, 6, 7, 8, b);
	}
	//checks all possible column wins
	function winColumn(marker, b){
		return CheckThree(marker, 0, 3, 6, b) || CheckThree(marker, 1, 4, 7, b) || CheckThree(marker, 2, 5, 8, b);
	}
	//checks all possible diagonal wins
	function winDiag(marker, b){
		return CheckThree(marker, 0, 4, 8, b) || CheckThree(marker, 2, 4, 6, b);
    }
    
    function draw(board){
        if(board.indexOf("_") < 0){
            return true;
        }
        else{
            return false;
        }
    }
	
	function checkWin(marker, b){
		return (winRow(marker, b) || winColumn(marker, b) || winDiag(marker, b))
    };
    
    function CheckThree(marker, c1, c2, c3, brd){
        var b = brd;
		if(!b){
            b = this.board;
        }
		
		return (b[c1] == marker && b[c2] == marker && b[c3] == marker);
	}
};