import Sortie from "./Sortie.js";
import ObstacleAnimeClignotant from "./ObstacleAnimeClignotant.js";
import ObstacleAnime from "./ObstacleAnime.js";
import Obstacle from "./ObstacleClass.js";
import ObstacleTexture from "./ObstacleTexture.js";
import Coin from "./Coin.js";
import MonstreAnime from "./MonstreAnime.js";


let tabNiveaux = [];
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

// Charger l'image de fond
let backgroundImage = new Image();



function creerLesNiveaux(assets) {
let sortieLevel1 = new Sortie(500, 500, 50, "yellow");
let level1 = {
    objetsGraphiques: [
        sortieLevel1,
        new Coin(100,100,50,50,assets.coin,10),
        new Coin(300,150,50,50,assets.coin,10),
        new Coin(400,200,50,50,assets.coin,10),
        new MonstreAnime(250,300,50,50,assets.monstre,2),
    ],
    temps: 10,
    sortie : sortieLevel1,
    titre : "Niveau 1",
    description: "Souffre petit padawan !",
    background: "./assets/images/bgn1.jpg",
    musique: "xmas"
}
document.body.style.backgroundImage = `url(${level1.background})`;

tabNiveaux.push(level1);

let sortieLevel2 = new Sortie(600, 300, 40, "orange");
let level2 = {
    objetsGraphiques: [
        sortieLevel2,
        new ObstacleAnime(450, 0, 30, 300, 'green', 1),
        new Coin(100,100,50,50,assets.coin,10),
        new Coin(300,150,50,50,assets.coin,10),
        new Coin(400,200,50,50,assets.coin,10),
        new Coin(100,100,50,50,assets.coin,10),
        new Coin(300,150,50,50,assets.coin,10),
        new Coin(500,300,50,50,assets.coin,10),
        new MonstreAnime(250,200,50,50,assets.monstre,2),
        new MonstreAnime(150,300,50,50,assets.monstre2,2),
    ],
    sortie: sortieLevel2,
    temps: 30,
    titre : "Niveau 2",
    description: "Ne te laisse pas faire !",
    background: "mario",
    musique: "humbug"
}
tabNiveaux.push(level2);

let sortieLevel3 = new Sortie(600, 300, 40, "orange");
let level3 = {
    objetsGraphiques: [
        sortieLevel3,
        new ObstacleAnime(450, 0, 30, 300, 'red', 0.5),
        new Obstacle(100, 300, 75, 50, "purple"),
        new Coin(100,100,50,50,assets.coin,10),
        new Coin(300,150,50,50,assets.coin,10),
        new Coin(400,200,50,50,assets.coin,10),
        new Coin(100,100,50,50,assets.coin,10),
        new Coin(300,150,50,50,assets.coin,10),
        new Coin(500,300,50,50,assets.coin,10),
        new MonstreAnime(250,300,50,50,assets.monstre,2),
        new MonstreAnime(550,200,50,50,assets.monstre2,2),
        new MonstreAnime(450,100,50,50,assets.monstre3,-2),
    ],
    sortie: sortieLevel3,
    temps: 30,
    titre : "Niveau 3",
    description: "Ne te laisse pas faire !",
    background: "mario",
    musique: "humbug"
}
tabNiveaux.push(level3);

let sortieLevel4 = new Sortie(600, 300, 40, "orange");
let level4 = {
    objetsGraphiques: [
        sortieLevel4,
        new ObstacleAnime(450, 0, 30, 300, 'red', 1),
       // new ObstacleTexture(500, 200, 100, 100, "metal", "steel"),
        new Obstacle(100, 300, 75, 50, "purple"),
        new Coin(100,100,50,50,assets.coin,10),
        new Coin(300,150,50,50,assets.coin,10),
        new Coin(400,200,50,50,assets.coin,10),
        new Coin(100,100,50,50,assets.coin,10),
        new Coin(300,150,50,50,assets.coin,10),
        new Coin(500,300,50,50,assets.coin,10),
        new MonstreAnime(250,300,50,50,assets.monstre,2),
        new MonstreAnime(550,200,50,50,assets.monstre2,2),
        new MonstreAnime(450,100,50,50,assets.monstre3,-2),

    ],
    sortie: sortieLevel4,
    temps: 30,
    titre : "Niveau 4",
    description: "Ne te laisse pas faire !",
    background: "mario",
    musique: "humbug"
}
tabNiveaux.push(level4);
let sortieLevel5 = new Sortie(600, 300, 40, "orange");
let level5 = {
    objetsGraphiques: [
        sortieLevel5,
        new ObstacleAnime(450, 0, 30, 300, 'red', 1),
        new Obstacle(100, 300, 75, 50, "purple"),
        new ObstacleAnimeClignotant(400, 300, 75, 75, 'darkorange', 4),
       // new ObstacleTexture(500, 500, 100, 100, 'Water', 'droplet'),
        new Coin(100,100,50,50,assets.coin,10),
        new Coin(300,150,50,50,assets.coin,10),
        new Coin(400,200,50,50,assets.coin,10),
        new Coin(100,100,50,50,assets.coin,10),
        new Coin(300,150,50,50,assets.coin,10),
        new Coin(500,300,50,50,assets.coin,10),
        new MonstreAnime(250,300,50,50,assets.monstre,2),
        new MonstreAnime(550,200,50,50,assets.monstre2,2),
        new MonstreAnime(450,100,50,50,assets.monstre3,-2),
    ],
    sortie: sortieLevel5,
    temps: 30,
    titre : "Niveau 5",
    description: "Ne te laisse pas faire !",
    background: "mario",
    musique: "humbug"
}
tabNiveaux.push(level5);


let sortieLevel6 = new Sortie(600, 300, 40, "orange");
let level6 = {
    objetsGraphiques: [
        sortieLevel6,
        new ObstacleAnime(490, 0, 30, 300, 'red', 1),
        new Obstacle(50, 300, 75, 50, "purple"),
       // new ObstacleTexture(530, 200, 100, 100, "metal", "steel"),
        new Obstacle(300, 400, 50, 50, "cyan"),
        new Obstacle(150, 100, 75, 50, "green"),
        new ObstacleAnimeClignotant(200, 300, 35, 35, 'darkorange', 5),
       // new ObstacleTexture(500, 500, 100, 100, 'Water', 'droplet'),
        new Coin(100,100,50,50,assets.coin,10),
        new Coin(300,150,50,50,assets.coin,10),
        new Coin(400,200,50,50,assets.coin,10),
        new Coin(100,100,50,50,assets.coin,10),
        new Coin(300,150,50,50,assets.coin,10),
        new Coin(500,300,50,50,assets.coin,10),
        new MonstreAnime(250,300,50,50,assets.monstre,2),
        new MonstreAnime(550,200,50,50,assets.monstre2,2),
        new MonstreAnime(450,100,50,50,assets.monstre3,-2),
    ],
    sortie: sortieLevel6,
    temps: 30,
    titre : "Niveau 6",
    description: "Ne te laisse pas faire !",
    background: "mario",
    musique: "humbug"
}
tabNiveaux.push(level6);

}

export {creerLesNiveaux, tabNiveaux }