import { apiUrl, setToken, setCookie } from "./session.js";

const inputEmailSignin = document.getElementById("emailInput");
const inputPasswordSignin = document.getElementById("passwordInput");
const btnSignin = document.getElementById("btnSignin");
const signInForm = document.getElementById("signinForm");
// const apiUrl = "http://localhost:8000/api"; // ton backend API

btnSignin.addEventListener("click", checkCredentials);

function checkCredentials() {
    e.preventDefault(); // Empêche le rechargement de la page
    const dataForm = new FormData(signInForm);

    // Ici , il faudra appeler l'Api pour vérifier les credentials en BDD

    // Préparer la requête
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: dataForm.get("email"), // Assure-toi que le 'name' de l'input est "email"
            password: dataForm.get("mdp"),
        }),
    };
    fetch(apiUrl + "/login", requestOptions)
        .then((response) => {
            if (!response.ok) {
                // identifiants incorrects → ajoute classes bootstrap
                inputEmail.classList.add("is-invalid");
                inputPassword.classList.add("is-invalid");
                throw new Error("Identifiants incorrects");
            }
            return response.json();
        })
        .then((result) => {
            // Stocker le token et le rôle via session.js
            setToken(result.apiToken);
            setCookie(RoleCookieName, result.roles[0], 7);

            // Redirection vers la page d'accueil
            window.location.replace("/");
        })
        .catch((error) => {
            console.error("Erreur lors de la connexion :", error);
        });
}
