import React from "react";
import Match from "./match";

const Row5 = ({ gameState, onSelect }) => {
    return (
        <div className="centered">
            <Match row={"row5"} index={1} gameState={gameState} onSelect={onSelect}/>
            <Match row={"row5"} index={2} gameState={gameState} onSelect={onSelect}/>
            <Match row={"row5"} index={3} gameState={gameState} onSelect={onSelect}/>
            <Match row={"row5"} index={4} gameState={gameState} onSelect={onSelect}/>
            <Match row={"row5"} index={5} gameState={gameState} onSelect={onSelect}/>
        </div>
    );
};

export default Row5;