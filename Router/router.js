// import { allRoutes, websiteName } from "./allRoutes.js";
// import { showAndHideElementsForRoles } from "../js/auth/session.js";
// import { getRole, isConnected } from "../js/auth/session.js";

// // Page 404
// const route404 = {
//     title: "Page introuvable",
//     html: "/pages/404.html",
//     roles: [],
// };

// // Récupérer la route correspondant à l'URL
// const getRoute = (url) => allRoutes.find((r) => r.url === url) || route404;

// // Charger le contenu de la page
// const loadPage = async () => {
//     const path = window.location.pathname;
//     const route = getRoute(path);

//     const role = getRole();
//     const connected = isConnected();

//     // Vérifier les droits
//     if (route.roles.length > 0) {
//         if (route.roles.includes("disconnected") && connected)
//             return redirect("/");
//         if (
//             !route.roles.includes("disconnected") &&
//             !route.roles.includes(role)
//         )
//             return redirect("/");
//     }

//     // Charger HTML
//     const html = await fetch(route.html).then((res) => res.text());
//     document.getElementById("main-page").innerHTML = html;

//     // Charger script si défini
//     if (route.script) {
//         const script = document.createElement("script");
//         script.type = "module";
//         script.src = route.script;
//         document.body.appendChild(script);
//     }

//     // Mettre à jour le titre
//     document.title = `${route.title} - ${websiteName}`;
// };

// // Redirection SPA
// const redirect = (url) => {
//     window.history.replaceState(null, "", url);
//     loadPage();
// };

// // Gestion des liens
// export const navigate = (event) => {
//     event.preventDefault();
//     const url = event.target.href;
//     window.history.pushState(null, "", url);
//     loadPage();
// };

// // Initialisation SPA
// window.onpopstate = loadPage;
// window.onload = () => loadPage();
import { allRoutes, websiteName } from "./allRoutes.js";
import {
    showAndHideElementsForRoles,
    getRole,
    isConnected,
} from "../js/auth/session.js";

// Page 404
const route404 = {
    title: "Page introuvable",
    html: "/pages/404.html",
    roles: [],
};

// Récupérer la route correspondant à l'URL
const getRoute = (url) => allRoutes.find((r) => r.url === url) || route404;

// Charger le contenu de la page
const loadPage = async () => {
    const path = window.location.pathname;
    const route = getRoute(path);

    const role = getRole();
    const connected = isConnected();

    // Vérification des droits
    if (route.roles.length > 0) {
        if (route.roles.includes("disconnected") && connected)
            return redirect("/");

        if (
            !route.roles.includes("disconnected") &&
            !route.roles.includes(role)
        )
            return redirect("/");
    }

    // Charger HTML
    const html = await fetch(route.html).then((res) => res.text());

    const main = document.getElementById("main-page");
    main.innerHTML = html;

    // Affichage selon rôle (IMPORTANT)
    showAndHideElementsForRoles();

    // Charger script spécifique si besoin
    if (route.script) {
        const existing = document.querySelector(
            `script[src="${route.script}"]`
        );

        if (!existing) {
            const script = document.createElement("script");
            script.type = "module";
            script.src = route.script;
            document.body.appendChild(script);
        }
    }

    // Titre de la page
    document.title = `${route.title} - ${websiteName}`;
};

// Redirection SPA
const redirect = (url) => {
    window.history.replaceState(null, "", url);
    loadPage();
};

// Gestion des liens SPA
export const navigate = (event) => {
    event.preventDefault();

    const url = event.currentTarget.href;

    window.history.pushState(null, "", url);
    loadPage();
};

// Navigation navigateur (retour / avance)
window.onpopstate = loadPage;

// Initialisation
window.onload = () => {
    loadPage();
    showAndHideElementsForRoles();
};
