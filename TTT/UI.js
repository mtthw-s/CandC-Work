var UI = function(){
    this.DisplayState = function(state){
        for(var i = 0; i < 9; i++){
            document.getElementById("btn" + i).value = state.board[i];
        };
        return null;
    }
};