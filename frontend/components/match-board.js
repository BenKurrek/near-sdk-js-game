import React, { useState, useEffect } from "react";
import Match from "./match";

const MatchBoard = ({
    wallet,
    currentPlayer,
    gameState,
    selectedNumber,
    setSelectedNumber,
    selectedRow,
    setSelectedRow,
    selectedMatchIndex,
    setSelectedMatchIndex
}) => {
    const onSelect = (row) => {
        console.log("selected")

        if (selectedRow != row) {
            setSelectedRow(row);
            setSelectedNumber(1);
        } else {
            setSelectedNumber(selectedNumber + 1)
            console.log('selectedNumber + 1: ', selectedNumber + 1)
        }
    };

    return (
        <div className="right-panel">
            {/* ROW 5 */}
            <div className="centered">
                <Match currentPlayer={currentPlayer} wallet={wallet} row={"row5"} index={1} gameState={gameState} onSelect={onSelect} setSelectedMatchIndex={setSelectedMatchIndex} selectedMatchIndex={selectedMatchIndex} selectedRow={selectedRow} />
                <Match currentPlayer={currentPlayer} wallet={wallet} row={"row5"} index={2} gameState={gameState} onSelect={onSelect} setSelectedMatchIndex={setSelectedMatchIndex} selectedMatchIndex={selectedMatchIndex} selectedRow={selectedRow} />
                <Match currentPlayer={currentPlayer} wallet={wallet} row={"row5"} index={3} gameState={gameState} onSelect={onSelect} setSelectedMatchIndex={setSelectedMatchIndex} selectedMatchIndex={selectedMatchIndex} selectedRow={selectedRow} />
                <Match currentPlayer={currentPlayer} wallet={wallet} row={"row5"} index={4} gameState={gameState} onSelect={onSelect} setSelectedMatchIndex={setSelectedMatchIndex} selectedMatchIndex={selectedMatchIndex} selectedRow={selectedRow} />
                <Match currentPlayer={currentPlayer} wallet={wallet} row={"row5"} index={5} gameState={gameState} onSelect={onSelect} setSelectedMatchIndex={setSelectedMatchIndex} selectedMatchIndex={selectedMatchIndex} selectedRow={selectedRow} />
            </div>
            {/* ROW 4 */}
            <div className="centered">
                <Match currentPlayer={currentPlayer} wallet={wallet} row={"row4"} index={1} gameState={gameState} onSelect={onSelect} setSelectedMatchIndex={setSelectedMatchIndex} selectedMatchIndex={selectedMatchIndex} selectedRow={selectedRow} />
                <Match currentPlayer={currentPlayer} wallet={wallet} row={"row4"} index={2} gameState={gameState} onSelect={onSelect} setSelectedMatchIndex={setSelectedMatchIndex} selectedMatchIndex={selectedMatchIndex} selectedRow={selectedRow} />
                <Match currentPlayer={currentPlayer} wallet={wallet} row={"row4"} index={3} gameState={gameState} onSelect={onSelect} setSelectedMatchIndex={setSelectedMatchIndex} selectedMatchIndex={selectedMatchIndex} selectedRow={selectedRow} />
                <Match currentPlayer={currentPlayer} wallet={wallet} row={"row4"} index={4} gameState={gameState} onSelect={onSelect} setSelectedMatchIndex={setSelectedMatchIndex} selectedMatchIndex={selectedMatchIndex} selectedRow={selectedRow} />
            </div>
            {/* ROW 3 */}
            <div className="centered">
                <Match currentPlayer={currentPlayer} wallet={wallet} row={"row3"} index={1} gameState={gameState} onSelect={onSelect} setSelectedMatchIndex={setSelectedMatchIndex} selectedMatchIndex={selectedMatchIndex} selectedRow={selectedRow} />
                <Match currentPlayer={currentPlayer} wallet={wallet} row={"row3"} index={2} gameState={gameState} onSelect={onSelect} setSelectedMatchIndex={setSelectedMatchIndex} selectedMatchIndex={selectedMatchIndex} selectedRow={selectedRow} />
                <Match currentPlayer={currentPlayer} wallet={wallet} row={"row3"} index={3} gameState={gameState} onSelect={onSelect} setSelectedMatchIndex={setSelectedMatchIndex} selectedMatchIndex={selectedMatchIndex} selectedRow={selectedRow} />
            </div>
            {/* ROW 2 */}
            <div className="centered">
                <Match currentPlayer={currentPlayer} wallet={wallet} row={"row2"} index={1} gameState={gameState} onSelect={onSelect} setSelectedMatchIndex={setSelectedMatchIndex} selectedMatchIndex={selectedMatchIndex} selectedRow={selectedRow} />
                <Match currentPlayer={currentPlayer} wallet={wallet} row={"row2"} index={2} gameState={gameState} onSelect={onSelect} setSelectedMatchIndex={setSelectedMatchIndex} selectedMatchIndex={selectedMatchIndex} selectedRow={selectedRow} />
            </div>
            {/* ROW 1 */}
            <div className="centered">
                <Match currentPlayer={currentPlayer} wallet={wallet} row={"row1"} index={1} gameState={gameState} onSelect={onSelect} setSelectedMatchIndex={setSelectedMatchIndex} selectedMatchIndex={selectedMatchIndex} selectedRow={selectedRow} />
            </div>
        </div>
    );
};

export default MatchBoard;