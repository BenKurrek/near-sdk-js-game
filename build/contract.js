function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object.keys(descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object.defineProperty(target, property, desc);
    desc = null;
  }

  return desc;
}

function call(target, name, descriptor) {
  return descriptor;
}
function view(target, name, descriptor) {
  return descriptor;
}
function NearBindgen(Class) {
  let OriginalClass = Class;

  let NewClass = function () {
    let args = OriginalClass.deserializeArgs();
    let ret = new OriginalClass(...args);
    ret.serialize();
    return ret;
  };

  NewClass.prototype = OriginalClass.prototype;

  NewClass._get = function () {
    let ret = Object.create(NewClass.prototype);
    return ret;
  };

  return NewClass;
}

class NearContract {
  deserialize() {
    let hasRead = env.jsvm_storage_read('STATE', 0);

    if (hasRead != 0) {
      let state = env.read_register(0);
      Object.assign(this, JSON.parse(state));
    } else throw new Error('Contract state is empty');
  }

  serialize() {
    env.jsvm_storage_write('STATE', JSON.stringify(this), 0);
  }

  static deserializeArgs() {
    env.jsvm_args(0);
    let args = env.read_register(0);
    return JSON.parse(args || '[]');
  }

  static serializeReturn(ret) {
    return JSON.stringify(ret);
  }

}

function predecessorAccountId() {
  env.predecessor_account_id(0);
  return env.read_register(0);
}

var _class, _class2;

function assert(b, str) {
  if (b) {
    return;
  } else {
    throw Error("assertion failed: " + str);
  }
}

let NimContract = NearBindgen(_class = (_class2 = class NimContract extends NearContract {
  constructor(playerOne, playerTwo) {
    //execute the NEAR Contract's constructor
    super(); //set default values for the board state of the game. 

    this.boardState = {
      "row1": 1,
      "row2": 2,
      "row3": 3,
      "row4": 4,
      "row5": 5
    }; //keep track of which players are playing the game

    this.playerOne = playerOne;
    this.playerTwo = playerTwo; //keep track of whose turn it is currently. This defaults to P1 starting.

    this.currentTurn = 1; //keep track of whether or not a game is active or not

    this.isGameActive = true;
  }
  /*
      Function to make a move. Pass in a row and a number of sticks to remove.
      predecessor must be the current player.
  */


  play(row, number) {
    //perform necessary assertions before moving on with the core logic
    assert(this.isGameActive == true, "game must be active in order to play.");
    assert(number > 0, "must pass in a valid number of sticks to remove.");
    assert(row in this.boardState, "must pass in a valid row.");
    assert(this.boardState[row] >= number, "cannot remove more sticks than what is available in the row."); //get the current player 

    let currentPlayer = this.currentTurn == 1 ? this.playerOne : this.playerTwo; //get the predecessor and make sure they are the current player.

    let pred = predecessorAccountId();
    assert(pred == currentPlayer, "only the active player whose turn it is can make a move"); //decrement the passed in number of sticks from the passed in row.

    this.boardState[row] -= number;
    env.log(`game state at row after decrementing: ${this.boardState[row]}`); //keep track of the total amount of sticks left in the game after the decrement.

    let totalLeft = 0;

    for (const row in this.boardState) {
      env.log(`${row}: ${this.boardState[row]}`);
      totalLeft += this.boardState[row];
    } //if there is only 1 stick left after making the move, the current player has won the game.


    if (totalLeft == 1) {
      env.log(`${this.currentTurn == 1 ? this.playerOne : this.playerTwo} has won the game!`);
      this.isGameActive = false;
      return;
    } else {
      env.log(`There are ${totalLeft} left`);
    }

    this.currentTurn = this.currentTurn % 2 + 1;
    env.log(`current turn after switching ${this.currentTurn}`);
  }
  /*
      start a new game. this can only be called if there is no game active.
  */


  newGame(playerOne, playerTwo) {
    assert(this.isGameActive == false, "cannot start a new game when one is currently active"); //set default values for the board state of the game. 

    this.boardState = {
      "row1": 1,
      "row2": 2,
      "row3": 3,
      "row4": 4,
      "row5": 5
    }; //keep track of which players are playing the game

    this.playerOne = playerOne;
    this.playerTwo = playerTwo; //keep track of whose turn it is currently. This defaults to P1 starting.

    this.currentTurn = 1; //keep track of whether or not a game is active or not

    this.isGameActive = true;
  }
  /*
      get the current state of the smart contract. This includes:
      full board state, player 1, 2, current turn, whether the game is active or not.
  */


  getState() {
    env.log("Get state called!");

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

}, (_applyDecoratedDescriptor(_class2.prototype, "play", [call], Object.getOwnPropertyDescriptor(_class2.prototype, "play"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "newGame", [call], Object.getOwnPropertyDescriptor(_class2.prototype, "newGame"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getState", [view], Object.getOwnPropertyDescriptor(_class2.prototype, "getState"), _class2.prototype)), _class2)) || _class;

function init() {
  new NimContract();
}
function getState() {
  let _contract = NimContract._get();

  _contract.deserialize();

  let args = _contract.constructor.deserializeArgs();

  let ret = _contract.getState(...args);
  if (ret !== undefined) env.jsvm_value_return(_contract.constructor.serializeReturn(ret));
}
function newGame() {
  let _contract = NimContract._get();

  _contract.deserialize();

  let args = _contract.constructor.deserializeArgs();

  let ret = _contract.newGame(...args);

  _contract.serialize();

  if (ret !== undefined) env.jsvm_value_return(_contract.constructor.serializeReturn(ret));
}
function play() {
  let _contract = NimContract._get();

  _contract.deserialize();

  let args = _contract.constructor.deserializeArgs();

  let ret = _contract.play(...args);

  _contract.serialize();

  if (ret !== undefined) env.jsvm_value_return(_contract.constructor.serializeReturn(ret));
}

export { getState, init, newGame, play };
//# sourceMappingURL=contract.js.map
