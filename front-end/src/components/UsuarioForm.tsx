import { useState, useEffect } from "react";
import type { Usuario } from "../models/Usuario";
import { formatearRut, separarRut } from "../utils/rutUtils";

export default function UsuarioForm({ 
  onSave, 
  selectedUsuario 
}: {
  onSave: (usuario: Usuario) => void;
  selectedUsuario?: Usuario | null;
}) {
  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    rutDv: "",
    fechaNacimiento: "",
    correoElectronico: "",
    contrasena: ""
  });

  const [errors, setErrors] = useState({
    correo: ""
  });

  useEffect(() => {
    if (selectedUsuario) {
      setForm({
        ...selectedUsuario,
        rutDv: `${selectedUsuario.rut}-${selectedUsuario.dv}`
      });
    }
  }, [selectedUsuario]);

  const validarEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return regex.test(email);
  };

  const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedRut = formatearRut(e.target.value);
    setForm({
      ...form,
      [e.target.name]: formattedRut
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "correoElectronico") {
      const correoError = (!validarEmail(e.target.value)) ? "Formato de correo inválido" : "";
      setErrors(prev => ({
        ...prev,
        correo: correoError
      }));
    }

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { rutNumero, rutDv } = separarRut(form.rutDv);

    const user = {
      ...selectedUsuario,
      nombres: form.nombres,
      apellidos: form.apellidos,
      fechaNacimiento: form.fechaNacimiento,
      rut: rutNumero,
      dv: rutDv,
      correoElectronico: form.correoElectronico,
      contrasena: form.contrasena
    };

    onSave(user);

    setForm({
      nombres: "",
      apellidos: "",
      rutDv: "",
      fechaNacimiento: "",
      correoElectronico: "",
      contrasena: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form-user">
      <input
        name="nombres"
        placeholder="Nombres"
        value={form.nombres}
        onChange={handleChange}
        required
      />

      <input
        name="apellidos"
        placeholder="Apellidos"
        value={form.apellidos}
        onChange={handleChange}
        required
      />

      <input
        name="rutDv"
        placeholder="12345678-9"
        value={form.rutDv}
        onChange={handleRutChange}
        required
      />

      <input
        type="date"
        name="fechaNacimiento"
        value={form.fechaNacimiento}
        onChange={handleChange}
        required
      />

      <div>
        <input
          name="correoElectronico"
          placeholder="Correo"
          value={form.correoElectronico}
          onChange={handleChange}
          required
        />
        {errors.correo && (<p style={{ color: "red", fontSize: "0.8rem" }}>{errors.correo}</p>)}
      </div>

      <input
        type="password"
        name="contrasena"
        placeholder="Contraseña"
        value={form.contrasena}
        onChange={handleChange}
        required
      />

      <button type="submit" disabled={!!errors.correo}>
        {selectedUsuario ? "Actualizar" : "Crear"}
      </button>

    </form>
  );
}