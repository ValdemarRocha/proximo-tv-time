import SerieCard from './SerieCard';

export default function Carousel({ titulo, series }) {
  if (!series || series.length === 0) return null;

  return (
    <section className="carousel" style={{ margin: '20px 0' }}>
      <h2>{titulo}</h2>
      <div className="carousel-items" style={{ display: 'flex', overflowX: 'auto', padding: '10px 0' }}>
        {series.map((serie) => (
          <SerieCard key={serie.id} serie={serie} /> // Uso do map com key obrigatória
        ))}
      </div>
    </section>
  );
}