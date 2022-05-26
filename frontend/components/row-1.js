import React from "react";
import Match from "./match";

const Row1 = ({ gameState, onSelect }) => {
    return (
        <div className="centered">
            <Match row={"row1"} index={1} gameState={gameState} onSelect={onSelect}/>
        </div>
    );
};

export default Row1;