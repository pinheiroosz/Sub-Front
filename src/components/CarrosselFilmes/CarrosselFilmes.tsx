import React from "react";
import CardFilme from "../CardFilme/CardFilme";
import styles from "./CarrosselFilmes.module.css";
import { Filme } from "../../types/Filme";

interface CarrosselFilmesProps {
  filmes: Filme[];
  onAbrirModal: () => void;
  onEditar: (filme: Filme) => void;
  onExcluir: (filme: Filme) => void;
}

const CarrosselFilmes: React.FC<CarrosselFilmesProps> = ({ filmes, onAbrirModal, onEditar, onExcluir }) => {
  return (
    <div className={styles.horizontalScrollContainer}>
      {filmes.map((filme) => (
        <div key={filme.id} className={styles.cardWrapper}>
          <CardFilme filme={filme} onEditar={onEditar} onExcluir={onExcluir} />
        </div>
      ))}
      <div className={styles.cardAdd} onClick={onAbrirModal} title="Adicionar novo filme">
        <span className={styles.iconeMais}>+</span>
        <span className={styles.textoAdd}>Adicionar Filme</span>
      </div>
    </div>
  );
};

export default CarrosselFilmes;
