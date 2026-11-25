import { useState } from "react";
import { createPortal } from "react-dom";
import type { Usuario } from "../types/usuario";
import "./CreateUserForm.css";
interface CreateUserFormProps {
  onCreate: (usuario: Usuario) => Promise<void> | void;
  onCancel: () => void;
}

const INITIAL_USER: Usuario = {
  nombres: "",
  apellidos: "",
  rut: 0,
  dv: 1,
  fechaNacimiento: "",
  correoElectronico: "",
  contrasena: "",
};

export const CreateUserForm = ({ onCreate, onCancel }: CreateUserFormProps) => {
  const [user, setUser] = useState<Usuario>(INITIAL_USER);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onCreate(user);
      setUser(INITIAL_USER);
    } finally {
      setSubmitting(false);
    }
  };

  return  createPortal(
    <div className="create-user-overlay" onClick={onCancel}>
        <div
            className="create-user-card"
            onClick={(e) => e.stopPropagation()}
        >
             <div className="create-user-overlay" onClick={onCancel}>
    <div
      className="create-user-card"
      onClick={(e) => e.stopPropagation()}
    >
      <h3>Ingrese datos del usuario nuevo</h3>

      <form className="create-user-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="create-nombres">Nombres</label>
          <input
            id="create-nombres"
            type="text"
            placeholder="Ej. Juan José"
            name="nombres"
            value={user.nombres}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="create-apellidos">Apellidos</label>
          <input
            id="create-apellidos"
            type="text"
            placeholder="Ej. Sierra Ortega"
            name="apellidos"
            value={user.apellidos}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="create-dv">Tipo de documento</label>
          <select
            id="create-dv"
            name="dv"
            value={String(user.dv ?? "1")}
            onChange={handleChange}
            required
          >
            <option value="1">Cédula</option>
            <option value="2">Tarjeta de identidad</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="create-rut">Número de documento (RUT)</label>
          <input
            id="create-rut"
            type="number"
            placeholder="Ej. 1090123456"
            name="rut"
            value={user.rut || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="create-fecha">Fecha de nacimiento</label>
          <input
            id="create-fecha"
            type="date"
            name="fechaNacimiento"
            value={user.fechaNacimiento}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="create-correo">Correo electrónico</label>
          <input
            id="create-correo"
            type="email"
            placeholder="usuario@correo.com"
            name="correoElectronico"
            value={user.correoElectronico}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="create-contrasena">Contraseña</label>
          <input
            id="create-contrasena"
            type="password"
            placeholder="Mínimo 6 caracteres"
            name="contrasena"
            value={user.contrasena}
            onChange={handleChange}
            required
          />
        </div>

        <div className="create-user-actions">
          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? "Guardando..." : "Crear usuario"}
          </button>

          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>

        </div>
    </div>,
    document.body

  );
};