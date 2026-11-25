package com.users.magments.exceptions;

import com.users.magments.controller.ResponseCustom;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingPathVariableException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.http.converter.HttpMessageNotReadableException;

import java.util.Map;
import java.util.HashMap;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Errores de validación de @Valid
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleValidation(
            MethodArgumentNotValidException ex) {

        return ResponseEntity.badRequest().body(new ResponseCustom(false, ex.getMessage(), null));
    }

    @ExceptionHandler(UsuarioException.class)
    public ResponseEntity<Object> userException(UsuarioException ex) {

        return ResponseEntity.badRequest().body(new ResponseCustom(false, ex.getMessage(), null));
    }

    @ExceptionHandler(MissingPathVariableException.class)
    public ResponseEntity<Object> paramException(Exception e) {
        return ResponseEntity.badRequest().body(new ResponseCustom(false, e.getMessage(), null));
    }

    // Errores al convertir JSON a objetos Java
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Object> handleJsonError(
            HttpMessageNotReadableException ex) {

        return ResponseEntity.badRequest().body(new ResponseCustom(false, "El formato de los fecha enviada es incorrecto", null));
    }
}