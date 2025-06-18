'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import CarrosselFilmes from "../../components/CarrosselFilmes/CarrosselFilmes";
import Modal from "../../components/Modal/Modal";
import FormularioFilme from "../../components/FormularioFilme/FormularioFilme";
import { Filme } from "../../types/Filme";
import styles from "../page.module.css";

export default function Catalogo() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [modalEdicao, setModalEdicao] = useState(false);
  const [filmeEditando, setFilmeEditando] = useState<Filme | null>(null);

  useEffect(() => {
    axios
      .get<Filme[]>("http://localhost:3001/filmes")
      .then((res) => {
        setFilmes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setErro("Erro ao carregar filmes.");
        setLoading(false);
        console.error(err);
      });
  }, []);

  const adicionarFilme = (novoFilme: Omit<Filme, "id">) => {
    axios.post<Filme>("http://localhost:3001/filmes", novoFilme).then((res) => {
      setFilmes((prev) => [...prev, res.data]);
      setModalAberto(false);
    });
  };

  const abrirEdicao = (filme: Filme) => {
    setFilmeEditando(filme);
    setModalEdicao(true);
  };

  const salvarEdicao = (dados: Omit<Filme, "id">) => {
    if (!filmeEditando) return;
    axios.put<Filme>(`http://localhost:3001/filmes/${filmeEditando.id}`, { ...filmeEditando, ...dados }).then((res) => {
      setFilmes((prev) => prev.map(f => f.id === filmeEditando.id ? res.data : f));
      setModalEdicao(false);
      setFilmeEditando(null);
    });
  };

  const excluirFilme = (filme: Filme) => {
    if (window.confirm(`Deseja realmente excluir o filme "${filme.titulo}"?`)) {
      axios.delete(`http://localhost:3001/filmes/${filme.id}`).then(() => {
        setFilmes((prev) => prev.filter(f => f.id !== filme.id));
      });
    }
  };

  if (loading) return <div className="text-center mt-8">Carregando...</div>;
  if (erro) return <div className="text-center mt-8 text-red-500">{erro}</div>;

  return (
    <main className="flex flex-col items-center p-8 gap-8">
      <h1 className="text-3xl font-bold mb-4">Catálogo de Filmes</h1>
      <CarrosselFilmes
        filmes={filmes}
        onAbrirModal={() => setModalAberto(true)}
        onEditar={abrirEdicao}
        onExcluir={excluirFilme}
      />
      <Modal aberto={modalAberto} onClose={() => setModalAberto(false)}>
        <FormularioFilme onSalvar={adicionarFilme} />
      </Modal>
      <Modal aberto={modalEdicao} onClose={() => { setModalEdicao(false); setFilmeEditando(null); }}>
        <FormularioFilme onSalvar={salvarEdicao} filmeEdicao={filmeEditando} />
      </Modal>
    </main>
  );
}
