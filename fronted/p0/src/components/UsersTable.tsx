// src/components/UsersTable.tsx
import type { Usuario } from "../types/usuario";
import "./UsersTable.css";

export interface EditableUsuario extends Usuario {
  id?: number;
  isEdit?: boolean;
}

interface UsersTableProps {
  users: EditableUsuario[];
  userToUpdate: Partial<Usuario>;
  onStartEdit: (email: string) => void;
  onCancelEdit: (email: string) => void;
  onChangeEdit: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSaveEdit: (email: string) => Promise<void> | void;
  onDelete: (email: string) => Promise<void> | void;
}

const getTipoDocumentoLabel = (dv: string | number) => {
  const valor = String(dv);
  if (valor === "1") return "Cédula";
  if (valor === "2") return "Tarjeta de identidad";
  return valor;
};

export const UsersTable = ({
  users,
  userToUpdate,
  onStartEdit,
  onCancelEdit,
  onChangeEdit,
  onSaveEdit,
  onDelete,
}: UsersTableProps) => {
  if (users.length === 0) {
    return <p className="users-empty">No hay usuarios registrados</p>;
  }

  return (
    <div className="users-table-wrapper">
      <table className="users-table">
        <thead>
          <tr>
            <th>Nombre completo</th>
            <th>Correo electrónico</th>
            <th>Fecha de nacimiento</th>
            <th>Número de documento</th>
            <th>Tipo de documento</th>
            <th>Contraseña</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, index) => {
            const rowKey = u.id ?? u.correoElectronico ?? `row-${index}`;

            return u.isEdit ? (
              <tr key={rowKey} className="row-editing">
                <td>
                  <div className="field-stack">
                    <div className="field-group">
                      <label htmlFor={`nombres-${rowKey}`}>Nombres</label>
                      <input
                        id={`nombres-${rowKey}`}
                        name="nombres"
                        value={userToUpdate.nombres ?? u.nombres}
                        onChange={onChangeEdit}
                        placeholder="Nombres"
                      />
                    </div>
                    <div className="field-group">
                      <label htmlFor={`apellidos-${rowKey}`}>Apellidos</label>
                      <input
                        id={`apellidos-${rowKey}`}
                        name="apellidos"
                        value={userToUpdate.apellidos ?? u.apellidos}
                        onChange={onChangeEdit}
                        placeholder="Apellidos"
                      />
                    </div>
                  </div>
                </td>

                <td>
                  <div className="field-group">
                    <label htmlFor={`correo-${rowKey}`}>Correo electrónico</label>
                    <th>{
                        userToUpdate.correoElectronico ?? u.correoElectronico
                      }</th>
                  </div>
                </td>

                <td>
                  <div className="field-group">
                    <label htmlFor={`fecha-${rowKey}`}>Fecha de nacimiento</label>
                    <input
                      id={`fecha-${rowKey}`}
                      type="date"
                      name="fechaNacimiento"
                      value={
                        userToUpdate.fechaNacimiento ??
                        u.fechaNacimiento?.substring(0, 10) ??
                        ""
                      }
                      onChange={onChangeEdit}
                    />
                  </div>
                </td>

                <td>
                  <div className="field-group">
                    <label htmlFor={`rut-${rowKey}`}>Número de documento</label>
                    <input
                      id={`rut-${rowKey}`}
                      type="number"
                      name="rut"
                      value={userToUpdate.rut ?? u.rut}
                      onChange={onChangeEdit}
                      placeholder="Ej. 1090123456"
                    />
                  </div>
                </td>

                <td>
                  <div className="field-group">
                    <label htmlFor={`dv-${rowKey}`}>Tipo de documento</label>
                    <select
                      id={`dv-${rowKey}`}
                      name="dv"
                      value={String(userToUpdate.dv ?? u.dv ?? "1")}
                      onChange={onChangeEdit}
                    >
                      <option value="1">Cédula</option>
                      <option value="2">Tarjeta de identidad</option>
                    </select>
                  </div>
                </td>

                <td>
                  <div className="field-group">
                    <label htmlFor={`pass-${rowKey}`}>Nueva contraseña</label>
                    <input
                      id={`pass-${rowKey}`}
                      type="password"
                      name="contrasena"
                      value={userToUpdate.contrasena ?? ""}
                      onChange={onChangeEdit}
                      placeholder="Opcional"
                    />
                  </div>
                </td>

                <td>
                  <div className="cell-actions">
                    <button
                      type="button"
                      className="btn-save"
                      onClick={() => onSaveEdit(u.correoElectronico)}
                    >
                      Guardar
                    </button>
                    <button
                      type="button"
                      className="btn-cancel"
                      onClick={() => onCancelEdit(u.correoElectronico)}
                    >
                      Cancelar
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              <tr key={rowKey}>
                <td className="cell-name">
                  {u.nombres} {u.apellidos}
                </td>
                <td className="cell-email">{u.correoElectronico}</td>
                <td>{u.fechaNacimiento?.substring(0, 10)}</td>
                <td className="cell-doc">{u.rut}</td>
                <td>
                  <span
                    className={`doc-badge doc-badge--${String(u.dv) === "2" ? "ti" : "cc"}`}
                  >
                    {getTipoDocumentoLabel(u.dv)}
                  </span>
                </td>
                <td className="cell-pass">••••••••</td>
                <td>
                  <div className="cell-actions">
                    <button
                      type="button"
                      className="btn-edit"
                      onClick={() => onStartEdit(u.correoElectronico)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="btn-delete"
                      onClick={() => onDelete(u.correoElectronico)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};