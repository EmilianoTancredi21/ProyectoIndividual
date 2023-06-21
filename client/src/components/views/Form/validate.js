// export const validate = (driver) => {
//   const errors = {
//     forename: "",
//     surname: "",
//     description: "",
//     nationality: "",
//     image: "",
//     dob: "",
//     selectedTeams: "",
//     isValid: true
//   };

//   if (!driver.image) {
//     errors.image = "URL de imagen requerida";
//   }

//   const validateText = (field, fieldName, maxLength = null) => {
//     if (!driver[field]) {
//       errors.isValid = false;
//       errors[field] = `El campo ${fieldName} es requerido`;
//     } else if (maxLength && driver[field].length > maxLength) {
//       errors.isValid = false;
//       errors[field] = `La longitud máxima es de ${maxLength} caracteres`;
//     } else if (field !== "dob" && /\d/.test(driver[field])) {
//       errors.isValid = false;
//       errors[field] = `El campo ${fieldName} no puede contener números`;
//     }
//   };

//   validateText("forename", "nombre", 25);
//   validateText("surname", "apellido", 20);
//   validateText("dob", "fecha de nacimiento");
//   validateText("nationality", "nacionalidad", 30);

//   if (!driver.description) {
//     errors.isValid = false;
//     errors.description = "La descripción es requerida";
//   }

//   if (!driver.selectedTeams || driver.selectedTeams.length === 0) {
//     errors.isValid = false;
//     errors.selectedTeams = "Debe seleccionar al menos un equipo";
//   }

//   console.log(errors);
//   return errors;
// };
