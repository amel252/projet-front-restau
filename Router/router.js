// import Route from "./Route.js";
// import { allRoutes, websiteName } from "./allRoutes.js";

// // Création d'une route pour la page 404 (page introuvable)
// const route404 = new Route("404", "Page introuvable", "/pages/404.html", []);

// // Fonction pour récupérer la route correspondant à une URL donnée
// const getRouteByUrl = (url) => {
//     let currentRoute = null;
//     // Parcours de toutes les routes pour trouver la correspondance
//     allRoutes.forEach((element) => {
//         if (element.url == url) {
//             currentRoute = element;
//         }
//     });

//     // Si aucune correspondance n'est trouvée, on retourne la route 404
//     if (currentRoute != null) {
//         return currentRoute;
//     } else {
//         return route404;
//     }
// };
// // Fonction pour charger le contenu de la page
// const LoadContentPage = async () => {
//     const path = window.location.pathname;
//     // Récupération de l'URL actuelle
//     const actualRoute = getRouteByUrl(path);

//     // ## vérifier les droits du contenu html de la route

//     const AllRolesArray = actualRoute.authorize;
//     const roleUser = getRole();
//     // chatGPT
//     if (AllRolesArray.length > 0) {
//         if (
//             AllRolesArray.includes("disconnected") &&
//             (isConnected() || AllRolesArray.includes(roleUser))
//         ) {
//             window.location.replace("/");
//             return;
//         }
//         if (
//             !AllRolesArray.includes(roleUser) &&
//             !AllRolesArray.includes("disconnected")
//         ) {
//             window.location.replace("/");
//             return;
//         }
//     }
//     // Récupération du contenu HTML de la route
//     const html = await fetch(actualRoute.pathHtml).then((data) => data.text());
//     // Ajout du contenu HTML à l'élément avec l'ID "main-page"
//     document.getElementById("main-page").innerHTML = html;
//     // Ajout du contenu JavaScript
//     if (actualRoute.pathJS != "") {
//         // Création d'une balise script
//         var scriptTag = document.createElement("script");
//         scriptTag.setAttribute("type", "text/javascript");
//         scriptTag.setAttribute("src", actualRoute.pathJS);
//         // Ajout de la balise script au corps du document
//         document.querySelector("body").appendChild(scriptTag);
//     }
//     // Changement du titre de la page
//     document.title = actualRoute.title + " - " + websiteName;
// };

// // Afficher et masquer les élements en fonction du role
// window.onload = function () {
//     showAndHideElementsForRoles();
// };

// // Fonction pour gérer les événements de routage (clic sur les liens)
// const routeEvent = (event) => {
//     event = event || window.event;
//     event.preventDefault();
//     // Mise à jour de l'URL dans l'historique du navigateur
//     window.history.pushState({}, "", event.target.href);
//     // Chargement du contenu de la nouvelle page
//     LoadContentPage();
// };
// // Gestion de l'événement de retour en arrière dans l'historique du navigateur
// window.onpopstate = LoadContentPage;
// // Assignation de la fonction routeEvent à la propriété route de la fenêtre
// window.route = routeEvent;
// // Chargement du contenu de la page au chargement initial
// LoadContentPage();
// ******************************************

import { allRoutes, websiteName } from "./allRoutes.js";

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

    // Vérifier les droits
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
    document.getElementById("main-page").innerHTML = html;

    // Charger script si défini
    if (route.script) {
        const script = document.createElement("script");
        script.type = "module";
        script.src = route.script;
        document.body.appendChild(script);
    }

    // Mettre à jour le titre
    document.title = `${route.title} - ${websiteName}`;
};

// Redirection SPA
const redirect = (url) => {
    window.history.replaceState(null, "", url);
    loadPage();
};

// Gestion des liens
export const navigate = (event) => {
    event.preventDefault();
    const url = event.target.href;
    window.history.pushState(null, "", url);
    loadPage();
};

// Initialisation SPA
window.onpopstate = loadPage;
window.onload = () => {
    showAndHideElementsForRoles();
    loadPage();
};
