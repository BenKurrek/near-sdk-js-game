# NEAR-SDK-JS Nim Game

### Rules of the game
This contract is based on the popular game [nim](https://en.wikipedia.org/wiki/Nim). The rules are as follows.
- There are 5 rows of sticks. Row 1 has 1 stick, row 2 has 2, row 3 has 3, row 4 has 4, and row 5 has 5 as shown here:
<img width="238" alt="image" src="https://user-images.githubusercontent.com/57506486/167643849-649a7615-efe7-4212-b927-d9d37c0e2d71.png">
- There are two players and one player will go first. 
- You can take away as many sticks as you want from **one row at a time** and your turn is finished.
- The players will alternate turns and the one that ends up with the last stick loses.

## Quickstart Guide (enclave approach)

### Prerequisites

In order to successfully complete deploy this contract, you'll need to have a few things installed:
- [Node.js](https://nodejs.org/en/about/) and [npm](https://www.npmjs.com/):
```bash
curl -sL https://deb.nodesource.com/setup_17.x | sudo -E bash -  
sudo apt install build-essential nodejs
PATH="$PATH"
```
Ensure that they are both installed by running a version check:
```
node -v
npm -v
```

It's important to have the **newest** version of the NEAR-CLI installed such that you can make use of the javascript features. To install or update, run: 

```
npm install -g near-cli
```

### Deploying
It is tested on Ubuntu 20.04, Intel Mac, and M1.

First, you'll build the contract and set everything up.
- `yarn build`

You'll then need to deploy the contract using the following command. This will create a [dev account](https://docs.near.org/docs/concepts/account#dev-accounts) and deploy the contract to it.

```
near js dev-deploy --base64File build/contract.base64 --deposit 0.1
```
Alternatively, if you have an account already, you can specify the account you want to deploy to: 

```
near js deploy --accountId <YOUR_ACCOUNT_ID> --base64File build/contract.base64 --deposit 0.1
```

> **Note**: When deploying the smart contract using the enclave approach, it will live on top of a virtual machine smart contract that is deployed to `jsvm.testnet`. This will act as a "middleman" and to interact with your contract, you'll need to go through the `jsvm` contract.

### Playing the game

For simplicity, export the account ID that the contract is deployed to into an environment variable.

```bash
export NIM_ACCOUNT="dev-1653584404106-63749024395789"
```

You first need to initialize the contract and pass in who the two players will be. Those two players will be locked into the game until it is finished and only they can make moves. Run the following command, but replace the `PLAYER_ONE_ACCOUNT_ID` and `PLAYER_TWO_ACCOUNT_ID` with actual account IDs. 
```
near js call $NIM_ACCOUNT init '["PLAYER_ONE_ACCOUNT_ID", "PLAYER_TWO_ACCOUNT_ID"]' --accountId $NIM_ACCOUNT --deposit 0.1
```
You can check the state of the game at any moment with the following `getState` function (callable by anyone):

```
near js view $NIM_ACCOUNT getState
```
This will return something similar to: 
```
Log [jsvm.testnet]: Get state called!
Log [jsvm.testnet]: row1: 1
Log [jsvm.testnet]: row2: 2
Log [jsvm.testnet]: row3: 3
Log [jsvm.testnet]: row4: 4
Log [jsvm.testnet]: row5: 5
Log [jsvm.testnet]: player one: benjiman.testnet
Log [jsvm.testnet]: player two: dev-1653587120915-94331005877674
Log [jsvm.testnet]: current turn: 1
Log [jsvm.testnet]: game active: true
{ row1: 1, row2: 2, row3: 3, row4: 4, row5: 5 }
```

Player one will automatically start and you can call `play` to make a move. This function takes the name of the row as the first parameter and the number of sticks you want to take away as the second parameter. The valid rows are: 
- "row1", "row2", "row3", "row4", "row5". 
```
near js call $NIM_ACCOUNT play '["row1", 1]' --accountId benjiman.testnet
```
Once player one has gone, it will be player two's turn. When there is a total of exactly 1 stick left, the player who is left with that stick loses. At this point, the game is over and no longer playable. To start a new game, run the `newGame` function, once again passing in a player one and player two account ID. 

```
near js call $NIM_ACCOUNT newGame '["PLAYER_ONE_ACCOUNT_ID", "PLAYER_TWO_ACCOUNT_ID"]' --accountId $NIM_ACCOUNT
```