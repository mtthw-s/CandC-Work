var State = function(old){
	
	this.turn = "";
	this.oMovesCount = 0;
	this.result = "running";
	this.board = [];
	
	if(old){
		var len = old.board.length;

		//clone the old board to the new board
		this.board = old.board.slice(0);
		this.oMovesCount = old.oMovesCount;
		this.result = old.result;
		this.turn = old.turn;
	}
	
	this.advanceTurn = function(){
		if(this.turn == "x"){
			this.turn = "o";
		}
		else{
			this.turn = "x";
		}
	};
	
	this.emptyCells = function(){
		var cellIndexes = [];
		for(var i = 0; i < 9; i++){
			if(this.board[i] == "0"){
				cellIndexes.push(i);
			}
		}
		return cellIndexes;
	};

	this.printBoard = function(newLine){
		var str = "";
		if(newLine){
			var b = [this.board.slice(0, 3), this.board.slice(3, 6), this.board.slice(6, 9)];
			for(var i = 0; i < b.length; i++){
				for(var j = 0; j < b[i].length; j++){
					str += b[i][j] + " ";
				}
				str += "\n";
			}
		}
		else{
			str = this.board.join(', ')
		}
		
		return str;
	};
	
	//checks any three cells to see if they match the given marker
	function CheckThree(marker, c1, c2, c3, state){
		var b;
		if(state)
			b = state;
		else
			b = this.board;
		
		return (b[c1] == marker && b[c2] == marker && b[c3] == marker);
	}
	
	//checks all possible row wins
	function winRow(marker, state){
		var s;
		if(state)
			s = state
		return CheckThree(marker, 0, 1, 2, s) || CheckThree(marker, 3, 4, 5, s) || CheckThree(marker, 6, 7, 8, s);
	}
	//checks all possible column wins
	function winColumn(marker, state){
		var s;
		if(state)
			s = state
		return CheckThree(marker, 0, 3, 6, s) || CheckThree(marker, 1, 4, 7, s) || CheckThree(marker, 2, 5, 8, s);
	}
	//checks all possible diagonal wins
	function winDiag(marker, state){
		var s;
		if(state)
			s = state
		return CheckThree(marker, 0, 4, 8, s) || CheckThree(marker, 2, 4, 6, s);
	}
	
	function checkWin(marker, board){
		var s;
		if(board)
			s = board
		return (winRow(marker, s) || winColumn(marker, s) || winDiag(marker, s))
	};
	
	this.GameOver = function(){
		var B = this.board;
		var marker = this.turn;
		if(checkWin(marker, B)){
			this.result = marker;
			return true;
		};
		
		var avalible = this.emptyCells();
		if(avalible.length == 0){
			this.result = marker;
			return true;
		}
		else{
			return false;
		}
		
	}
	
};