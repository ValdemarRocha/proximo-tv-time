export default function Hero({ serie }) {
  if (!serie) return null;

  const backdropUrl = serie.backdrop_path 
    ? `https://image.tmdb.org/t/p/w1280${serie.backdrop_path}`
    : '';

  return (
    <div 
      className="hero" 
      style={{
        backgroundImage: `url(${backdropUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        padding: '100px 20px',
        borderRadius: '12px',
        marginBottom: '20px'
      }}
    >
      <div style={{ backgroundColor: 'rgba(0,0,0,0.6)', padding: '20px', display: 'inline-block', borderRadius: '8px' }}>
        <h1>{serie.name}</h1>
        <p style={{ maxWidth: '600px' }}>{serie.overview}</p>
      </div>
    </div>
  );
}