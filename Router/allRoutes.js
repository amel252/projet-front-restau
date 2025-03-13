import Route from "./Route.js";

//définir ici vos routes
export const allRoutes = [
    new Route("/", "Acceuil", "/pages/home.html"),
    // je crée la route de ma page pour qu'elle s'affiche
    new Route("/galerie", "Galerie", "/pages/galerie.html"),
];

//le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Quai Antique";
