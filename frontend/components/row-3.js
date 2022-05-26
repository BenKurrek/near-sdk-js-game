import React from "react";
import Match from "./match";

const Row3 = ({ gameState, onSelect }) => {
    return (
        <div className="centered">
            <Match row={"row3"} index={1} gameState={gameState} onSelect={onSelect}/>
            <Match row={"row3"} index={2} gameState={gameState} onSelect={onSelect}/>
            <Match row={"row3"} index={3} gameState={gameState}onSelect={onSelect}/>
        </div>
    );
};

export default Row3;