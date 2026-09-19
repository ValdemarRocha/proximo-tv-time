import { useState, useEffect } from "react";
import { Routes, Route, NavLink } from "react-router";

// 1. Importação de todos os componentes visuais (agora na pasta components)
import Hero from "./components/Hero";
import Carousel from "./components/Carousel";
import Loading from "./components/loading"; // Mantido com "l" minúsculo conforme a sua estrutura anterior
import MensagemErro from "./components/MensagemErro";
import EstadoVazio from "./components/EstadoVazio";

// 2. Importação do Serviço da API
import { getSeriesPopulares } from "./services/tmdb";

// --- COMPONENTES DE NAVEGAÇÃO ---

function Navbar() {
  return (
    <nav>
      <ul>
        <li><NavLink to="/">Início</NavLink></li>
        <li><NavLink to="/filmes">Filmes</NavLink></li>
        <li><NavLink to="/series">Séries</NavLink></li>
        <li><NavLink to="/pessoas">Pessoas</NavLink></li>
        <li><NavLink to="/favoritos">Favoritos</NavLink></li>
        <li><NavLink to="/sobre">Sobre</NavLink></li>
      </ul>
    </nav>
  );
}

function Footer() {
  return (
    <footer>
      <img src="/tmdb-logo.svg" alt="TMDB Logo" width="100" />
      <p>Aviso: Este produto utiliza a API do TMDB, mas não é endossado ou certificado pelo TMDB.</p>
    </footer>
  );
}

// --- PÁGINAS ---

// Página Principal (Passo 6)
function Home() {
  const [series, setSeries] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const carregarDados = async () => {
    setCarregando(true);
    setErro(null);
    
    try {
      const dados = await getSeriesPopulares(); 
      setSeries(dados.results || []);
    } catch (error) {
      setErro(error.message || "Erro ao carregar os dados da API.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  if (carregando) {
    return <Loading mensagem="A carregar séries fantásticas..." />;
  }

  if (erro) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <MensagemErro erro={erro} />
        <button 
          onClick={carregarDados} 
          style={{ padding: '10px 20px', marginTop: '15px', cursor: 'pointer' }}
        >
          Tentar de novo
        </button>
      </div>
    );
  }

  if (series.length === 0) {
    return <EstadoVazio titulo="Nenhuma série encontrada" />;
  }

  const serieDestaque = series[0];
  const metade = Math.ceil(series.length / 2);
  const carrossel1 = series.slice(1, metade);
  const carrossel2 = series.slice(metade);

  return (
    <div className="home-page">
      <Hero serie={serieDestaque} />
      <Carousel titulo="Populares da Semana" series={carrossel1} />
      <Carousel titulo="Aclamadas pela Crítica" series={carrossel2} />
    </div>
  );
}

// Páginas Vazias (Passo 4)
const PaginaFilmes = () => <h1>Filmes</h1>;
const PaginaSeries = () => <h1>Séries</h1>;
const PaginaPessoas = () => <h1>Pessoas</h1>;
const PaginaFavoritos = () => <h1>Favoritos</h1>;
const PaginaSobre = () => <h1>Sobre</h1>;

// --- COMPONENTE PRINCIPAL (APP) ---

function App() {
  return (
    <div>
      <Navbar />
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/filmes" element={<PaginaFilmes />} />
          <Route path="/series" element={<PaginaSeries />} />
          <Route path="/pessoas" element={<PaginaPessoas />} />
          <Route path="/favoritos" element={<PaginaFavoritos />} />
          <Route path="/sobre" element={<PaginaSobre />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;