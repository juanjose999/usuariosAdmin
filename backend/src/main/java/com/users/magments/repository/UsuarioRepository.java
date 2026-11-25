package com.users.magments.repository;

import com.users.magments.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findUsuarioByCorreoElectronico(String correoElectronico);
    boolean existsByCorreoElectronico(String correoElectronico);
    List<Usuario> findByCorreoElectronicoContaining(String correoElectronico);
    @Query("""
    SELECT u FROM Usuario u
    WHERE CAST(u.rut AS String) LIKE CONCAT('%', :rut, '%')
""")
    List<Usuario> findByRutContaining(@Param("rut") String rut);
    Boolean existsByRut(String rut);
}
