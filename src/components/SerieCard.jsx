export default function SerieCard({ serie }) {
  // Constrói a URL da imagem usando a base do TMDB (conforme a secção 8 do seu architecture.md)
  const posterUrl = serie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${serie.poster_path}` 
    : 'https://via.placeholder.com/500x750?text=Sem+Imagem';

  return (
    <div className="serie-card" style={{ minWidth: '150px', margin: '0 10px' }}>
      <img src={posterUrl} alt={serie.name} style={{ width: '100%', borderRadius: '8px' }} />
      <h3 style={{ fontSize: '1rem', marginTop: '8px' }}>{serie.name}</h3>
    </div>
  );
}