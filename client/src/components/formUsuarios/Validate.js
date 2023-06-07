export function validate(input) {
    let errors = {};
    //Expresion Regular Solo Números
const ExpRegSoloNumeros="^[0-9]+$";
const ExpRegEmail=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    const pattern = new RegExp('^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$');
    if(!input.dni){
      errors.dni='Este campo es obligatorio'
    }else if(input.dni.match(ExpRegSoloNumeros)== null){
        errors.dni='No se aceptan letras'
    }else if (input.name === '') {
        errors.name = 'El campo nombre es requerido';
    } else if (!pattern.test(input.name)) {
        errors.name = 'No se aceptan números'
    }else if(!input.lastName){
        errors.lastName='Este campo es obligatorio'
    }else if (!pattern.test(input.lastName)) {
        errors.lastName = 'No se aceptan números'
    }else if(!input.phone){
        errors.phone='Debe colocar su número telefonico'
    }else if(input.phone.match(ExpRegSoloNumeros)== null){
        errors.phone='No se aceptan letras'
    }else if(!input.contactEmergency){
        errors.contactEmergency='Debe colocar el nombre del contacto de emergencia'
    }else if (!pattern.test(input.contactEmergency)) {
        errors.contactEmergency = 'No se aceptan números'
    }else if(!input.phoneEmergency){
        errors.phoneEmergency='Debe colocar el telefono del contacto de emergencia'
    }else if(input.phoneEmergency.match(ExpRegSoloNumeros)== null){
        errors.phoneEmergency='No se aceptan letras'
    }else if(!input.email){
        errors.email='Debe colocar su email'
    }else if(input.email.match(ExpRegEmail)==null){
        errors.email='Debe colocar un Email valido'
    }else if(!input.typeBlood){
        errors.typeBlood='Debe colocar su tipo de sangre'
    }else if(!input.password){
        errors.password='Debe colocar una contraseña'
    }else if(!input.positionId){
        errors.positionId='Debe escoger un cargo'
    }else if(!input.projectId){
        errors.projectId='Debe escoger un proyecto'
    }
    
    return errors;
}