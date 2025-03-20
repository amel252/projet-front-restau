const inputEmail = document.getElementById("emailInput");
const inputPassword = document.getElementById("passwordInput");
const btnSignin = document.getElementById("btnSignin");

btnSignin.addEventListener("click", checkCredentials);
function checkCredentials() {
    // Ici , il faudra appeler l'Api pour vérifier les credentials en BDD
    if (inputEmail.value == "test@mail.com" && inputPassword.value == "123") {
        //Il faudra récupérer le vrai token
        const token =
            "lkjsdngfljsqdnglkjsdbglkjqskjgkfjgbqslkfdgbskldfgdfgsdgf";
        setToken(token);
        //placer ce token en cookie
        setCookie(RoleCookieName, "admin", 7);

        // rediriger l'utilisateur vers la page d'acceuil
        window.location.replace("/");
    } else {
        inputEmail.classList.add("is-invalid");
        inputPassword.classList.add("is-invalid");
        // Ajoutez un petit message d'erreur ou une icône pour indiquer que la saisie est incorrecte.
        // alert("vous n'etes pas connecté ");
    }
}
