
 function updateMolecules() {
     for (var i =0;i<molecules.length;i++) {
        molecule = molecules[i];
        // change speed every 10% of frames
        if (Math.random()<0.1){
        molecule.changeSpeed();
    }
         molecule.updateMe();
         console.log(molecule.x)
     }
 }

 function drawMolecules() {
     var canvas = document.getElementById('molecules');
     var ctx = canvas.getContext('2d');
     ctx.clearRect(0, 0, canvas.width, canvas.height);
     for (var i =0;i<molecules.length;i++) {
        molecule = molecules[i];
        ctx.fillStyle = "red"
         ctx.beginPath();
         ctx.arc(molecule.x, molecule.y, molecule.radius,0,2*Math.PI);
         ctx.stroke();

         ctx.fill()

         ctx.closePath();
     }


 }
 // Background
 function Molecule(window_height, r = 100, g = 100, b = 100, size = 2, velocity = 5) {
     this.vx = velocity;
     this.vy = velocity
     this.x = window_height / 2;
     this.y = window_height / 2;
     this.r = r;
     this.g = g;
     this.b = b;
     this.radius = Math.pow(size, 2) * Math.PI;
      this.updateMe = function() {
         this.x = this.x + this.vx;
         this.y = this.y + this.vy;
         if (this.x > window_height || this.x < 0) {
             this.vx = - this.vx;
         }
         if (this.y + 1 > window_height || this.y - 1 < 0) {
             this.velocity = - this.velocity;
         }

     }
     this.changeSpeed = function(){
      this.vx= Math.floor(Math.random()*5)-2.5;
      this.vy= Math.floor(Math.random()*5)-2.5;
}
 }



 function make_molecules(number, window_height) {

     for (i = 0; i < number; i++) {
         molecules.push(new Molecule(window_height, velocity=2));
     }



 }
 var molecules = []
 var FPS = 30;
 setInterval(function() {
     updateMolecules();
     drawMolecules();
 }, 1000 / FPS);
