var Game = function(computer){

    this.ai = computer;
    this.currentState = new State();
    this.currentState.board = [
        "0","0","0",
        "0","0","0",
        "0","0","0"
    ];
    this.currentState.turn = "x";
    this.status = "begining";

    this.advanceTo = function(s){
        this.currentState = s;
        if(s.isTerminal()){
            this.status = "Ended"
            if(s.result == "x"){
                console.log("X won");
            }
            else if(s.result == "x"){
                console.log("O won");                
            }
            else{
                console.log("draw");                
            }
        }
        else{
            if(this.currentState == "x"){
                //Human move
            }
            else{
                this.ai.move("x")
            }
        }
    };

    this.StartGame = function(){
        if(this.status == "begining"){
            this.advanceTo(this.currentState);
            this.status = "running";
        }
    }
};
Game.score = function(state){
    if(state.result == "x"){
        return 10 - state.oMovesCount;
    }
    else if(state.result == "o"){
        return -10 + state.oMovesCount;
    }
    else{
        return 0;
    }
}