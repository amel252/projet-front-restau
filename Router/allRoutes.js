import Route from "./Route.js";

//définir ici vos routes
export const allRoutes = [
    new Route("/", "Acceuil", "/pages/home.html"),
    // je crée la route de ma page pour qu'elle s'affiche
    new Route("/galerie", "Galerie", "/pages/galerie.html"),
    new Route("/signin", "Connexion", "/pages/auth/signin.html"),
    new Route("/signout", "Inscription", "/pages/auth/signout.html"),
    new Route("/account", "Compte", "/pages/auth/account.html"),
    new Route(
        "/editPassword",
        "modification mot de passe",
        "/pages/auth/editPassword.html"
    ),
];

//le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Quai Antique";
