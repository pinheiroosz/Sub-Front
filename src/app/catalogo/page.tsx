'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import CarrosselFilmes from "../../components/CarrosselFilmes/CarrosselFilmes";
import Modal from "../../components/Modal/Modal";
import FormularioFilme from "../../components/FormularioFilme/FormularioFilme";
import { Filme } from "../../types/Filme";
import styles from "../page.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      toast.success("Filme adicionado com sucesso!");
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
      toast.success("Filme editado com sucesso!");
    });
  };

  const excluirFilme = (filme: Filme) => {
    axios.delete(`http://localhost:3001/filmes/${filme.id}`).then(() => {
      setFilmes((prev) => prev.filter(f => f.id !== filme.id));
      toast.success("Filme excluído com sucesso!");
    });
  };

  if (loading) return <div className="text-center mt-8">Carregando...</div>;
  if (erro) return <div className="text-center mt-8 text-red-500">{erro}</div>;

  return (
    <main className={styles.catalogoMain}>
      <header className={styles.netflixHeader}>
        <span className={styles.netflixLogo}>Papagaio<span className={styles.netflixLogoRed}>Flix</span></span>
      </header>
      <section className={styles.netflixSection}>
        <h2 className={styles.netflixSectionTitle}>Filmes em destaque</h2>
        <div className={styles.netflixCarouselWrapper}>
          <CarrosselFilmes
            filmes={filmes}
            onAbrirModal={() => setModalAberto(true)}
            onEditar={abrirEdicao}
            onExcluir={excluirFilme}
          />
        </div>
      </section>
      <Modal aberto={modalAberto} onClose={() => setModalAberto(false)}>
        <FormularioFilme onSalvar={adicionarFilme} />
      </Modal>
      <Modal aberto={modalEdicao} onClose={() => { setModalEdicao(false); setFilmeEditando(null); }}>
        <FormularioFilme onSalvar={salvarEdicao} filmeEdicao={filmeEditando} />
      </Modal>
      <ToastContainer position="top-right" autoClose={2500} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </main>
  );
}
