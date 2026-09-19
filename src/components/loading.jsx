export default function Loading({ mensagem = "Carregando dados..." }) {
  return (
    <div className="loading">
      <p>{mensagem}</p>
    </div>
  );
}