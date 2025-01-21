// components/GameCard.js
import React from 'react';

const GameCard = ({ game }: { game: any }) => {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
            <h3 className="text-lg font-semibold">{game.title}</h3>
            <p className="text-gray-600">{game.description}</p>
        </div>
    );
};

export default GameCard;