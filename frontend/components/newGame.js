import React, { useState } from "react";
const { parseNearAmount } = require("near-api-js/lib/utils/format");

function encodeCall(contract, method, args) {
    return Buffer.concat([Buffer.from(contract), Buffer.from([0]), Buffer.from(method), Buffer.from([0]), Buffer.from(args)])
}

const NewGame = ({ wallet, contractId }) => {
    const [playerOne, setPlayerOne] = useState("");
    const [playerTwo, setPlayerTwo] = useState("");
    const [loading, setLoading] = useState(false);
    
    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            let args = encodeCall(contractId, 'newGame', `["${playerOne}", "${playerTwo}"]`);
            const result = await wallet.account().functionCall({
                contractId: "jsvm.testnet",
                methodName: 'call_js_contract',
                args,
                gas: "300000000000000"
            });
            console.log('result: ', result)
            setLoading(false)
        } catch (e) {
            console.log('e1: ', e)
            try {
                let args = encodeCall(contractId, 'init', `["${playerOne}", "${playerTwo}"]`);
                const result = await wallet.account().functionCall({
                    contractId: "jsvm.testnet",
                    methodName: 'call_js_contract',
                    args,
                    gas: "300000000000000", 
                    amount: parseNearAmount('0.1')
                });
                setLoading(false)
            }
            catch(e) {
                console.log('e2: ', e)
                setLoading(false)
            }
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <fieldset id="fieldset">
                <p>Start New Matches Game!</p>
                <p className="highlight">
                    <label htmlFor="player one">Player One:</label>
                    <input
                        autoComplete="off"
                        autoFocus
                        id="player one"
                        required
                        onInput={e => setPlayerOne(e.target.value)}
                    />
                </p>
                <p className="highlight">
                    <label htmlFor="player two">Player Two:</label>
                    <input
                        autoComplete="off"
                        autoFocus
                        id="player two"
                        required
                        onInput={e => setPlayerTwo(e.target.value)}
                    />
                </p>
                <button type="submit" disabled={loading}>
                    Start New Game
                </button>
            </fieldset>
        </form>
    );
};

export default NewGame;
