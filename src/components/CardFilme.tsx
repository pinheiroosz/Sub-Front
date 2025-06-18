import React from "react";
import { Filme } from "../types/Filme";

interface CardFilmeProps {
  filme: Filme;
}

const CardFilme: React.FC<CardFilmeProps> = ({ filme }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center gap-2 w-64">
      <img
        src={filme.poster}
        alt={filme.titulo}
        className="w-40 h-60 object-cover rounded mb-2"
      />
      <h2 className="text-lg font-bold text-center">{filme.titulo}</h2>
      <p className="text-gray-600">Ano: {filme.ano}</p>
    </div>
  );
};

export default CardFilme;
