import React from "react";
import CardFilme from "../CardFilme/CardFilme";
import styles from "./CarrosselFilmes.module.css";
import { Filme } from "../../types/Filme";

interface CarrosselFilmesProps {
  filmes: Filme[];
  onAbrirModal: () => void;
}

const CarrosselFilmes: React.FC<CarrosselFilmesProps> = ({ filmes, onAbrirModal }) => {
  return (
    <div className={styles.carrosselContainer}>
      {filmes.map((filme) => (
        <CardFilme key={filme.id} filme={filme} />
      ))}
      <div className={styles.cardAdd} onClick={onAbrirModal} title="Adicionar novo filme">
        <span className={styles.iconeMais}>+</span>
        <span className={styles.textoAdd}>Adicionar Filme</span>
      </div>
    </div>
  );
};

export default CarrosselFilmes;
