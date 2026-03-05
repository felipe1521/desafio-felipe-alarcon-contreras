import { useState, useEffect } from 'react'
import { createUsuario, deleteUsuario, getUsuarios, updateUsuario } from './services/UsuarioService';
import type { Usuario } from './models/Usuario';
import UsuarioForm from './components/UsuarioForm';
import UsuarioList from './components/UsuarioList';

function App() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    loadUsuarios();
  }, []);

  const loadUsuarios = async () => {
    const data = await getUsuarios();
    setUsuarios(data);
  };

  const handleSave = async (usuario: Usuario) => {
    if (usuario.id) {
      await updateUsuario(usuario.id, usuario);
    } else {
      const newUsuario = await createUsuario(usuario);
      setUsuarios([...usuarios, newUsuario]);
    }

    setSelectedUsuario(null);
    loadUsuarios();
  };

  const handleDelete = async (id: number) => {
    await deleteUsuario(id);
    setUsuarios(usuarios.filter((u: Usuario) => u.id !== id));
  };

  return (
    <div>
      <h1 className="title">Gestión de Usuarios</h1>
      <div className="container">
        <UsuarioForm
          onSave={handleSave}
          selectedUsuario={selectedUsuario}
        />

        <UsuarioList
          usuarios={usuarios}
          onEdit={setSelectedUsuario}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}

export default App
