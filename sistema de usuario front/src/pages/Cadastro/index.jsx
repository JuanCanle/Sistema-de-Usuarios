import Header from "../../components/header.jsx";
import { Link } from "react-router-dom";
import { useRef } from "react";
import api from "../../../services/api.js";
import { useNavigate } from "react-router-dom";

function Cadastro() {
  const nomeRef = useRef();
  const emailRef = useRef();
  const senhaRef = useRef();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    // Para não reiniciar a página e perder os dados do formulário
    event.preventDefault();

    try {
      await api.post("/cadastro", {
        name: nomeRef.current.value,
        email: emailRef.current.value,
        password: senhaRef.current.value,
      });
      navigate("/login"); // Redirecionar para a página de login após o cadastro
    } catch (error) {
      alert("Erro ao cadastrar. Tente novamente.", error);
    }
  }

  return (
    <>
      <Header />
      <div className="mx-auto mt-10 bg-white p-8 rounded-md shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 bg-slate-200 p-2 rounded-md">
          Cadastro
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            ref={nomeRef}
            placeholder="Nome"
            className="w-full mb-4 p-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="email"
            ref={emailRef}
            placeholder="E-mail"
            className="w-full mb-4 p-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="password"
            ref={senhaRef}
            placeholder="Senha"
            className="w-full mb-4 p-2 border border-gray-300 rounded-md"
            required
          />
          <button
            className="rounded-md shadow bg-slate-700 text-white font-bold p-2 
          hover:bg-slate-200 hover:text-black transition-all duration-250 transform active:scale-90"
          >
            Cadastrar
          </button>
        </form>
        <Link to="/login">Já tem uma conta? Faça login</Link>
      </div>
    </>
  );
}

export default Cadastro;
