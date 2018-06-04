var User = function(state){
    
    if(state){
        this.currentState = state;
    }
    else{
        this.currentState = new TTTState();
        this.currentState.turn = "x";//"x";
        this.currentState.board = [
            "0","0","0",
            "0","0","0",
            "0","0","0"
        ];
    }
    //this.state.advanceTurn();

    
    
    
    this.markCell = function(element){
        var pos = GetPosition(element);
        var move = new CompMove(pos);
        var newState = move.applyActionToState(this.currentState);
        return newState;
    }

    function GetPosition(element){
        var id = element.id;
        var pos = id.substr(3);
        return pos;
    }
};