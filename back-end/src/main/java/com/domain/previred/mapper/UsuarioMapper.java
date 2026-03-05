package com.domain.previred.mapper;

import com.domain.previred.dto.UsuarioDTO;
import com.domain.previred.model.Usuario;

public class UsuarioMapper {
    public static UsuarioDTO toDTO(Usuario usuario) {
        return new UsuarioDTO(usuario.getId(), usuario.getNombres(), usuario.getApellidos(), usuario.getRut(), usuario.getDv(), 
            usuario.getFechaNacimiento(), usuario.getCorreoElectronico(), usuario.getContrasena());
    }
    
    public static Usuario toEntity(UsuarioDTO usuarioDTO) {
        return new Usuario(usuarioDTO.id(), usuarioDTO.nombres(), usuarioDTO.apellidos(), usuarioDTO.rut(), 
            usuarioDTO.dv(), usuarioDTO.fechaNacimiento(), usuarioDTO.correoElectronico(), usuarioDTO.contrasena());
    }
}
