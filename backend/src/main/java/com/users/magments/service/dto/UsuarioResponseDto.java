package com.users.magments.service.dto;

import java.util.Date;

public record UsuarioResponseDto(
        Long id,
        String nombres,
        String apellidos,
        Long rut,
        String dv,
        Date fechaNacimiento,
        String correoElectronico,
        String contrasena
) {
}
