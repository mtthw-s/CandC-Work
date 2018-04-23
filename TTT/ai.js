
var CompMove = function(pos){
	this.movePosition = pos;
	this.minimaxVal = 0;
	
	this.applyActionToState = function(state){
		var nextState = new State(state);
		nextState.board[this.movePosition] = state.turn;
		
		if(state.turn == "o"){
			next.oMovesCount++;
		}
		nextState.advanceTurn();
		
		return nextState;
	};
};

CompMove.sortAscending = function(first, second){
	if(first.minimaxVal < second.minimaxVal){
		return -1;
	}
	else if(first.minimaxVal > second.minimaxVal){
		return 1
	}
	else{
		return 0;
	}
};

CompMove.sortAscending = function(first, second){
	if(first.minimaxVal < second.minimaxVal){
		return 1;
	}
	else if(first.minimaxVal > second.minimaxVal){
		return -1
	}
	else{
		return 0;
	}
};


var AI = function(){
	
	var game = {};
	
	function minimaxVal(state){
		if(state.GameOver()){
			return Game.score(state);
		}
		else{
			var stateScore;
			
			if(state.turn == "x"){
				stateScore = -10;
			}
			else{
				stateScore = 10;
			}
			var avaliblePositions = state.emptyCells();
			
			var availibleNextStates = avaliblePositions.map(function(pos){
				var action = new CompMove.applyTo(state);
				var nextState = action.applyTo(state);
				return nextState;
			});
			
			availibleNextStates.forEach(function(nextState){
				var nextScore = minimaxVal(nextState);
				if(state.turn == "x"){
					if(nextScore > stateScore){
						stateScore = nextScore;
					}
					
				}
				else{
					if(nextScore < stateScore){
						stateScore = nextScore;
					}
				}
			});
			return stateScore;
		}
	};
	
	function takeMove(turn){
		var avalible = game.currentState.emptyCells();
		var avalibleActions = avalible.map(function(pos){
			var action = new CompMove(pos);
			var next = action.applyTo(game.currentState);
			action.minimaxVal = minimaxVal(next);
			return action;
		});
		if(turn == "x"){
			avalibleActions.sort(CompMove.sortAscending);
		}
		else{
			avalibleActions.sort(CompMove.sortDescending);
		}
		var choseAction = avalibleActions[0];
		var next = chosenAction.applyTo(game.currentState);
		//TODO insert UI action here
		game.advanceTo(next);
	};
	
	this.plays = function(g){
		game = g;
	};
	
	this.move = function(turn){
		takeMove(turn);
	};
	
	
};
