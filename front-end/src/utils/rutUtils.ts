export const formatearRut = (rut: string) => {
  if(!rut) return "";

  let limpio = rut.replace(/[^0-9kK]/g, "").toUpperCase();
  limpio = limpio.replace(/K/g, (match, index) => index === limpio.length - 1 ? match : "");

  if (limpio.length <= 1) return limpio;

  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);

  const cuerpoNumerico = cuerpo.replace(/[^0-9]/g, "");
  const cuerpoFormateado = cuerpoNumerico.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${cuerpoFormateado}-${dv}`;
};

export const separarRut = (rut: string) => {
  const rutLimpio = rut.replace(/\./g, "").replace("-", "");
  return {
    rutNumero: rutLimpio.slice(0, -1),
    rutDv: rutLimpio.slice(-1).toUpperCase()
  };
};
