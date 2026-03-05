package com.domain.previred.dto;

import java.sql.Date;

public record UsuarioDTO(
    Long id,
    String nombres,
    String apellidos,
    Long rut,
    String dv,
    Date fechaNacimiento,
    String correoElectronico,
    String contrasena
) {}
