const canvas = document.getElementById('canvas')

const X = canvas.width = window.innerWidth;
const Y = canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d')

// Check screen size for responsive condition
var width = document.documentElement.clientWidth || window.innerWidth;

// recupérer une image aléatoire
const randomImageSource = function(){
    const sources= {
        01: 'wp-content/themes/epicerie/images/01.png',
        02: 'wp-content/themes/epicerie/images/02.png',
        03: 'wp-content/themes/epicerie/images/03.png',
        04: 'wp-content/themes/epicerie/images/04.png'
    }
    const rndInt = Math.floor(Math.random() * 4) + 1
    return sources[rndInt]
}

//Nombre d'image max en fond
let nbOfImages = null
if (width <= 480) {
    // mobile
    nbOfImages = 8;
    //Tablette
    }else if (width <= 770) {
    nbOfImages = 10;
    }else {
    // desktop
    nbOfImages = 20;
}
// Tableau contenant les images
let images = [];
// remplissage du tableau avec des instances d'images aléatoire
for( let i=0; i< nbOfImages; i++){
    // Placement aléatoire sur l'axe x de l'image
    let x = Math.floor(Math.random()*canvas.width) -50;
    // Placement aléatoire sur l'axe y en commencent au dessus du l'ecran 
    let y = -Math.floor(Math.random() * ((Y + Y/2) - Y/2) + Y/2) *1.5;
    // Vitesse de descente aléatoire
    let speed = Math.random() * (0.6 - 0.3) + 0.3;

    images[i] = new Images(x, y, speed)
}
// Création d'une image aléatoire et ses spécificités
function Images(x, y, speed){
    this.x = x;
    this.y = y;
    this.speed = speed

    const img = new Image();
    //récupération de la source d'une image aléatoire
    let randomImage = randomImageSource()
    img.src = randomImage
    // Fonction de descente des images
    this.fall = function(){
        //Vitesse de descente
        this.y = this.y + this.speed;
        // quand l'image ateint le bas on la replace au dessus
        if(this.y > canvas.height){
            this.y = -100;
            this.x = Math.floor(Math.random()*canvas.width) -50;
        }
    }

    // Show l'image dans le DOM
    this.show = function(){
        // images size responsive
        if( width <= 480){
        ctx.drawImage(img, this.x, this.y, 50, 50)
        }else if (width <= 770) {
        ctx.drawImage(img, this.x, this.y, 75, 75)
        }else {
        ctx.drawImage(img, this.x, this.y, 100, 100)
        }
    }
    
}
// On lance draw et show pour faire apparaitre et descendre les images
function draw(){
    for(let i = 0; i< nbOfImages; i++){
        images[i].show();
        images[i].fall();
    }
}
// Permet l'initialisation de l'animation
function update(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    window.requestAnimationFrame(update)
}
// On lance l'animation
update();