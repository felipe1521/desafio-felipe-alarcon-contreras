import type { Usuario } from "../models/Usuario";

export default function UsuarioList({
  usuarios,
  onEdit,
  onDelete,
}: {
  usuarios: Usuario[];
  onEdit: (usuario: Usuario) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <table className="table-user">
      <thead>
        <tr className="table-user-group">
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>RUT</th>
          <th>Nacimiento</th>
          <th>Correo</th>
          <th>Contraseña</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((usuario) => (
          <tr key={usuario.id} className="table-user-group">
            <td>{usuario.nombres}</td>
            <td>{usuario.apellidos}</td>
            <td>{usuario.rut}-{usuario.dv}</td>
            <td>{usuario.fechaNacimiento}</td>
            <td>{usuario.correoElectronico}</td>
            <td>{usuario.contrasena}</td>
            <td>
              <button onClick={() => onEdit(usuario)}>Editar</button>
              <button onClick={() => onDelete(usuario.id!)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}