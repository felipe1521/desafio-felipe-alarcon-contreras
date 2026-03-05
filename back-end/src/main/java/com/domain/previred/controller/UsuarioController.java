package com.domain.previred.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.domain.previred.dto.UsuarioDTO;
import com.domain.previred.service.UsuarioService;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
	private UsuarioService usuarioService;

	@GetMapping("")
	public ResponseEntity<List<UsuarioDTO>> obtenerTodosUsuarios() {
		return new ResponseEntity<List<UsuarioDTO>>(usuarioService.obtenerTodosUsuarios(), HttpStatus.OK);
	}
	@PostMapping("/guardar")
	public ResponseEntity<UsuarioDTO> guardarUsuario(@RequestBody UsuarioDTO UsuarioDTO) {
		return new ResponseEntity<UsuarioDTO>(usuarioService.guardarUsuario(UsuarioDTO), HttpStatus.CREATED);
	}
	@PutMapping("/editar/{id}")
	public ResponseEntity<UsuarioDTO> actualizarUsuario(@RequestBody UsuarioDTO UsuarioDTO, @PathVariable Long id) {
		return new ResponseEntity<UsuarioDTO>(usuarioService.actualizarUsuario(UsuarioDTO, id), HttpStatus.CREATED);
	}
	@DeleteMapping("/eliminar/{id}")
	public ResponseEntity<UsuarioDTO> eliminarUsuario(@PathVariable Long id) {
		usuarioService.eliminarUsuario(id);
		return new ResponseEntity<UsuarioDTO>(HttpStatus.OK);
	}
}
