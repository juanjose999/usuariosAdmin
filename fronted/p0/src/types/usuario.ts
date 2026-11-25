export interface Usuario {
    nombres: string,
    apellidos: string,
    rut : number, 
    dv: number,
    fechaNacimiento: string,
    correoElectronico: string,
    contrasena: string,
    isEdit?: boolean
}

export interface UsuarioUI extends Usuario {
    isEdit : boolean
}

export type UsuarioPath = Partial<Usuario>;