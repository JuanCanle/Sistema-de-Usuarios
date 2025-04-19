import Header from "../../components/header.jsx";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../services/api.js";
import { useRef } from "react";

function Login() {
  const emailRef = useRef();
  const senhaRef = useRef();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    // Para não reiniciar a página e perder os dados do formulário
    event.preventDefault();

    try {
      const { data: token } = await api.post("/login", {
        email: emailRef.current.value,
        password: senhaRef.current.value,
      });

      // Armazenar o token no localStorage para uso posterior
      localStorage.setItem("token", token);

      navigate("/listar-usuarios"); // Redirecionar para a lista de usuários após o login
    } catch (error) {
      alert("Senha ou Email incorretos", error);
    }
  }
  return (
    <>
      <Header />
      <div className="mx-auto mt-10 bg-white p-8 rounded-md shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 bg-slate-200 p-2 rounded-md">
          Login
        </h2>
        <form className="flex flex-col" onSubmit={handleSubmit} method="POST">
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
            Login
          </button>
        </form>
        <Link to="/">Não tem uma conta? Faça o cadastro</Link>
      </div>
    </>
  );
}

export default Login;
