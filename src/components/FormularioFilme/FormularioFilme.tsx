import React, { useState, useEffect } from "react";
import { Filme } from "../../types/Filme";
import styles from "./FormularioFilme.module.css";

interface FormularioFilmeProps {
  onSalvar: (filme: Omit<Filme, "id">) => void;
  filmeEdicao?: Filme | null;
}

const FormularioFilme: React.FC<FormularioFilmeProps> = ({ onSalvar, filmeEdicao }) => {
  const [titulo, setTitulo] = useState("");
  const [ano, setAno] = useState("");
  const [poster, setPoster] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (filmeEdicao) {
      setTitulo(filmeEdicao.titulo);
      setAno(filmeEdicao.ano.toString());
      setPoster(filmeEdicao.poster);
    } else {
      setTitulo("");
      setAno("");
      setPoster("");
    }
  }, [filmeEdicao]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo || !ano || !poster) {
      setErro("Preencha todos os campos.");
      return;
    }
    setErro("");
    onSalvar({ titulo, ano: Number(ano), poster });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.titulo}>{filmeEdicao ? "Editar Filme" : "Adicionar Filme"}</h2>
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
