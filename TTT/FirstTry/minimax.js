function MiniMax(){
	this.board = ["0","0","0",
				  "0","0","0",
				  "0","0","0"];
	
	this.player = "x";
	this.comp = "o";
	
	
	this.play = function(){
		while(this.checkWin(this.player) || this.checkWin(this.player) || this.checkFullBoard(this.board)){	
			this.compMove(this.board, "x");			
			this.compMove(this.board, "o");
		}

	};
	
	this.PlayerMove = function(cell){
		if(this.board[cell] != "0"){
			return;
		}
		this.board[cell] = this.player;
		if(this.checkWin(this.player)){
			//Win and finish the game
			Console.log(this.player + " wins");
			debugger;
		}
		else if(this.checkFullBoard(this.board)){
			//the game is a tie!
			Console.log("Tie");
			debugger;
		}
		return this.player;
	};
	
	this.checkFullBoard = function(state){
		if(state.indexOf("0") > -1){
			return false;
		}
		return true;
	};
	
	this.getMax = function(state, score, marker){
		if(checkWin(this.comp, state)){
			return score += 10;
		}
		else if(checkWin(this.player, state)){
			return score -= 10;
		}
		else if(checkFullBoard(state)){
			return score += 0;
		}

		for(var i = 0; i < state.length; i++){
			if(state[i] == "0"){
				if(marker == this.comp){
					state[i] = this.player;
					score += this.getMax(state, score, this.player);
				}
				else{
					state[i] = this.comp;
					score += this.getMax(state, score, this.comp);
				}
			}
		}	
		
	}
	
	this.compMove = function(state, mark){
		var marker = this.comp;
		if(!mark){
			marker = mark;
		}
		var states = [];
		var score = 0;
		var count = 0;
		var curState = state;
		for(var i = 0; i < state.length; i++){
			if(state[i] == "0"){
				count++;
				state[i] = marker;
				score = this.getMax(state, score, marker);
				states.push({st: state, sc: score});
				console.log(state.join(',') + " : " + score);
			}
		}
		states.sort(this.compare);
		var highest = this.GetHighestState(states);
		this.board = highest.st;
		if(this.checkWin(marker)){
			//Win and finish the game
			Console.log(marker + " wins");
			debugger;
		}
		else if(this.checkFullBoard(this.board)){
			//the game is a tie!
			Console.log("Tie");
			debugger;
		}
		
		
	};
	
	this.GetHighestState = function(states){
		var max = Math.max.apply(null, objects.map(function(o) { return o.sc; }));
		return states.filter(function(o) { return o.sc === max; })[0];
	}
	
	this.compare = function(a,b) {
	  if (a.sc < b.sc)
		return -1;
	  if (a.sc > b.sc)
		return 1;
	  return 0;
	};
	
	
	
	
	//******************************Win checking functionality********************************//
	this.checkWin = function(marker, state){
		var s;
		if(state)
			s = state
		return (this.winRow(marker, s) || this.winColumn(marker, s) || this.winDiag(marker, s))
	};
	
	//check to see if any three cells contain the players marker, inputs marker, and 3 int values refering to ordinals of cells in the board
	this.CheckThree = function(marker, c1, c2, c3, state){
		var b;
		if(state)
			b = state;
		else
			b = this.board;
		
		return (b[c1] == marker && b[c2] == marker && b[c3] == marker);
	}
	//checks all possible row wins
	this.winRow = function(marker, state){
		var s;
		if(state)
			s = state
		return this.CheckThree(marker, 0, 1, 2, s) || this.CheckThree(marker, 3, 4, 5, s) || this.CheckThree(marker, 6, 7, 8, s);
	}
	//checks all possible column wins
	this.winColumn = function(marker, state){
		var s;
		if(state)
			s = state
		return this.CheckThree(marker, 0, 3, 6, s) || this.CheckThree(marker, 1, 4, 7, s) || this.CheckThree(marker, 2, 5, 8, s);
	}
	//checks all possible diagonal wins
	this.winDiag = function(marker, state){
		var s;
		if(state)
			s = state
		return this.CheckThree(marker, 0, 4, 8, s) || this.CheckThree(marker, 2, 4, 6, s);
	}
	
};
