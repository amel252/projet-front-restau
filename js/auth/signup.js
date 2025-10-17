import { apiUrl } from "./session.js";
// implementer le js de ma page
const inputNom = document.getElementById("NomInput");
const inputPrenom = document.getElementById("PrenomInput");
const inputEmailSignup = document.getElementById("emailInput");
const inputPasswordSignup = document.getElementById("passwordInput");
const inputValidatePassword = document.getElementById("ValidatePasswordInput");
const btnValidation = document.getElementById("btn-validation-inscription");
const formInscription = document.getElementById("formulaireInscription");

inputNom.addEventListener("keyup", validateForm);
inputPrenom.addEventListener("keyup", validateForm);
inputEmailSignup.addEventListener("keyup", validateForm);
inputPasswordSignup.addEventListener("keyup", validateForm);
inputValidatePassword.addEventListener("keyup", validateForm);

btnValidation.addEventListener("click", InscrireUtilisateur);

// function qui valide le formulaire complet/ faire disabled pour que je peux valider des champs vide et non correct
function validateForm() {
    const nomOk = validateRequired(inputNom);
    const prenomOk = validateRequired(inputPrenom);
    const mailOk = validateMail(inputEmailSignup);
    const passwordOk = validatePassword(inputPasswordSignup);
    const passwordConfirmOk = validateConfirmationPassword(
        inputPasswordSignup,
        inputValidatePassword
    );
    btnValidation.disabled = !(
        nomOk &&
        prenomOk &&
        mailOk &&
        passwordOk &&
        passwordConfirmOk
    );
}
function validateConfirmationPassword(inputPwd, inputConfirmPwd) {
    if (inputPwd.value == inputConfirmPwd.value) {
        inputConfirmPwd.classList.add("is-valid");
        inputConfirmPwd.classList.remove("is-invalid");
        return true;
    } else {
        inputConfirmPwd.classList.add("is-invalid");
        inputConfirmPwd.classList.remove("is-valid");
        return false;
    }
}
function validatePassword(input) {
    // définir mon Regex
    const passwordRegex =
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
// Vérifie si un champ obligatoire est rempli
function validateMail(input) {
    // définir mon Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (input.value.match(emailRegex)) {
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
    if (input.value.trim() != "") {
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

//
function InscrireUtilisateur(e) {
    e.preventDefault();
    const dataForm = new FormData(formInscription);

    let raw = JSON.stringify({
        firstName: dataForm.get("nom"),
        lastName: dataForm.get("prenom"),
        email: dataForm.get("email"),
        password: dataForm.get("mdp"),
    });

    fetch(apiUrl + "/registration", {
        method: "POST",
        headers: ("Content-Type", "application/json"),
        body: raw,
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erreur lors de l'inscription");
            }
            return response.json();
        })
        .then((result) => {
            alert(
                "Bravo " +
                    dataForm.get("prenom") +
                    ", vous êtes maintenant inscrit, vous pouvez vous connecter."
            );
            document.location.href = "/signin";
        })
        .catch((error) => console.error(error));
}
