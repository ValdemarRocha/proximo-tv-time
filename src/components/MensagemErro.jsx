export default function MensagemErro({ erro }) {
  return (
    <div className="erro">
      <p>Ocorreu um problema: {erro}</p>
    </div>
  );
}