package com.domain.previred.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.domain.previred.dto.UsuarioDTO;
import com.domain.previred.model.Usuario;
import com.domain.previred.repository.UsuarioRepository;
import com.domain.previred.mapper.UsuarioMapper;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public List<UsuarioDTO> obtenerTodosUsuarios() {
        try {
            return usuarioRepository.findAll()
            .stream()
            .map(usuario -> UsuarioMapper.toDTO(usuario))
            .toList();
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener todos los usuarios.", e);
        } 
    }

    public UsuarioDTO obtenerUsuarioPorID(Long id) {
        try {
            return usuarioRepository.findById(id)
                .stream()
                .map(usuario -> UsuarioMapper.toDTO(usuario))
                .findFirst()
                .orElse(null);
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener usuario.", e);
        } 
    }

    public UsuarioDTO guardarUsuario(UsuarioDTO usuarioDTO) {
        try {
            Usuario nuevoUsuario = usuarioRepository.save(UsuarioMapper.toEntity(usuarioDTO));
            return UsuarioMapper.toDTO(nuevoUsuario);
        } catch (Exception e) {
            throw new RuntimeException("Error al crear un usuario.", e);
        } 
    }

    public UsuarioDTO actualizarUsuario(UsuarioDTO usuarioDTO, Long id) {
        try {
            Usuario usuario = usuarioRepository.findById(id)
                .orElse(null);
            if(usuario != null) {
                return guardarUsuario(usuarioDTO);
            }
            return usuarioDTO;
        } catch (Exception e) {
            throw new RuntimeException("Error al actualizar un usuario.", e);
        }
    }

    public void eliminarUsuario(Long id) {
        try {
            if(usuarioRepository.existsById(id)) {
                usuarioRepository.deleteById(id);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error al eliminar un usuario.", e);
        }
    }
}
