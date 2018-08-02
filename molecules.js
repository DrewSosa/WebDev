// #TODO: keep a list of colliders, and color them red...
 var colliders = []
 var molecules = []

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
        ctx.fillStyle = "blue"
         ctx.beginPath();
         ctx.arc(molecule.x, molecule.y, molecule.radius,0,2*Math.PI);
         ctx.stroke();

         ctx.fill()

         ctx.closePath();
     }


 }
 // Background
 function Molecule(window_height, r = 100, g = 100, b = 100, size = 2, velocity = 5) {
    // object variables
     this.vx = velocity;
     this.vy = velocity
     this.x = window_height / 2;
     this.y = window_height / 2;
     this.r = r;
     this.g = g;
     this.b = b;
     this.radius = Math.pow(size, 2) * Math.PI;

    //  Object methods. Molecule implements the Point2D interface.
     this.getX = function() {
         return this.x
     }
     this.getY = function(){
         return this.x
     }
     this.setX = function(x){
         this.x = x
     }
     this.setY = function(y){
         this.y = y
     }
     this.updateMe = function() {
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;
        if (this.x > window_height || this.x < 0) {
            this.vx = -this.vx;
        }
        if (this.y + 1 > window_height || this.y - 1 < 0) {
            this.velocity = -this.velocity;
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


// implement PointQuadTree to find collisions

function PointQuadTree(molecule, x1, y1, x2, y2) {
    this.molecule1 = molecule;
	this.x1 = x1; this.y1 = y1; this.x2 = x2; this.y2 = y2;
    this.c1 = null
    this.c2 = null
    this.c3 = null
    this.c4 = null

    /**
	 * Returns the child (if any) at the given quadrant, 1-4
	 * @param quadrant	1 through 4
	 */
    // Quadrant is an int
    this.getChild = function(quadrant) {
		if (quadrant==1) return c1;
		if (quadrant==2) return c2;
		if (quadrant==3) return c3;
		if (quadrant==4) return c4;
		return null;
	}
    // Check if there is a child
    this.hasChild = function(quadrant) {
		return (quadrant==1 && c1!=null) || (quadrant==2 && c2!=null) || (quadrant==3 && c3!=null) || (quadrant==4 && c4!=null);
	}
    // ****** change the point inserts...!
    // molecule2 of type Point. Inserts a point into the PointQuadtree. If a child exists within a quadrant already, then, recursively insert into that child.
   this.insert = function(molecule2) {
		//quadrant 1
	 if (molecule2.getX() >= molecule1.getX() && molecule2.getX() <= x2 && (molecule2.getY() >= y1 && molecule2.getY() <= molecule1.getY()) ) {
			if (this.hasChild(1)) {
				c1.insert(molecule2);
			}
			else{
				c1 = new PointQuadtree(molecule2, molecule1.getX(), y1 ,x2, molecule1.getY());
			}
		}
		//quadrant 2
		else if ( (molecule2.getX() >= x1 && molecule2.getX() <= molecule1.getX()) && (molecule2.getY() >= y1 && molecule2.getY() <= molecule1.getY()) ){
			if (this.hasChild(2)) {
				c2.insert(molecule2);
			}
				else{
					c2 = new PointQuadtree(molecule2,x1,y1, molecule1.getX(), molecule1.getY());			}
		}
		//quadrant 3
		else if ( (molecule2.getX() >= x1 && molecule2.getX() <= molecule1.getX()) && (molecule2.getY() >= molecule1.getY() && molecule2.getY() <= y2)) {
			if (this.hasChild(3)) {
				c3.insert(molecule2);

			}
			else{
				c3 = new PointQuadtree(molecule2,x1,molecule1.getY(), molecule1.getX(), y2);
			}
		}
		//quadrant 4
		else if ( ( molecule2.getX() >= molecule1.getX() && molecule2.getX() <= x2) && (molecule2.getY() >= molecule1.getY() && molecule2.getY()  <= y2)) {
			if (this.hasChild(4)) {
				c4.insert(molecule2);
			}
			else{
				c4 = new PointQuadtree(molecule2, molecule1.getX(), molecule1.getY(),x2,y2);
			}
		}
	}

// Size
   this.size = function() {

		var size = 1;
		if (this.hasChild(1)) {
			size++;
			c1.size();
		}
		if (this.hasChild(2)) {
			size++;
			c2.size();
		}
		if (this.hasChild(3)) {
			size++;
			c3.size();
		}
		if (this.hasChild(4)) {
			size++;
			c4.size();
		}
		return size;
	}
    // end of PointQuadTree function
}

function FindColliders(){
    // colliders holds collided molecules.
    var colliders = []
    PointQuadtree<Blob> tree = new PointQuadtree(molecules.get(0), 0,0,800,600);
    for (molecule in molecules) {
        tree.insert(molecule);
    }

}