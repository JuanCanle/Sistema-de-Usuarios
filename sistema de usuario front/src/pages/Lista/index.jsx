import api from "../../../services/api";
import { useEffect } from "react";
import { useState } from "react";

function ListarUsuarios() {
  const [allUser, setAllUsers] = useState([]);

  // Vai esperar o carregamento e depois vai executar a função loadUsers
  useEffect(() => {
    async function loadUsers() {
      try {
        const {
          data: { users },
        } = await api.get("/listar-usuarios", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        // Colocando os dados na variável allUser
        setAllUsers(users);
      } catch (error) {
        alert("Erro ao carregar os usuários", error);
      }
    }

    loadUsers();
  }, []);

  return (
    <div className="mx-auto mt-20 bg-white p-8 rounded-md shadow-lg w-1/3">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 bg-slate-200 p-2 rounded-md">
        Lista de usuários
      </h2>
      <ul className="flex flex-col gap-4">
        {/* Verifica se o AllUser tem algo dentro com && */}
        {allUser &&
          allUser.length > 0 &&
          allUser.map((user) => (
            <li className="text-left bg-gray-300 rounded-md p-2" key={user.id}>
              <div class="basis-1/3 md:basis-1/3">
                <p>Id: {user.id}</p>
              </div>
              <div class="basis-1/3 md:basis-1/3">
                <p>Nome: {user.name}</p>
              </div>
              <div class="basis-1/3 md:basis-1/3">
                <p>Email: {user.email}</p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default ListarUsuarios;
