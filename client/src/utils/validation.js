const regexUserName =
  /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/;
const regexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/;

const regexFirstName = /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/;
const regexLastName = /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/;
// Validar login
export const validateLogin = (input) => {
  let errors = {};

  if (!input.username) {
    errors.username = "Correo es requerido";
  } else if (!regexUserName.test(input.username)) {
    errors.username = "Correo inválido";
  } else if (!input.password) {
    errors.password = "Contraseña es requerida";
  } else if (!regexPassword.test(input.password)) {
    errors.password = "Contraseña inválida";
  } else if (!input.role) {
    errors.role = "Seleccione un rol";
  }

  return errors;
};
// Validar cambio de imagen de perfil
export const validateProfileImage = (input) => {
  let errors = {};

  if (!input.image) {
    errors.image = "Imagen es requerida";
  } else if (input.image.name.length > 200) {
    errors.image = "Imagen máxima de 200 caracteres";
  }

  return errors;
};
// Validar formulario de actualización de contraseña
export const validatePassword = (input) => {
  let errors = {};

  if (!input.currPassword) {
    errors.currPassword = "La contraseña actual es requerida";
  } else if (!regexPassword.test(input.currPassword)) {
    errors.currPassword = "Contraseña inválida";
  } else if (!input.newPassword) {
    errors.newPassword = "La nueva contraseña es requerida";
  } else if (!regexPassword.test(input.newPassword)) {
    errors.newPassword = "Contraseña inválida";
  } else if (!input.rePassword) {
    errors.rePassword = "Repetir la nueva contraseña es requerida";
  } else if (!regexPassword.test(input.rePassword)) {
    errors.rePassword = "Contraseña inválida";
  } else if (input.newPassword !== input.rePassword) {
    errors.rePassword = "Las contraseñas no coinciden";
  }

  return errors;
};
// Validar formulario registrar usuario
export const validateUserRegister = (input) => {
  let errors = {};

  if (!input.firstName) {
    errors.firstName = "Nombre es requerido";
  } else if (
    !regexFirstName.test(input.firstName) ||
    input.firstName.length < 3
  ) {
    errors.firstName = "Nombre inválido";
  } else if (!input.lastName) {
    errors.lastName = "Apellido es requerido";
  } else if (!regexLastName.test(input.lastName) || input.lastName.length < 3) {
    errors.lastName = "Apellido inválido";
  } else if (!input.username) {
    errors.username = "Nombre de usuario requerido";
  } else if (!regexUserName.test(input.username)) {
    errors.username = "Nombre de usuario inválido";
  } else if (!input.password) {
    errors.password = "Contraseña es requerida";
  } else if (!regexPassword.test(input.password)) {
    errors.password = "Contraseña inválida";
  }

  return errors;
};
// Validar formulario editar usuario
export const validateDataUserEdit = (input) => {
  let errors = {};

  if (!input.firstName) {
    errors.firstName = "Nombre es requerido";
  } else if (
    !regexFirstName.test(input.firstName) ||
    input.firstName.length < 3
  ) {
    errors.firstName = "Nombre inválido";
  } else if (!input.lastName) {
    errors.lastName = "Apellido es requerido";
  } else if (!regexLastName.test(input.lastName) || input.lastName.length < 3) {
    errors.lastName = "Apellido inválido";
  } else if (!input.username) {
    errors.username = "Nombre de usuario requerido";
  } else if (!regexUserName.test(input.username)) {
    errors.username = "Nombre de usuario inválido";
  } else if (
    !regexPassword.test(input.passwordEdit) &&
    input.passwordEdit.length > 0
  ) {
    errors.passwordEdit = `Nueva contraseña inválida\nCompleta solo si deseas cambiar la contraseña`;
  }

  return errors;
};
// Validar formulario crear y actualizar operador
export const validateOperator = (input) => {
  let errors = {};

  if (isNaN(input.dni)) {
    errors.dni = "Identificación es requerida";
  } else if (input.dni <= 0 || input.dni.toString().length < 6) {
    errors.dni = "Identificación inválida";
  } else if (!input.firstName) {
    errors.firstName = "Nombre es requerido";
  } else if (
    !regexFirstName.test(input.firstName) ||
    input.firstName.length < 3
  ) {
    errors.firstName = "Nombre inválido";
  } else if (!input.lastName) {
    errors.lastName = "Apellido es requerido";
  } else if (!regexLastName.test(input.lastName) || input.lastName.length < 3) {
    errors.lastName = "Apellido inválido";
  } else if (!input.company) {
    errors.company = "Empresa es requerida";
  } else if (!input.signature) {
    errors.signature = "Firma es requerida";
  }

  return errors;
};
// validar formulario crear proyecto
export const validateProject = (input) => {
  let errors = {};

  if (!input.name) {
    errors.name = "El campo nombre es requerido";
  } else if (!input.dateStart) {
    errors.dateStart = "La fecha de inicio es obligatorio";
  } else if (!input.dateEnd) {
    errors.dateEnd = "La fecha de finalización es obligatorio";
  } else if (!input.totalCertificates || input.totalCertificates < 1) {
    errors.totalCertificates = "Este campo no acepta valores inferioes a 1";
  } else if (!input.location) {
    errors.location = "Este campo es obligatorio";
  }

  return errors;
};
