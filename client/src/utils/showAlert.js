import Swal from "sweetalert2";

export const showAlertLogin = (titulo, mensaje, tipo) => {
  return Swal.fire({
    title: titulo,
    text: mensaje,
    icon: tipo,
    showConfirmButton: false,
    allowEscapeKey: false,
    allowOutsideClick: false,
    timer: 1700,
    timerProgressBar: true,
  });
};

export const showAlertWithTimer = (titulo, mensaje, tipo) => {
  return Swal.fire({
    title: titulo,
    text: mensaje,
    icon: tipo,
    showConfirmButton: false,
    allowEscapeKey: false,
    allowOutsideClick: false,
    timer: 1700,
  });
};

export const showAlertNormal = (
  titulo,
  mensaje,
  tipo,
  mostrarBtnConfirmar = true,
  mostrarBtnCancelar = false
) => {
  return Swal.fire({
    title: titulo,
    text: mensaje,
    icon: tipo,
    showConfirmButton: mostrarBtnConfirmar,
    showCancelButton: mostrarBtnCancelar,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Aceptar",
    cancelButtonText: "Cancelar",
    allowEscapeKey: false,
    allowOutsideClick: false,
  });
};
