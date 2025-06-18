import React from "react";
import { Filme } from "../../types/Filme";
import styles from "./CardFilme.module.css";

interface CardFilmeProps {
  filme: Filme;
}

const CardFilme: React.FC<CardFilmeProps> = ({ filme }) => {
  return (
    <div className={styles.card}>
      <img
        src={filme.poster}
        alt={filme.titulo}
        className={styles.poster}
      />
      <h2 className={styles.titulo}>{filme.titulo}</h2>
      <p className={styles.ano}>Ano: {filme.ano}</p>
    </div>
  );
};

export default CardFilme;
