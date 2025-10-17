// ---------- session.js ----------

// noms des cookies
const tokenCookieName = "accesstoken";
const RoleCookieName = "role";

// récupération du rôle
function getRole() {
    return getCookie(RoleCookieName);
}

// déconnexion
function signout() {
    eraseCookie(tokenCookieName);
    eraseCookie(RoleCookieName);
    window.location.reload();
}

// gestion du token
function setToken(token) {
    setCookie(tokenCookieName, token, 7);
}
function getToken() {
    return getCookie(tokenCookieName);
}

// fonctions génériques pour les cookies
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie =
        name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

// vérifier si l'utilisateur est connecté
function isConnected() {
    return getToken() !== null && getToken() !== undefined && getToken() !== "";
}

// afficher / cacher les éléments selon le rôle
function showAndHideElementsForRoles() {
    const userConnected = isConnected();
    const role = getRole();
    let allElementsToEdit = document.querySelectorAll("[data-show]");

    allElementsToEdit.forEach((element) => {
        element.classList.remove("d-none");
        switch (element.dataset.show) {
            case "disconnected":
                if (userConnected) element.classList.add("d-none");
                break;
            case "connected":
                if (!userConnected) element.classList.add("d-none");
                break;
            case "admin":
                if (!userConnected || role !== "admin")
                    element.classList.add("d-none");
                break;
            case "client":
                if (!userConnected || role !== "client")
                    element.classList.add("d-none");
                break;
        }
    });
}

// bouton de déconnexion
const signoutBtn = document.getElementById("signout-btn");
if (signoutBtn) signoutBtn.addEventListener("click", signout);
