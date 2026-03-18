import React from 'react';
import { FaClock, FaMousePointer, FaCheck, FaSyncAlt, FaRedo } from 'react-icons/fa';

function ScoreBoard({ moves, time, matchedCount, totalPairs, onReset }) {
    const isGameComplete = matchedCount === totalPairs;

    return (
        <div className="text-center mb-6">

            {/* SCORE + TIMER */}
            <div className="flex justify-center gap-6 mb-4 flex-wrap">

                {/* TIMER */}
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <p className="text-sm text-indigo-200 flex items-center justify-center gap-1">
                        <FaClock className="text-indigo-300" /> Waktu
                    </p>
                    <p className="text-2xl font-bold text-white">
                        {Math.floor(time / 60)}:{String(time % 60).padStart(2, '0')}
                    </p>
                </div>

                {/* MOVES */}
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <p className="text-sm text-indigo-200 flex items-center justify-center gap-1">
                        <FaMousePointer className="text-indigo-300" /> Percobaan
                    </p>
                    <p className="text-2xl font-bold text-white">{moves}</p>
                </div>

                {/* MATCHED */}
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <p className="text-sm text-indigo-200 flex items-center justify-center gap-1">
                        <FaCheck className="text-indigo-300" /> Ditemukan
                    </p>
                    <p className="text-2xl font-bold text-white">
                        {matchedCount}/{totalPairs}
                    </p>
                </div>
            </div>

            {/* WIN MESSAGE */}
            {isGameComplete && (
                <p className="text-yellow-300 font-bold text-lg mb-2 animate-pulse">
                    🎉 Selamat! Selesai dalam waktu {Math.floor(time / 60)}:{String(time % 60).padStart(2, '0')} dan {moves} percobaan
                </p>
            )}

            {/* RESET BUTTON */}
            <button
                onClick={onReset}
                className="px-6 py-2 bg-yellow-400 text-indigo-900 font-bold rounded-full hover:bg-yellow-300 transition-all duration-200 shadow-lg flex items-center gap-2 mx-auto hover:scale-105"
            >
                {isGameComplete ? <FaRedo /> : <FaSyncAlt />}
                {isGameComplete ? 'Main Lagi' : 'Acak Ulang'}
            </button>
        </div>
    );
}

export default ScoreBoard;