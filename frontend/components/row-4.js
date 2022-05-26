import React from "react";
import Match from "./match";

const Row4 = ({ gameState, onSelect }) => {
    return (
        <div className="centered">
            <Match row={"row4"} index={1} gameState={gameState} onSelect={onSelect}/>
            <Match row={"row4"} index={2} gameState={gameState} onSelect={onSelect}/>
            <Match row={"row4"} index={3} gameState={gameState} onSelect={onSelect}/>
            <Match row={"row4"} index={4} gameState={gameState} onSelect={onSelect}/>
        </div>
    );
};

export default Row4;