import React from "react";
import { FaQuestion } from "react-icons/fa";

function Card({ card, isFlipped, isMatched, onClick }) {
    return (
        <div
            onClick={() => {
                if (!isFlipped && !isMatched) {
                    onClick(card.id);
                }
            }}
            className="w-22 h-23 cursor-pointer perspective transition-all duration-300 hover:scale-105 hover:-translate-y-1"
        >
            <div
                className={`card-inner ${
                    isFlipped || isMatched ? "card-flipped" : ""
                }`}
            >
                {/* FRONT */}
                <div className="card-face absolute w-full h-full bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                    <FaQuestion className="text-white/60 text-xl" />
                </div>

                {/* BACK */}
                <div className="card-face card-back absolute w-full h-full bg-white rounded-xl flex items-center justify-center shadow-lg">
                    <card.icon className="text-3xl" style={{ color: card.color }} />
                </div>
            </div>
        </div>
    );
}

export default Card;