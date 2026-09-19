export default function Loading({ mensagem = "Carregando dados..." }) {
  return (
    <div className="Loading">
      <p>{mensagem}</p>
    </div>
  );
}