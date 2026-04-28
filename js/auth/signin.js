import { apiUrl, setToken, setCookie } from "../script.js";

const inputEmailSignin = document.getElementById("emailInput");
const inputPasswordSignin = document.getElementById("passwordInput");
const btnSignin = document.getElementById("btnSignin");
const signInForm = document.getElementById("signinForm");

btnSignin.addEventListener("click", checkCredentials);

function checkCredentials(e) {
    e.preventDefault();
    const dataForm = new FormData(signInForm);

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: dataForm.get("email"),
            password: dataForm.get("mdp"),
        }),
    };
    fetch(apiUrl + "/login", requestOptions)
        .then((response) => {
            if (!response.ok) {
                inputEmailSignin.classList.add("is-invalid");
                inputPasswordSignin.classList.add("is-invalid");
                throw new Error("Identifiants incorrects");
            }
            return response.json();
        })
        .then((result) => {
            setToken(result.apiToken);
            setCookie(RoleCookieName, result.roles[0], 7);
            window.location.replace("/");
        })
        .catch((error) => {
            console.error("Erreur lors de la connexion :", error);
        });
}
