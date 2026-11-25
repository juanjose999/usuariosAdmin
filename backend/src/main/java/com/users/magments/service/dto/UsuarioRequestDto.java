package com.users.magments.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;

import java.util.Date;

@Schema(description = "Datos requeridos para registrar o crear un usuario")
public record UsuarioRequestDto(
        @Schema(description = "Nombres del usuario", example = "Juan José")
        @NotBlank(message = "El nombre es obligatorio")
        String nombres,

        @Schema(description = "Apellidos del usuario", example = "Sierra")
        @NotBlank(message = "El apellido es obligatorio")
        String apellidos,

        @Schema(description = "Número de RUT sin dígito verificador", example = "1098765432")
        @NotNull(message = "El RUT es obligatorio")
        Long rut,

        @Schema(description = "Dígito verificador del RUT (1 carácter)", example = "7")
        @NotBlank(message = "El dígito verificador es obligatorio")
        @Size(max = 1, message = "El DV debe tener máximo un carácter")
        String dv,

        @Schema(description = "Fecha de nacimiento anterior a la fecha actual", example = "1998-05-15")
        @NotNull(message = "La fecha de nacimiento es obligatoria")
        @Past(message = "La fecha de nacimiento debe ser anterior a hoy")
        Date fechaNacimiento,

        @Schema(description = "Correo electrónico del usuario", example = "juan.sierra@ejemplo.com")
        @NotBlank(message = "El correo electrónico es obligatorio")
        @Email(message = "El correo electrónico no tiene un formato válido")
        String correoElectronico,

        @Schema(description = "Contraseña de acceso (mínimo 8 caracteres)", example = "ClaveSegura123*")
        @NotBlank(message = "La contraseña es obligatoria")
        @Size(min = 8, message = "La contraseña debe tener mínimo 8 caracteres")
        String contrasena
) {
}