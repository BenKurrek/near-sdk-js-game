import React, { useState, useEffect } from "react";
import matchesTitle from './assets/matches-title/title2x.png';
import ActiveGameInfo from "./components/active-game-info";
import Instructions from "./components/instructions";
import MatchBoard from "./components/match-board";
import NewGame from "./components/newGame";


function encodeCall(contract, method, args) {
  return Buffer.concat([Buffer.from(contract), Buffer.from([0]), Buffer.from(method), Buffer.from([0]), Buffer.from(args)])
}

const App = ({ wallet, contractId }) => {
  const [loading, setLoading] = useState(false);
  const [currentState, setCurrentState] = useState({});
  const [currentTurn, setCurrentTurn] = useState("");
  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [isGameActive, setIsGameActive] = useState(1);

  const [selectedNumber, setSelectedNumber] = useState(0);
  const [selectedRow, setSelectedRow] = useState("");
  const [selectedMatchIndex, setSelectedMatchIndex] = useState(0);

  useEffect(async () => {
    console.log(contractId)
    if (wallet?.getAccountId()) {
      await getGameState();
    }
  }, []);

  const signIn = () => {
    wallet.requestSignIn(
      { contractId: "jsvm.testnet", methodNames: ['call_js_contract'] },
      "NEAR Status Message"
    );
  };

  const signOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };

  const resetSelection = () => {
    setSelectedNumber(0)
    setSelectedRow("")
    setSelectedMatchIndex(0)
  };

  const getGameState = async (movePlayed) => {
    try {
      let args = encodeCall(contractId, 'getState', '');
      const stateView = await wallet.account().viewFunction("jsvm.testnet", 'view_js_contract', args, {
        stringify: (val) => val,
      });

      if(movePlayed && stateView.isGameActive == 0) {
        alert(`${currentPlayer} Has Won The Game!`)
        location.reload();
      }

      if (stateView.currentTurn != currentTurn) {
        setCurrentState(stateView.boardState);
        setCurrentTurn(stateView.currentTurn);
        setPlayerOne(stateView.playerOne);
        setPlayerTwo(stateView.playerTwo);
        setCurrentPlayer(stateView.currentTurn == "1" ? stateView.playerOne : stateView.playerTwo)
        setIsGameActive(stateView.isGameActive);
      } else if(stateView.isGameActive == 1) {
        alert("no new turn detected...")
      }
    } catch (e) {
      setIsGameActive(0);
    }
  };

  const confirmSelection = async () => {
    setLoading(true)
    try {
      let args = encodeCall(contractId, 'play', `["${selectedRow}", ${selectedNumber}]`);
      const result = await wallet.account().functionCall({
        contractId: "jsvm.testnet",
        methodName: 'call_js_contract',
        args,
        gas: "300000000000000"
      });
      console.log('result: ', result)
      setLoading(false)
    } catch (e) {
      alert(e)
      setLoading(false)
    }
    getGameState(true);
  };

  return (
    <div>
      <h1 className="centered">
        <img src={matchesTitle} />
      </h1>
      <h5 className="centered">
        {contractId}
      </h5>
      <main className="row">
        <header className="left-panel">

          <Instructions />
          {wallet.getAccountId() ?
            <div>
              {isGameActive == 1 ?
                <div>
                  <ActiveGameInfo
                    wallet={wallet}
                    currentPlayer={currentPlayer}
                    isGameActive={isGameActive}
                    playerOne={playerOne}
                    playerTwo={playerTwo}
                    selectedNumber={selectedNumber}
                    selectedRow={selectedRow}
                  />
                  <div className="flex spaced">
                    <button onClick={confirmSelection} disabled={loading || selectedMatchIndex == 0}>
                      {wallet.getAccountId() == currentPlayer ?
                        loading ?
                          "Confirming..."
                          :
                          selectedMatchIndex == 0 ?
                            "Make A Selection.."
                            :
                            "Confirm Selection"
                        :
                        "Not Your Turn..."
                      }
                    </button>
                    <button onClick={resetSelection}>Reset Selection</button>
                  </div>
                  <h4>
                    Currently Signed In As: {wallet.getAccountId()}
                  </h4>
                  <div className="spaced">
                    <button onClick={signOut}>Log Out</button>
                    <button onClick={() => getGameState(true)}>Check For New Moves</button>
                  </div>
                </div>
                :
                <NewGame wallet={wallet} contractId={contractId} onNewGame={getGameState}/>
              }
            </div>
            :
          <div>
            <h4>
              Please Sign In To Play.
            </h4>
            <button onClick={signIn}>Log in</button>
          </div>

          }

        </header>
        <MatchBoard
          wallet={wallet}
          currentPlayer={currentPlayer}
          gameState={currentState}
          selectedNumber={selectedNumber}
          setSelectedNumber={setSelectedNumber}
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
          setSelectedMatchIndex={setSelectedMatchIndex}
          selectedMatchIndex={selectedMatchIndex}
        />
      </main>
    </div>

  );
};

export default App;