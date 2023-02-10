import Joueur from './JoueurClasse.js';
import Obstacle from './ObstacleClass.js';
import ObstacleAnime from './ObstacleAnime.js';
import ObstacleAnimeClignotant from './ObstacleAnimeClignotant.js';
import ObstacleTexture from './ObstacleTexture.js';
import { ajouteEcouteurSouris, ajouteEcouteursClavier, inputState, mousePos } from './ecouteurs.js';
import { circRectsOverlap, rectsOverlap } from './collisions.js';
import { loadAssets } from './assets.js';
import Sortie from './Sortie.js';
import Coin from './Coin.js';
import { creerLesNiveaux, tabNiveaux } from './levels.js';
import Timer from './Timer.js';
import Bombe from './Bombe.js';
import MonstreAnime from './MonstreAnime.js';

let canvas, ctx;
let gameState = 'menuStart';
let joueur, sortie;
let niveau = 0;
let tableauDesObjetsGraphiques = [];
let tableauDesBombes = [];
let assets;
let score = 0;
let timer;
let bombe;
let monstre;



// Bonne pratique : on attend que la page soit chargée
// avant de faire quoi que ce soit
window.onload = init;

function init(event) {
    console.log("Page chargée et les éléments HTML sont prêts à être manipulés");
    canvas = document.querySelector('#myCanvas');
    //console.log(canvas);
    // pour dessiner, on utilise le contexte 2D
    ctx = canvas.getContext('2d');

    // chargement des assets (musique,  images, sons)
    loadAssets(startGame);

    //startGame();
}

function startGame(assetsLoaded) {
    assets = assetsLoaded;
    timer = new Timer("decompte");
    creerLesNiveaux(assets);
    // appelée quand tous les assets sont chargés
    console.log("StartGame : tous les assets sont chargés");
    //assets.backinblack.play();

    // On va prendre en compte le clavier
    ajouteEcouteursClavier();
    ajouteEcouteurSouris();

    demarreNiveau(niveau);

    requestAnimationFrame(animationLoop);
}

function demarreNiveau(niveau) {
    if (niveau > tabNiveaux.length - 1) {
        console.log("PLUS DE NIVEAUX !!!!!");
        niveau--;
        return;
    }
    // sinon on passe au niveau suivant
    //timer
    timer.stop();
    timer.setTime(tabNiveaux[niveau].temps);
    timer.start();

    // On initialise les objets graphiques qu'on va utiliser pour le niveau
    // courant avec les objets graphiques dans tabNiveaux[niveau]   
    tableauDesObjetsGraphiques = [...tabNiveaux[niveau].objetsGraphiques];
    // On crée le joueur   
    joueur = new Joueur(100, 0, 50, 50, assets.joueur, 3);

    sortie = tabNiveaux[niveau].sortie;
    // et on l'ajoute au tableau des objets graphiques
    tableauDesObjetsGraphiques.push(joueur);

    // on démarre la musique du niveau
    let nomMusique = tabNiveaux[niveau].musique;
    //assets[nomMusique].play();
}

function creerDesObstaclesLevel1() {
    tableauDesObjetsGraphiques.push(new Obstacle(250, 0, 30, 300, 'green'));
    tableauDesObjetsGraphiques.push(new ObstacleAnime(450, 0, 30, 300, 'green', 1));
    tableauDesObjetsGraphiques.push(new ObstacleAnimeClignotant(350, 0, 30, 300, 'red', 1));
    let url = 'https://img.freepik.com/free-vector/seamless-japanese-inspired-geometric-pattern_53876-80353.jpg';
    tableauDesObjetsGraphiques.push(new ObstacleTexture(550, 0, 30, 300, url));
}

function dessinerLesObjetsGraphiques(ctx) {
    tableauDesObjetsGraphiques.forEach(o => {
        o.draw(ctx);
    });
    /*
    for(let i = 0; i < tableauDesObstacles.length; i++) {
        tableauDesObstacles[i].draw(ctx);
    }
    */
}

