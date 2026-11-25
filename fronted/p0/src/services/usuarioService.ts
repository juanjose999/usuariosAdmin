import type { Usuario, UsuarioPath } from '../types/usuario';
import type { ApiResponse } from '../types/apiResponse';

const API_URL = 'http://localhost:8080/usuario';

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function enviarPeticion(
  url: string,
  opciones: RequestInit = {}
): Promise<ApiResponse> {
  const response = await fetch(url, {
    ...opciones,
    headers: {
      'Content-Type': 'application/json',
      ...opciones.headers,
    },
  });

  const dataJson = (await response.json().catch(() => null)) as
    | Partial<ApiResponse>
    | null;

  if (!response.ok || dataJson?.success === false) {
    const mensajeError =
      dataJson?.message ?? `Error ${response.status} en el servidor`;
    throw new ApiError(mensajeError, response.status);
  }

  return {
    success: Boolean(dataJson?.success ?? true),
    message: dataJson?.message ?? 'OK',
    data:
      typeof dataJson?.data === 'object' && dataJson.data !== null
        ? dataJson.data
        : {},
  };
}

export async function listarUsuarios(): Promise<Usuario[]> {
  const res = await enviarPeticion(API_URL);
  return Array.isArray(res.data) ? (res.data as Usuario[]) : [];
}

export async function buscarByEmailOrRut(
  email: string,
  rut: string
): Promise<Usuario[]> {
  const params = new URLSearchParams();
  if (email.trim()) params.set('email', email.trim());
  if (rut.trim()) params.set('rut', rut.trim());

  const query = params.toString();
  const url = query ? `${API_URL}?${query}` : API_URL;

  const res = await enviarPeticion(url);
  return Array.isArray(res.data) ? (res.data as Usuario[]) : [];
}

export async function crearUsuario(usuario: Usuario): Promise<Usuario> {
  const res = await enviarPeticion(API_URL, {
    method: 'POST',
    body: JSON.stringify(usuario),
  });
  return res.data as Usuario;
}

export async function actualizarUsuario(
  email: string,
  usuario: UsuarioPath
): Promise<Usuario> {
  const res = await enviarPeticion(
    `${API_URL}/${encodeURIComponent(email)}`,
    {
      method: 'PATCH',
      body: JSON.stringify(usuario),
    }
  );
  console.log('da', res)
  return res.data as Usuario;
}

export async function eliminarUsuario(email: string): Promise<boolean> {
  const res = await enviarPeticion(
    `${API_URL}/${encodeURIComponent(email)}`,
    {
      method: 'DELETE',
    }
  );
  return res.success;
}