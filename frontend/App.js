import React, { useState, useEffect } from "react";
import matchesTitle from './assets/matches-title/title2x.png';
import Match from "./components/match";
import MatchBoard from "./components/match-board";


function encodeCall(contract, method, args) {
  return Buffer.concat([Buffer.from(contract), Buffer.from([0]), Buffer.from(method), Buffer.from([0]), Buffer.from(args)])
}

const App = ({ wallet, contractId }) => {
  const [currentState, setCurrentState] = useState({});
  const [currentTurn, setCurrentTurn] = useState("");
  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");
  const [isGameActive, setIsGameActive] = useState("");
  
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [selectedRow, setSelectedRow] = useState();

  useEffect(async () => {
    console.log(contractId)
    if(wallet?.getAccountId()) {
      let args = encodeCall(contractId, 'getState', '');
      const stateView = await wallet.account().viewFunction("jsvm.testnet", 'view_js_contract', args, {
          stringify: (val) => val,
      });

  
      setCurrentState(stateView.boardState);
      setCurrentTurn(stateView.currentTurn);
      setPlayerOne(stateView.playerOne);
      setPlayerTwo(stateView.playerTwo);
      setIsGameActive(stateView.isGameActive);
    }
  }, []);

  const signIn = () => {
    wallet.requestSignIn(
      {contractId: "jsvm.testnet", methodNames: ['call_js_contract']},
      "NEAR Status Message"
    );
  };

  const signOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };

  return (
    <main>
      <header>
        <h1 className="centered">
          <img src={matchesTitle}/> 
        </h1>

        {wallet.getAccountId() ?
          <p>Currently signed in as: <code>{wallet.getAccountId()}</code></p>
        :
          <p>Update or add a status message! Please login to continue.</p>
        }

        { wallet.getAccountId()
          ? <button onClick={signOut}>Log out</button>
          : <button onClick={signIn}>Log in</button>
        }
      </header>
      {selectedRow ? 
        <div>
          <h2>
          Row: {selectedRow} 
          </h2>
          <h2>
          Matches: {selectedNumber}
          </h2>
        </div>
        : 
        <h2>
          Please make a selection
        </h2>
      }
      <MatchBoard gameState={currentState} selectedNumber={selectedNumber} setSelectedNumber={setSelectedNumber} selectedRow={selectedRow} setSelectedRow={setSelectedRow} />
    </main>
  );
};

export default App;