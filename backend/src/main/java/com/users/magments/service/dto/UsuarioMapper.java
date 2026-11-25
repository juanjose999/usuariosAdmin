package com.users.magments.service.dto;

import com.users.magments.model.Usuario;

public class UsuarioMapper {

    public static Usuario toUsuario(UsuarioRequestDto usuarioRequestDto){
        Usuario usuario = new Usuario();
        usuario.setNombres(usuarioRequestDto.nombres());
        usuario.setApellidos(usuarioRequestDto.apellidos());
        usuario.setRut(usuarioRequestDto.rut());
        usuario.setDv(usuarioRequestDto.dv());
        usuario.setFechaNacimiento(usuarioRequestDto.fechaNacimiento());
        usuario.setCorreoElectronico(usuarioRequestDto.correoElectronico());
        usuario.setContrasena(usuarioRequestDto.contrasena());
        return usuario;
    }

    public static UsuarioResponseDto toResponseDto(Usuario usuario){
        return new UsuarioResponseDto(
                usuario.getId(),
                usuario.getNombres(),
                usuario.getApellidos(),
                usuario.getRut(),
                usuario.getDv(),
                usuario.getFechaNacimiento(),
                usuario.getCorreoElectronico(),
                usuario.getContrasena()
        );
    }

}
