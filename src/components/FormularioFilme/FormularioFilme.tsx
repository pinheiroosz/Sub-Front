import React, { useState } from "react";
import { Filme } from "../../types/Filme";
import styles from "./FormularioFilme.module.css";

interface FormularioFilmeProps {
  onSalvar: (filme: Omit<Filme, "id">) => void;
}

const FormularioFilme: React.FC<FormularioFilmeProps> = ({ onSalvar }) => {
  const [titulo, setTitulo] = useState("");
  const [ano, setAno] = useState("");
  const [poster, setPoster] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo || !ano || !poster) {
      setErro("Preencha todos os campos.");
      return;
    }
    setErro("");
    onSalvar({ titulo, ano: Number(ano), poster });
    setTitulo("");
    setAno("");
    setPoster("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.titulo}>Adicionar Filme</h2>
      <input
        className={styles.input}
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
      />
      <input
        className={styles.input}
        type="number"
        placeholder="Ano"
        value={ano}
        onChange={e => setAno(e.target.value)}
      />
      <input
        className={styles.input}
        type="url"
        placeholder="URL do Pôster"
        value={poster}
        onChange={e => setPoster(e.target.value)}
      />
      {erro && <div className={styles.erro}>{erro}</div>}
      <button className={styles.botao} type="submit">Salvar</button>
    </form>
  );
};

export default FormularioFilme;
