var User = function(mark){
    this.marker = mark;

    this.PerformMove = function(state, cell){
        state.applyMove(cell, this.marker);
        return state;
    }
}