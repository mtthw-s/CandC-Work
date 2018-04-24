var Game = function(computer, state){

    this.ai = computer;
    
    if(state){
        this.currentState = state;
    }
    else{
        this.currentState = new State();
        this.currentState.turn = "x";//"x";
        this.currentState.board = [
            "0","0","0",
            "0","0","0",
            "0","0","0"
        ];
    }
    
    this.status = "begining";

    this.advanceTo = function(s){
        this.currentState = s;
        if(s.GameOver()){
            this.status = "Ended"
            if(s.result == "x"){
                alert("X won");
                this.status = "ended";
                return;
            }
            else if(s.result == "o"){
                alert("O won"); 
                this.status = "ended";
                return;        
            }
            else{
                alert("draw");                
                this.status = "ended";
                return;
            }
        }
        else{
            if(this.currentState.turn == "x"){
                //Human move
                return;
                var str = this.currentState.printBoard(true);
                var input = prompt(str, this.currentState.printBoard(false));
                this.currentState.board = input.split(',');
                //this.currentState.turn = "o";
                this.advanceTo(this.currentState);
                //this.ai.move("x");                
            }
            else{
                this.ai.move("o");
            }
        }
    };

    this.StartGame = function(){
        if(this.status == "begining"){
            this.advanceTo(this.currentState);
            this.status = "running";
        }
        while(this.status = "running"){
            this.advanceTo(this.currentState);
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