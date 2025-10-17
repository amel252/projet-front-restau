const inputEmail = document.getElementById("emailInput");
const inputPassword = document.getElementById("passwordInput");
const btnSignin = document.getElementById("btnSignin");
const signInForm = document.getElementById("signinForm");
const apiUrl = "http://localhost:8000/api"; // ton backend API

btnSignin.addEventListener("click", checkCredentials);

function checkCredentials() {
    let dataForm = new FormData(formInscription);

    // Ici , il faudra appeler l'Api pour vérifier les credentials en BDD
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify({
        username: dataForm.get("email"),
        password: dataForm.get("mdp"),
    });
    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };
    fetch(apiUrl + "/login", requestOptions)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                inputEmail.classList.add("is-invalid");
                inputPassword.classList.add("is-invalid");
            }
        })
        .then((result) => {
            const token = result.apiToken;
            setToken(token);
            //placer ce token en cookie
            setCookie(RoleCookieName, result.roles[0], 7);
            window.location.replace("/");
        })
        .catch((error) => console.log("error", error));
}
