# NEAR-SDK-JS Nim Game

## Quickstart Guide
It is tested on Ubuntu 20.04, Intel Mac, and M1.

First, you'll build the contract and set everything up.
1. Make sure you have wget, make, cmake and nodejs. On Linux, also make sure you have gcc.
2. `./setup.sh`
3. `cd sdk && npm i && cd ..`
4. `cd nim-game && npm i && ./build.sh`
5. `export JSVM_ACCOUNT="jsvm.testnet"`

You now need to create an account to deploy the contract to. This can be an existing account or a new one.  
6. `export NIM_ACCOUNT="YOUR_ACCOUNT_ID_HERE"`

7. `cd .. && near call $JSVM_ACCOUNT deploy_js_contract --accountId $NIM_ACCOUNT --base64 --args $(cat nim-game/build/nim.base64) --deposit 1`


### Rules of the game
This contract is based on the popular game [nim](https://en.wikipedia.org/wiki/Nim). The rules are as follows.
- There are 5 rows of sticks. Row 1 has 1 stick, row 2 has 2, row 3 has 3, row 4 has 4, and row 5 has 5 as shown here:
<img width="238" alt="image" src="https://user-images.githubusercontent.com/57506486/167643849-649a7615-efe7-4212-b927-d9d37c0e2d71.png">
- There are two players and one player will go first. 
- You can take away as many sticks as you want from **one row at a time** and your turn is finished.
- The players will alternate turns and the one that ends up with the last stick loses.

### Playing the game
You first need to initialize the contract and pass in who the two players will be. Those two players will be locked into the game until it is finished and only they can make moves. Run the following command, but replace the `PLAYER_ONE_ACCOUNT_ID` and `PLAYER_TWO_ACCOUNT_ID` with actual account IDs. 
```
near call $JSVM_ACCOUNT call_js_contract --accountId $NIM_ACCOUNT --args $(node encode_call.js $NIM_ACCOUNT init '["PLAYER_ONE_ACCOUNT_ID", "PLAYER_TWO_ACCOUNT_ID"]') --base64 --amount 1
```

Player one will automatically start and you can call `play` to make a move. This function takes the name of the row as the first parameter and the number of sticks you want to take away as the second parameter. The valid rows are: 
- "row1", "row2", "row3", "row4", "row5". 
```
near call $JSVM_ACCOUNT call_js_contract --accountId $PLAYER_ONE_ACCOUNT_ID --args $(node encode_call.js $NIM_ACCOUNT play '["row1", 1]') --base64 --amount 1
```
Once player one has gone, it will be player two's turn. You can check the state of the game at any moment with the following `getState` function (callable by anyone):

```
near call $JSVM_ACCOUNT call_js_contract --accountId $NIM_ACCOUNT --args $(node encode_call.js $NIM_ACCOUNT getState '') --base64 --amount 1
```

Once there is a total of exactly 1 stick left, the player who is left with that stick loses. At this point, the game is over and no longer playable. To start a new game, run the `newGame` function, once again passing in a player one and player two account ID. 

```
near call $JSVM_ACCOUNT call_js_contract --accountId $NIM_ACCOUNT --args $(node encode_call.js $NIM_ACCOUNT newGame '["PLAYER_ONE_ACCOUNT_ID", "PLAYER_TWO_ACCOUNT_ID"]') --base64 --amount 1
```
