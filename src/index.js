import {NearContract, NearBindgen, call, view, near} from 'near-sdk-js'

//function for asserting a statement
function assert(b, str)
{
    if (b) {
        return;
    } else {
        throw Error("assertion failed: " + str);
    }
}

@NearBindgen
class NimContract extends NearContract {
    constructor(playerOne, playerTwo) {
        //execute the NEAR Contract's constructor
        super()
        //set default values for the board state of the game. 
        this.boardState = {
            "row1": 1,
            "row2": 2,
            "row3": 3,
            "row4": 4,
            "row5": 5
        }
        //keep track of which players are playing the game
        this.playerOne = playerOne
        this.playerTwo = playerTwo

        //keep track of whose turn it is currently. This defaults to P1 starting.
        this.currentTurn = 1;

        //keep track of whether or not a game is active or not
        this.isGameActive = true;
    }

    /*
        Function to make a move. Pass in a row and a number of sticks to remove.
        predecessor must be the current player.
    */
    @call
    play(row, number) {
        //perform necessary assertions before moving on with the core logic
        assert(this.isGameActive == true, "game must be active in order to play.")
        assert(number > 0, "must pass in a valid number of sticks to remove.")
        assert(row in this.boardState, "must pass in a valid row.")
        assert(this.boardState[row] >= number, "cannot remove more sticks than what is available in the row.")

        //get the current player 
        let currentPlayer = this.currentTurn == 1 ? this.playerOne : this.playerTwo
        //get the predecessor and make sure they are the current player.
        let pred = near.predecessorAccountId();
        assert(pred == currentPlayer, "only the active player whose turn it is can make a move")

        //decrement the passed in number of sticks from the passed in row.
        this.boardState[row] -= number
        env.log(`game state at row after decrementing: ${this.boardState[row]}`)

        //keep track of the total amount of sticks left in the game after the decrement.
        let totalLeft = 0;
        for (const row in this.boardState) {
            env.log(`${row}: ${this.boardState[row]}`);
            totalLeft += this.boardState[row];
        }

        //if there is only 1 stick left after making the move, the current player has won the game.
        if(totalLeft == 1) {
            env.log(`${this.currentTurn == 1 ? this.playerOne : this.playerTwo} has won the game!`);
            this.isGameActive = false;
            return
        } else {
            env.log(`There are ${totalLeft} left`);
        }

        this.currentTurn = this.currentTurn % 2 + 1
        env.log(`current turn after switching ${this.currentTurn}`)
    }

    /*
        start a new game. this can only be called if there is no game active.
    */
    @call
    newGame(playerOne, playerTwo) {
        assert(this.isGameActive == false, "cannot start a new game when one is currently active")

        //set default values for the board state of the game. 
        this.boardState = {
            "row1": 1,
            "row2": 2,
            "row3": 3,
            "row4": 4,
            "row5": 5
        }
        //keep track of which players are playing the game
        this.playerOne = playerOne
        this.playerTwo = playerTwo

        //keep track of whose turn it is currently. This defaults to P1 starting.
        this.currentTurn = 1;

        //keep track of whether or not a game is active or not
        this.isGameActive = true;
    }

    /*
        get the current state of the smart contract. This includes:
        full board state, player 1, 2, current turn, whether the game is active or not.
    */
    @view
    getState() {
        env.log("Get state called!")
        for (const row in this.boardState) {
            env.log(`${row}: ${this.boardState[row]}`);
        }
        env.log(`player one: ${this.playerOne}`);
        env.log(`player two: ${this.playerTwo}`);
        env.log(`current turn: ${this.currentTurn}`);
        env.log(`game active: ${this.isGameActive}`);

        let state = {};
        state["boardState"] = this.boardState;
        state["playerOne"] = this.playerOne;
        state["playerTwo"] = this.playerTwo;
        state["currentTurn"] = this.currentTurn;
        state["isGameActive"] = this.isGameActive;

        return state;
    }
}