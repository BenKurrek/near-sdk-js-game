import React from "react";
import Match from "./match";

const Row2 = ({ gameState, onSelect }) => {
    return (
        <div className="centered">
            <Match row={"row2"} index={1} gameState={gameState} onSelect={onSelect}/>
            <Match row={"row2"} index={2} gameState={gameState} onSelect={onSelect}/>
        </div>
    );
};

export default Row2;