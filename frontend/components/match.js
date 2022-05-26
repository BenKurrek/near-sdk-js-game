import React, { useState, useEffect } from "react";
import burntMatch from '../assets/matches/burnt-match.png';
import litMatch from '../assets/matches/lit-match.png';

const Match = ({ row, index, gameState, onSelect, selectedRow, selectedMatchIndex, setSelectedMatchIndex }) => {
    const [curImage, setCurImage] = useState(burntMatch);
    
    useEffect(() => {
        console.log("game state changed")
        if(gameState[row] && selectedRow != row || index != selectedMatchIndex) {
            setCurImage(gameState[row] >= index ? litMatch : burntMatch)
        }
      }, [gameState, selectedRow]);

    const imageClick = () => {
        if(curImage != burntMatch) {
            setCurImage(burntMatch)
            onSelect(row)
            setSelectedMatchIndex(index)
            console.log('Click');
        } else {
            console.log("already clicked")
        }
    }

    return (
        <img 
            src={curImage} 
            onClick={() => imageClick()}
            style={{'cursor':'pointer'}}
        />
      );
};

export default Match;