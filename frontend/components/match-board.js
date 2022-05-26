import React, { useState, useEffect } from "react";
import Row1 from "./row-1";
import Row2 from "./row-2";
import Row3 from "./row-3";
import Row4 from "./row-4";
import Row5 from "./row-5";

const MatchBoard = ({ gameState, onSelect }) => {
    return (
        <div>
            <Row5 gameState={gameState} onSelect={onSelect}/>
            <Row4 gameState={gameState} onSelect={onSelect}/>
            <Row3 gameState={gameState} onSelect={onSelect}/>
            <Row2 gameState={gameState} onSelect={onSelect}/>
            <Row1 gameState={gameState} onSelect={onSelect}/>
        </div>
    );
};

export default MatchBoard;