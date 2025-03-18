// implementer le js de ma page
const inputNom = document.getElementById("NomInput");
const inputPrenom = document.getElementById("PrenomInput");
const inputEmail = document.getElementById("emailInput");
const inputPassword = document.getElementById("passwordInput");
const inputValidatePassword = document.getElementById("ValidatePasswordInput");
const btnValidation = document.getElementById("btn-validation-inscription");

inputNom.addEventListener("keyup", validateForm);
inputPrenom.addEventListener("keyup", validateForm);
inputEmail.addEventListener("keyup", validateForm);
inputPassword.addEventListener("keyup", validateForm);
inputValidatePassword.addEventListener("keyup", validateForm);

// function permet de valider tout le formulaire/ faire disabled pour que je peux valider des champs vide et non correct
function validateForm() {
    const nomOk = validateRequired(inputNom);
    const prenomOk = validateRequired(inputPrenom);
    const mailOk = validateMail(inputEmail);
    const passwordOk = validatePassword(inputPassword);
    if (nomOk && prenomOk && mailOk && passwordOk) {
        btnValidation.disabled = false;
    } else {
        btnValidation.disabled = true;
    }
    // validatePassword(inputPassword, inputValidatePassword);
}
// vérifier le mail :::::
function validateMail(input) {
    // définir mon Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const mailUser = input.value;
    if (mailUser.match(emailRegex)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}
function validateRequired(input) {
    if (input.value != "") {
        // is-valid et is-invalid c'est des classes bootstrap pour valider ou pas un champ
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}
function validatePassword(input) {
    // définir mon Regex
    const passwordRegex =
        // const passwordRegex = ;

        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    const passwordUser = input.value;
    if (passwordUser.match(passwordRegex)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}
