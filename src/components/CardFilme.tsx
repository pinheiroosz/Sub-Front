import React from "react";
import { Filme } from "../types/Filme";
import styles from "./CardFilme/CardFilme.module.css";

interface CardFilmeProps {
  filme: Filme;
  onEditar?: (filme: Filme) => void;
  onExcluir?: (filme: Filme) => void;
}

const CardFilme: React.FC<CardFilmeProps> = ({ filme, onEditar, onExcluir }) => {
  return (
    <div className={styles.card}>
      <img
        src={filme.poster}
        alt={filme.titulo}
        className={styles.poster}
      />
      <h2 className={styles.titulo}>{filme.titulo}</h2>
      <p className={styles.ano}>Ano: {filme.ano}</p>
      {(onEditar || onExcluir) && (
        <div className={styles.acoes}>
          {onEditar && (
            <button className={styles.btnEditar} onClick={() => onEditar(filme)} title="Editar filme">✏️</button>
          )}
          {onExcluir && (
            <button className={styles.btnExcluir} onClick={() => onExcluir(filme)} title="Excluir filme">🗑️</button>
          )}
        </div>
      )}
    </div>
  );
};

export default CardFilme;
