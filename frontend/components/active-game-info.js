import React from "react";

const ActiveGameInfo = ({ wallet, currentPlayer, isGameActive, playerOne, playerTwo, selectedRow, selectedNumber }) => {
    return (
        <div className="game-info">
            {isGameActive == 1 ?
                <h3>
                    Game Status: Live!
                </h3>
                :
                <h3>
                    Game Status: Not Active..
                </h3>
            }

            <h6>
                Player1: {playerOne}
            </h6>
            <h6>
                Player2: {playerTwo}
            </h6>
            <h4>
                {currentPlayer}'s Move.
            </h4>

            {selectedRow ?
                <div className="spaced">
                    <h3>
                        Row: {selectedRow.split("row")[1]}
                    </h3>
                    <h3>
                        Matches: {selectedNumber}
                    </h3>
                </div>
                :
                <h3 className="spaced">
                    {wallet.getAccountId() == currentPlayer ? "Please make a selection" : "Please wait your turn"}
                </h3>
            }
        </div>
    );
};

export default ActiveGameInfo;