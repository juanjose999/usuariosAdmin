// src/pages/DashboardUsers.tsx
import { useEffect, useState } from "react";
import type { Usuario } from "../types/usuario";
import {
  listarUsuarios,
  crearUsuario,
  buscarByEmailOrRut,
  actualizarUsuario,
  eliminarUsuario,
} from "../services/usuarioService";
import { CreateUserForm } from "../components/CreateUserForm";
import { UsersTable, type EditableUsuario } from "../components/UsersTable";
import "./DashboardUsers.css";

export const DashboardUsers = () => {
  const [users, setUsers] = useState<EditableUsuario[]>([]);
  const [usersFilter, setUsersFilter] = useState<EditableUsuario[]>([]);
  const [userToUpdate, setUserToUpdate] = useState<Partial<Usuario>>({});
  const [isViewCreateUser, setIsViewCreateUser] = useState(false);
  const [keyToFind, setKeyToFind] = useState("");

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await listarUsuarios();
        console.log('u0',data)
        const userTransform: EditableUsuario[] = data.map((u) => ({
          ...u,
          isEdit: false,
        }));
        setUsers(userTransform);
        setUsersFilter(userTransform);
        console.log('hola',userTransform)
      } catch (error) {
        console.log("error", error);
      }
    }
    loadUsers();
  }, []);

  const filterBy = (type: string) => {
    if (type === "todos") {
        setUsersFilter(users);
        return;
    }

    const filteredUsers = users.filter(
        (u) => String(u.dv) === type
    );

    setUsersFilter(filteredUsers);
  }

  const handleCreateUser = async (newUser: Usuario) => {
    try {
        const created = await crearUsuario(newUser);
        console.log("respuesta crearUsuario:", created);

        const usuarioCreado: EditableUsuario = {
        ...newUser,
        ...(typeof created === "object" && created !== null
            ? (created as Partial<Usuario>)
            : {}),
        isEdit: false,
        };

        setUsers((prev) => [...prev, usuarioCreado]);
        setUsersFilter((prev) => [...prev, usuarioCreado]);
        setIsViewCreateUser(false);
        alert("Usuario creado correctamente")
    } catch (error) {
        console.log("error", error);
        alert(error)
    }
    };


  useEffect(() => {
    const handleFindUser = async () => {
      try {
        if (!keyToFind.trim()) {
          setUsersFilter(users);
          return;
        }
        const usersFinded = await buscarByEmailOrRut(keyToFind, keyToFind);
        const mapped: EditableUsuario[] = usersFinded.map((u) => ({
          ...u,
          isEdit: false,
        }));
        setUsersFilter(mapped);
      } catch (error) {
        console.log("error", error);
      }
    };
    handleFindUser();
  }, [keyToFind, users]);

  const handleStartEdit = (email: string) => {
    setUserToUpdate({});
    setUsersFilter((prev) =>
      prev.map((u) =>
        u.correoElectronico === email ? { ...u, isEdit: true } : { ...u, isEdit: false }
      )
    );
  };

  const handleCancelEdit = (email: string) => {
    setUserToUpdate({});
    setUsersFilter((prev) =>
      prev.map((u) =>
        u.correoElectronico === email ? { ...u, isEdit: false } : u
      )
    );
  };

  
const handleChangeUserToUpdate = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value, type } = e.target;

  setUserToUpdate((prev) => ({
    ...prev,
    [name]: type === "number" ? Number(value) : value,
  }));
};


  useEffect(() => {
    console.log('uupdate',userToUpdate)
  }, [userToUpdate])

  const handleUpdateUser = async (email: string) => {
    try {
      const response = await actualizarUsuario(email, userToUpdate);
      console.log('uures',response)
      setUsersFilter((prev) =>
        prev.map((u) =>
          u.correoElectronico === email
            ? { ...u, ...response, isEdit: false }
            : u
        )
      );
      setUsers((prev) =>
        prev.map((u) =>
          u.correoElectronico === email
            ? { ...u, ...response, isEdit: false }
            : u
        )
      );
      setUserToUpdate({});
      alert("usuario actualizado correctamente")
    } catch (error) {
      console.log("Error actualizando usuario:", error);
    }
  };

  const handleDeleteUser = async (email: string) => {
    try {
      const isDelete = await eliminarUsuario(email);
      if (isDelete) {
        setUsers((prev) => prev.filter((u) => u.correoElectronico !== email));
        setUsersFilter((prev) => prev.filter((u) => u.correoElectronico !== email));
        alert("usuario eliminado correctamente");
      } else {
        alert("usuario no encontrado");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log('u1',usersFilter)

  return (
    <div className="dashboard-users">
      <h1>Gestor de usuarios</h1>

      <div>
        <div className="container-search">
            <input
            type="text"
            value={keyToFind}
            onChange={(e) => setKeyToFind(e.target.value)}
            placeholder="Buscar por correo o rut"
            />
            <button
            type="button"
            className="btn-create-toggle"
            onClick={() => setIsViewCreateUser((prev) => !prev)}
            >
            {isViewCreateUser ? "Cerrar formulario" : "Crear usuario"}
            </button>
            <div className="container-search__select">
                <label htmlFor="tipoDoc">Tipo de documento</label>
                <select name="tipoDoc" id="tipoDoc" onChange={(e) => {
                    filterBy(e.target.value)
                    console.log('cambio', e.target.value)
                }}> 
                    <option value="todos">Todos</option>
                    <option value="1">Cedula</option>
                    <option value="2">Targete de identidad</option>
                </select>
            </div>
      </div>
      </div>

      {isViewCreateUser && (
        <CreateUserForm
          onCreate={handleCreateUser}
          onCancel={() => setIsViewCreateUser(false)}
        />
      )}

      <UsersTable
        users={usersFilter}
        userToUpdate={userToUpdate}
        onStartEdit={handleStartEdit}
        onCancelEdit={handleCancelEdit}
        onChangeEdit={handleChangeUserToUpdate}
        onSaveEdit={handleUpdateUser}
        onDelete={handleDeleteUser}
      />
    </div>
  );
};