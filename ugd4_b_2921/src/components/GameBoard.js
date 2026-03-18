import React from "react";
import Card from "./Card";

function GameBoard({ cards, flippedCards, matchedCards, onFlip }) {
    
    // Tentuin jumlah kolom biar proporsional
    const getGridCols = () => {
        if (cards.length === 8) return "grid-cols-4";   // easy
        if (cards.length === 12) return "grid-cols-4";  // medium
        if (cards.length === 16) return "grid-cols-4";  // hard
        return "grid-cols-4";
    };

    return (
        <div className={`grid ${getGridCols()} gap-4 justify-center`}>
            {cards.map((card) => (
                <Card
                    key={card.id}
                    card={card}
                    isFlipped={flippedCards.includes(card.id)}
                    isMatched={matchedCards.includes(card.id)}
                    onClick={onFlip}
                />
            ))}
        </div>
    );
}

export default GameBoard;