var y = 0;
let ximg = 0;
function animationLoop() {
    // On va exécuter cette fonction 60 fois par seconde
    // pour créer l'illusion d'un mouvement fluide
    // 1 - On efface le contenu du canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    switch (gameState) {
        case 'menuStart':
            afficheMenuStart(ctx);
            break;
        case 'gameOver':
            afficheGameOver(ctx);
            break;
        case 'ecranDebutNiveau':
            afficheEcranDebutNiveau(ctx);
            break;
        case 'jeuEnCours':
            //ximg++;
            //ximg = ximg % canvas.width;
            //ctx.drawImage(assets.bgn1, 0/*ximg++*/, 0, canvas.width, canvas.height);

            // 2 - On dessine le nouveau contenu
            tableauDesObjetsGraphiques.forEach(o => {
                o.draw(ctx);
            });

            // 3 - on déplace les objets
            testeEtatClavierPourJoueur();

            joueur.move();
            afficheScore(ctx)
            timer.draw(ctx, 150, 30);
            //joueur.followMouse()
            joueur.testeCollisionAvecBordsDuCanvas(canvas.width, canvas.height);
            detecteCollisionJoueurAvecObstaclesEtCoins();
            detecteCollisionJoueurAvecSortie();
            detecteCollisionEnemieAvecBombe();
            poserBombe(ctx);

            // addToScore();
            break;
    }

    // 4 - On rappelle la fonction d'animation
    requestAnimationFrame(animationLoop);
}

function afficheEcranDebutNiveau(ctx) {
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = "40px Arial";
    ctx.fillText("Bienvenue au niveau " + niveau, 190, 100);
    ctx.restore();
}

function afficheMenuStart(ctx) {
    ctx.save()
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = "50px Arial";
    ctx.fillText("Press space to start", 190, 100);
    ctx.strokeText("Press space to start", 190, 100);
    if (inputState.space) {
        gameState = 'jeuEnCours';
    }
    ctx.restore();
}
function afficheGameOver(ctx) {
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = "50px Arial";
    ctx.fillText("GAME OVER", 190, 100);
    ctx.strokeText("GAME OVER", 190, 100);
    if (inputState.space) {
        gameState = 'menuStart';
        joueur.x = 0;
    }
    ctx.restore();
}
function testeEtatClavierPourJoueur() {
    if (inputState.space) {
        // on saute
        joueur.saute();
    } else {
        joueur.vx = 0;
        if (inputState.left) {
            joueur.vx = -5;
        } else {
            if (inputState.right) joueur.vx = 5;
        }
        joueur.vy = 0;
        if (inputState.up) {
            joueur.vy = -5;
        } else {
            if (inputState.down) joueur.vy = 5;
        }


    }



}
let ancienTemps=0;
let  tempsEcouleDepuisLaDerBombe=0;
function poserBombe(ctx) {

    if (inputState.keyS) {
       let tempsCourant= Date.now();
        
       let delta=tempsCourant-ancienTemps;
       tempsEcouleDepuisLaDerBombe+=delta;
        if (tempsEcouleDepuisLaDerBombe > 1000) {

            //une fois je clique sur S, je pose une bombe
            let bombe = new Bombe(joueur.x, joueur.y, 30, 30, assets.bombe, 3);
            tableauDesObjetsGraphiques.push(bombe);
            tableauDesBombes.push(bombe);
            tempsEcouleDepuisLaDerBombe=0;

        }
        
        ancienTemps=tempsCourant;

    }


}


