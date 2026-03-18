'use client';

import React, { useState, useEffect } from 'react';
import GameBoard from '../components/GameBoard';
import ScoreBoard from '../components/ScoreBoard';
import { GiCardJoker } from 'react-icons/gi';
import { FaAppleAlt, FaLemon, FaHeart, FaStar } from 'react-icons/fa';

// ICONS
const ICONS = [
    { icon: FaAppleAlt, color: '#ef4444' },
    { icon: FaLemon, color: '#eab308' },
    { icon: FaHeart, color: '#ec4899' },
    { icon: FaStar, color: '#f97316' },
    { icon: GiCardJoker, color: '#22c55e' },
    { icon: FaAppleAlt, color: '#3b82f6' },
    { icon: FaLemon, color: '#a855f7' },
    { icon: FaHeart, color: '#14b8a6' },
];

// SHUFFLE
const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

// CREATE CARDS
const createCards = (level) => {
    let pairCount = 4;

    if (level === 'medium') pairCount = 6;
    if (level === 'hard') pairCount = 8;

    const selectedIcons = ICONS.slice(0, pairCount);

    const paired = selectedIcons.flatMap((item, index) => [
        { id: index * 2, icon: item.icon, color: item.color, pairId: index },
        { id: index * 2 + 1, icon: item.icon, color: item.color, pairId: index },
    ]);

    return shuffleArray(paired);
};

export default function Home() {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [moves, setMoves] = useState(0);
    const [difficulty, setDifficulty] = useState('easy');
    const [time, setTime] = useState(0);
    const [gameFinished, setGameFinished] = useState(false);

    // RESET SAAT DIFFICULTY BERUBAH
    useEffect(() => {
        setCards(createCards(difficulty));
        setFlippedCards([]);
        setMatchedCards([]);
        setMoves(0);
        setTime(0);
        setGameFinished(false);
    }, [difficulty]);

    // TIMER (STOP SAAT MENANG)
    useEffect(() => {
        if (gameFinished) return;

        const interval = setInterval(() => {
            setTime(prev => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [difficulty, gameFinished]);

    // LOGIC MATCH + CEK MENANG
    useEffect(() => {
        if (flippedCards.length === 2) {
            const [firstId, secondId] = flippedCards;
            const firstCard = cards.find(c => c.id === firstId);
            const secondCard = cards.find(c => c.id === secondId);

            setMoves(prev => prev + 1);

            if (firstCard.pairId === secondCard.pairId) {
                setMatchedCards(prev => [...prev, firstId, secondId]);

                if (matchedCards.length + 2 === cards.length) {
                    setGameFinished(true);
                }

                setFlippedCards([]);
            } else {
                const timer = setTimeout(() => {
                    setFlippedCards([]);
                }, 800);
                return () => clearTimeout(timer);
            }
        }
    }, [flippedCards, cards, matchedCards]);

    const handleCardFlip = (id) => {
        if (
            flippedCards.length < 2 &&
            !flippedCards.includes(id) &&
            !gameFinished
        ) {
            setFlippedCards(prev => [...prev, id]);
        }
    };

    const resetGame = () => {
        setCards(createCards(difficulty));
        setFlippedCards([]);
        setMatchedCards([]);
        setMoves(0);
        setTime(0);
        setGameFinished(false);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center from-slate-900 via-blue-900 to-indigo-900 p-4">

            {/* TITLE */}
            <h1 className="text-4xl font-bold mb-6 text-white flex items-center gap-3 animate-pulse">
                <GiCardJoker className="text-yellow-300 text-4xl animate-bounce" />
                MEMORY CARD GAME
            </h1>

            {/* DIFFICULTY */}
            <div className="mb-4 flex gap-3">
                {['easy', 'medium', 'hard'].map(level => (
                    <button
                        key={level}
                        onClick={() => setDifficulty(level)}
                        className={`px-4 py-2 rounded-lg font-bold transition 
                        ${difficulty === level 
                            ? 'bg-blue-400 text-black' 
                            : 'bg-white/10 text-white hover:bg-white/20'}`}
                    >
                        {level.toUpperCase()}
                    </button>
                ))}
            </div>

            <ScoreBoard 
                moves={moves}
                time={time}
                matchedCount={matchedCards.length / 2}
                totalPairs={cards.length / 2}
                onReset={resetGame}
            />

            {/* BOARD */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl">
                <GameBoard 
                    cards={cards}
                    flippedCards={flippedCards}
                    matchedCards={matchedCards}
                    onFlip={handleCardFlip}
                />
            </div>

            {/* WIN */}
            {gameFinished && (
                <div className="mt-6 text-2xl font-bold text-blue-300 animate-bounce">
                    🎉 YOU WIN!
                </div>
            )}
        </div>
    );
}