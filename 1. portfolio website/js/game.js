const gameModel = {
    currentPlayer: 1, //1 or 2        
    positionsOfPlayer1: [],
    positionsOfPlayer2: [],
    markStyle: ['X', 'O'],
    completeMoves: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]
};

const gameController = {
    init: function () {
        gameView.init();
    },
    restartGame: function () {
        //reset game Model
        gameModel.currentPlayer = 1;
        gameModel.positionsOfPlayer1 = [];
        gameModel.positionsOfPlayer2 = [];
        console.log(gameModel.positionsOfPlayer2);
    },
    isComplete: function (positions) {
        const sortedPositions = positions.sort();
        //Array parameters must be numbers
        //Match with predefined answer and return boolean
        for (const position of sortedPositions) {
            if (typeof position !== 'number') {
                throw new Error("Parameter must be a number array")
            }
        }

        for (const completeMove of gameModel.completeMoves) {
            if (completeMove.every(r => sortedPositions.includes(r))) {
                return true;
            }
        }

        return false;
    },
    changePlayer: function () {
        //toggle player
        if (gameModel.currentPlayer === 1) {
            gameModel.currentPlayer = 2;
        }
        else {
            gameModel.currentPlayer = 1;
        }
    },
    getCurrentPlayer: function () {
        //return current player
        return gameModel.currentPlayer;
    },
    getCurrentMarkStyle: function () {
        return gameModel.markStyle[this.getCurrentPlayer() - 1];
    },
    setPosition: function (index) {
        //throw error if input is smaller than 1 or larger than 9
        //throw error if input position is already selected by current user or opposition 
        //add a position to current player        
        if (index < 1 || index > 9) {
            console.log("here");
            throw new Error("Position out-of-range");
        }
        if (gameModel.positionsOfPlayer1.includes(index) || gameModel.positionsOfPlayer2.includes(index)) {
            throw new Error("Position already selected");
        }
        if (gameModel.currentPlayer === 1) {
            gameModel.positionsOfPlayer1.push(index);
        }
        else {
            gameModel.positionsOfPlayer2.push(index);
        }

    },
    selectPosition: function (index) {
        const position = parseInt(index);
        this.setPosition(position);
        let is_complete = false;
        if (this.getCurrentPlayer() === 1) {
            is_complete = this.isComplete(gameModel.positionsOfPlayer1);
        }
        else {
            is_complete = this.isComplete(gameModel.positionsOfPlayer2);
        }

        if (is_complete) {
            alert(`Player ${this.getCurrentPlayer()} win!!!`);
        }

        this.changePlayer();
    }
};

const gameView = {
    init: function () {
        this.restartGameBtn = document.querySelector("#btnRestart");
        this.currentPlayerLabel = document.querySelectorAll('.currentPlayer');
        this.inputs = document.querySelectorAll('#board input');   
        this.eventBinder();     
        this.render();
    },
    eventBinder : function(){

        this.restartGameBtn.addEventListener('click',()=>{
            gameController.restartGame();
            gameView.resetDisplay();
        });

        this.inputs.forEach(element => {
            element.addEventListener('click', (e) => {
                gameController.selectPosition(e.target.value);
                e.target.setAttribute("disabled", "disable");
                e.target.nextSibling.textContent = gameController.getCurrentMarkStyle();
                gameView.render();
            });
        });
    },
    resetDisplay : function(){
        this.inputs.forEach(element => {
            element.removeAttribute("disabled");
            element.nextSibling.textContent = "";
        });
    },
    render : function(){
        this.currentPlayerLabel.forEach(element=>{
            element.innerHTML = gameController.getCurrentPlayer();
        });
    }
}