function exempleDessin() {
    ctx.lineWidth = 20
    ctx.strokeStyle = 'green';
    ctx.strokeRect(10, y, 100, 150);

    ctx.fillStyle = 'rgba(200, 0, 0, 0.5)';
    ctx.fillRect(0, 10, 50, 70);

    ctx.lineWidth = 2
    ctx.font = "130px Arial";
    ctx.fillText("Hello", 190, 100);
    ctx.strokeText("Hello", 190, 100);

    // Les rectangles avec strokeRect et fillRect sont en mode "immédiat"
    // les cercles, lignes, courbes, sont en mode "bufférisé" ou "chemin" (path)
    // On commence par définir le chemin et à la fin tout le chemin est dessiné
    // d'un coup dans le GPU
    ctx.beginPath();
    ctx.arc(200, 200, 50, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(400, 200, 50, 0, Math.PI * 2);
    ctx.stroke();

    // 3 - On déplace les objets, on regarde ce que fait le joueur avec la souris, etc.
    // On teste les collisions etc... bref, on change l'état des objets graphiques à dessiner
    y += 0.1;
}



function detecteCollisionJoueurAvecObstaclesEtCoins() {
    let collisionExist = false;
    // On va tester si le joueur est en collision avec un des obstacles
    tableauDesObjetsGraphiques.forEach((o, index) => {

        if (o instanceof Obstacle) {
            //o.drawBoundingBox(ctx);
            if (rectsOverlap(joueur.x, joueur.y, joueur.l, joueur.h, o.x, o.y, o.l, o.h)) {
                collisionExist = true;
                assets.plop.play();
            }
        }
        else if (o instanceof Coin) {
            if (rectsOverlap(joueur.x, joueur.y, joueur.l, joueur.h, o.x, o.y, o.l, o.h)) {
                // collision avec une pièce
                score += 10;
                assets.victory.play();
                // splice supprime un élément d'un tableau
                // 1er paramètre : l'index de l'élément à supprimer, 
                // 2ème paramètre : le nombre d'éléments à supprimer
                tableauDesObjetsGraphiques.splice(index, 1);
            }
        }


    });

    if (collisionExist) {
        joueur.couleur = 'red';
        //gameState = 'gameOver';
        joueur.x -= 10;
        score -= 2;
        if (score <= 0){
            gameState = 'gameOver';
        }
    } else {
        joueur.couleur = 'green';
    }
}

function detecteCollisionJoueurAvecSortie() {
    joueur.drawBoundingBox(ctx);
    sortie.drawBoundingBox(ctx);
    if (circRectsOverlap(joueur.x, joueur.y, joueur.l, joueur.h, sortie.x, sortie.y, sortie.r)) {
        joueur.x = 10;
        joueur.y = 10;
        //gameState = 'ecranDebutNiveau';
        //niveauSuivant();
        sortie.couleur = 'lightgreen';
        assets.victory.play();
        return true;
    }
    return false;
}

function detecteCollisionEnemieAvecBombe() {


    // On va tester si le joueur est en collision avec un des obstacles
    tableauDesObjetsGraphiques.forEach((o, index) => {

        if (o instanceof MonstreAnime) {
            tableauDesBombes.forEach((bombe, indexbombe) => {
                if (rectsOverlap(bombe.x, bombe.y, bombe.l, bombe.h, o.x, o.y, o.l, o.h)) {
                    // collision avec une bombe
                    assets.victory.play();
                    // splice supprime un élément d'un tableau
                    // 1er paramètre : l'index de l'élément à supprimer, 
                    // 2ème paramètre : le nombre d'éléments à supprimer
                    let posen = tableauDesObjetsGraphiques.indexOf(o);
                    tableauDesObjetsGraphiques.splice(posen, 1);

                    let pos = tableauDesObjetsGraphiques.indexOf(bombe);
                    tableauDesObjetsGraphiques.splice(pos, 1);
                    tableauDesBombes.splice(indexbombe, 1);
                }
            });
        }


    });
}

function niveauSuivant() {
    // Passe au niveau suivant....
    // todo.....
    console.log("Niveau suivant !");
    // on arre^te la musique du niveau courant
    let nomMusique = tabNiveaux[niveau].musique;
    assets[nomMusique].stop();
    // et on passe au niveau suivant
    niveau++;
    demarreNiveau(niveau);
}



//SCORE

function afficheScore(ctx) {

    ctx.save();
    ctx.fillStyle = 'black';
    ctx.font = "20px Arial";
    ctx.fillText("Score : " + score, 10, 30);
    if (detecteCollisionJoueurAvecSortie()) {
        score++;
        niveau++;
        demarreNiveau(niveau);
    }

}
    // ...
/*
function addToScore() {  
      score++;  

}
    */
