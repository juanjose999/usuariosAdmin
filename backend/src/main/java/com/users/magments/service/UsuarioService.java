package com.users.magments.service;

import com.users.magments.exceptions.UsuarioException;
import com.users.magments.model.Usuario;
import com.users.magments.repository.UsuarioRepository;
import com.users.magments.service.dto.UsuarioMapper;
import com.users.magments.service.dto.UsuarioRequestDto;
import com.users.magments.service.dto.UsuarioResponseDto;
import jakarta.persistence.*;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class UsuarioService{

    private final UsuarioRepository usuarioRepository;

    public UsuarioResponseDto save(UsuarioRequestDto usuarioRequestDto) throws UsuarioException {
        if(usuarioRepository.existsByCorreoElectronico(usuarioRequestDto.correoElectronico())){
            throw new UsuarioException("Usuario ya existe con el correo " + usuarioRequestDto.correoElectronico());
        }
        if(usuarioRepository.existsByRut(String.valueOf(usuarioRequestDto.rut()))){
            throw new UsuarioException("Usuario ya existe con el rut " + usuarioRequestDto.rut());
        }
        Usuario toUser =  UsuarioMapper.toUsuario(usuarioRequestDto);
        Usuario savedUser = usuarioRepository.save(
                toUser
        );
        return UsuarioMapper.toResponseDto(savedUser);
    }

    public Set<UsuarioResponseDto> findAll(String email, String rut) {

        Set<UsuarioResponseDto> resultado = new HashSet<>();

        if ((email == null || email.isBlank()) &&
                (rut == null || rut.isBlank())) {

            usuarioRepository.findAll().stream()
                    .map(UsuarioMapper::toResponseDto)
                    .forEach(resultado::add);

            return resultado;
        }

        if (email != null && !email.isBlank()) {
            resultado.addAll(findUsuarioByCorreoElectronico(email));
        }

        if (rut != null && !rut.isBlank()) {
            try{
                resultado.addAll(findUsuarioByRut(Long.valueOf(rut)));
            }catch (Exception e){
                System.out.println(e.getMessage());
            }

        }

        return resultado;
    }

    private List<UsuarioResponseDto> findUsuarioByCorreoElectronico(String correoElectronico){
        List<Usuario> usersByEmail = usuarioRepository.findByCorreoElectronicoContaining(correoElectronico);
        return usersByEmail.stream().map((u) -> UsuarioMapper.toResponseDto(u)).toList();
    }

    private List<UsuarioResponseDto> findUsuarioByRut(Long rut){
        List<Usuario> usersByEmail = usuarioRepository.findByRutContaining(String.valueOf(rut));
        return usersByEmail.stream().map((u) -> UsuarioMapper.toResponseDto(u)).toList();
    }

    public UsuarioResponseDto update(String email, UsuarioRequestDto usuario) throws UsuarioException {

        Usuario findUser = findUserByEmail(email);

        if (usuario.nombres()!= null) {
            findUser.setNombres(usuario.nombres());
        }

        if (usuario.apellidos() != null) {
            findUser.setApellidos(usuario.apellidos());
        }

        if (usuario.rut() != null) {
            findUser.setRut(usuario.rut());
        }

        if (usuario.dv() != null) {
            findUser.setDv(usuario.dv());
        }

        if (usuario.fechaNacimiento() != null) {
            findUser.setFechaNacimiento(usuario.fechaNacimiento());
        }

        if (usuario.correoElectronico() != null) {
            findUser.setCorreoElectronico(usuario.correoElectronico());
        }

        if (usuario.contrasena() != null) {
            findUser.setContrasena(usuario.contrasena());
        }

        Usuario userUpdated = usuarioRepository.save(findUser);

        return UsuarioMapper.toResponseDto(userUpdated);
    }

    private Usuario findUserByEmail(String email) throws UsuarioException {
        return usuarioRepository.findUsuarioByCorreoElectronico(email)
                .orElseThrow(() -> new UsuarioException("Usuario no encontrado"));
    }

    public void deleteUserByEmail(String email) throws UsuarioException {
        Usuario usuario = findUserByEmail(email);
        usuarioRepository.delete(usuario);
    }

}
