export default function EstadoVazio({ titulo, descricao }) {
  return (
    <div className="vazio">
      <h2>{titulo || "Nenhum resultado"}</h2>
      <p>{descricao || "Não encontrámos o que procurava."}</p>
    </div>
  );
}