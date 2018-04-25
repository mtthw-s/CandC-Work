
var CompMove = function(pos){
	this.movePosition = pos;
	this.minimaxVal = 0;
	
	this.applyActionToState = function(state){
		var nextState = new State(state);
		nextState.board[this.movePosition] = state.turn;
		
		if(state.turn == "o"){
			nextState.oMovesCount++;
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
				var action = new CompMove(pos);
				var nextState = action.applyActionToState(state);
				return nextState;
			});
			
			availibleNextStates.forEach(function(nextState){
				var nextScore = minimaxVal(nextState);
				if(state.turn == "o"){
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

	
	
	function takeMove(turn, g){
		var avalible = game.currentState.emptyCells();
		var avalibleActions = avalible.map(function(pos){
			var action = new CompMove(pos);
			var next = action.applyActionToState(game.currentState);
			action.minimaxVal = minimaxVal(next);
			return action;
		});
		if(turn == "o"){
			avalibleActions.sort(CompMove.sortAscending);
		}
		else{
			avalibleActions.sort(CompMove.sortDescending);
		}
		var chosenAction = avalibleActions[0];
		var next = chosenAction.applyActionToState(game.currentState);
		//TODO insert UI action here
		return game.advanceTo(next);
		//return next;
	};
	
	this.plays = function(g){
		game = g;
	};
	
	this.move = function(turn){
		return takeMove(turn);
	};
	
	
};
