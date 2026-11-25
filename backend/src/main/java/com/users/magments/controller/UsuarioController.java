package com.users.magments.controller;

import com.users.magments.exceptions.UsuarioException;
import com.users.magments.service.UsuarioService;
import com.users.magments.service.dto.UsuarioRequestDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Email;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/usuario")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Tag(name = "usuarios" , description = "Operaciones crud sobre usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    @Operation(
            summary = "Crear un usuario",
            description = "Valida la carga útil y registra un nuevo usuario en el sistema."
    )
    @PostMapping()
    public ResponseEntity<?> saveUser (@RequestBody  UsuarioRequestDto usuarioRequestDto) throws UsuarioException {
        return ResponseEntity.ok(
                new ResponseCustom(
                        true,
                        "usuario creado correctamente",
                        usuarioService.save(usuarioRequestDto)
                )
        );
    }

    @Operation(summary = "Obtener todos los usuarios")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Usuarios encontrado"),
    })
    @GetMapping()
    public ResponseEntity<?> findAll(@RequestParam (required = false) String email,
                                     @RequestParam (required = false) String rut){
        return ResponseEntity.ok(
                new ResponseCustom(
                        true,
                        "",
                        usuarioService.findAll(email, rut)
                )
        );
    }

    @Operation(summary = "Obtener usuario por correo")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Item encontrado"),
            @ApiResponse(responseCode = "404", description = "Item no encontrado")
    })
    @PatchMapping("/{email}")
    public ResponseEntity<?> updateUser(@PathVariable String email,
                                        @RequestBody UsuarioRequestDto usuarioRequestDto) throws UsuarioException {
        return ResponseEntity.ok(
                new ResponseCustom(
                        true,
                        "usuario actualizado correctamente",
                        usuarioService.update(email, usuarioRequestDto)
                )
        );
    }

    @DeleteMapping("/{email}")
    public ResponseEntity<?> deleteUser(@PathVariable @Email String email) throws UsuarioException {
        usuarioService.deleteUserByEmail(email);
        return ResponseEntity.ok(
                new ResponseCustom(
                        true,
                        "Usuario eliminado correctamente",
                        null
                )
        );
    }

}
