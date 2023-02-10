import Obstacle  from './ObstacleClass.js';

// bonne pratique : une seule classe exportée par fichier et on l'exporte par 
// defaut
export default class MonstreAnime extends Obstacle {
    constructor(x, y, l, h, image, vy) {
        // on appelle le constructeur de la classe mère
        super(x, y, l, h, 'black');
        this.vy = -vy;
        this.image = image;
    }
    // on hérite de la méthode draw(ctx)
    draw(ctx) {
        this.y += this.vy;
        // collision en bas
        if(this.y + this.h > ctx.canvas.height) {
            // On met l'obstacle au point de contact
            this.y = ctx.canvas.height - this.h;
            // et on inverse la vitesse
            this.vy = -this.vy;
        }
        // collision en haut
        if(this.y < 0) {
            // On met l'obstacle au point de contact
            this.y = 0;
            // et on inverse la vitesse
            this.vy = -this.vy;
        }

        // on appelle la méthode draw de la classe mère
        ctx.drawImage(this.image, this.x, this.y, this.l, this.h);
    }

}

