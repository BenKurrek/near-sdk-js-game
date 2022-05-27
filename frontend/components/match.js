import React, { useState, useEffect } from "react";
import burntMatch from '../assets/matches/burnt-match.png';
import litMatch from '../assets/matches/lit-match.png';

const Match = ({
    wallet,
    currentPlayer,
    row,
    index,
    gameState, 
    onSelect, 
    selectedRow, 
    selectedMatchIndex, 
    setSelectedMatchIndex 
}) => {
    const [curImage, setCurImage] = useState(litMatch);

    useEffect(() => {
        if (gameState[row] != undefined && (selectedRow != row || index != selectedMatchIndex)) {
            setCurImage(gameState[row] >= index ? litMatch : burntMatch)
        }
    }, [gameState, selectedRow]);

    const imageClick = () => {
        if(!wallet.getAccountId()) {
            alert("Must Sign In To Play...")
            return;
        }
        if(wallet.getAccountId() != currentPlayer) {
            alert("Only the active player can make a move...")
            return;
        }
        
        setCurImage(burntMatch)
        onSelect(row)
        setSelectedMatchIndex(index)
    }

    return (
        curImage == litMatch ?
            <img
                src={litMatch}
                onClick={() => imageClick()}
                style={{ 'cursor': 'pointer' }}
                width={25}
                height={125}
            />
            :
            <img
                src={burntMatch}
                width={25}
                height={127}
            />
    );
};

export default Match;