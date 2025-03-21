import Route from "./Route.js";

//définir ici vos routes
export const allRoutes = [
    new Route("/", "Acceuil", "/pages/home.html"),
    // je crée la route de ma page pour qu'elle s'affiche
    new Route("/galerie", "Galerie", "/pages/galerie.html"),
    new Route(
        "/signin",
        "Connexion",
        "/pages/auth/signin.html",
        "/js/auth/signin.js"
    ),
    new Route(
        "/signout",
        "Inscription",
        "/pages/auth/signup.html",
        "/js/auth/signup.js"
    ),
    new Route("/account", "Compte", "/pages/auth/account.html"),
    new Route(
        "/editPassword",
        "modification mot de passe",
        "/pages/auth/editPassword.html"
    ),
    new Route(
        "/allResarvation",
        "Vos réservation",
        "/pages/reservation/allResarv.html"
    ),
    new Route("/reserver", "Réserver", "/pages/reservation/reserver.html"),
];

//le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Quai Antique";
