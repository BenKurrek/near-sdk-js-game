import React, { useState, useEffect } from "react";
import burntMatch from '../assets/matches/burnt-match.png';
import litMatch from '../assets/matches/lit-match.png';

const Match = ({ row, index, gameState, onSelect }) => {
    const [curImage, setCurImage] = useState(burntMatch);
    
    useEffect(() => {
        if(gameState[row]) {
            setCurImage(gameState[row] >= index ? litMatch : burntMatch)
        }
      }, [gameState]);

    const imageClick = () => {
        if(curImage != burntMatch) {
            setCurImage(burntMatch)
            onSelect(row)
            console.log('Click');
        } else {
            console.log("already clicked")
        }
    }

    return (
        <img 
            src={curImage} 
            onClick={() => imageClick()}
        />
      );
};

export default Match;