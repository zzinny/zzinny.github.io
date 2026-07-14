class Ship extends Mover {	
	display() {
		push();
		translate(-width/2, 0, 0);
		
		strokeWeight(0.2);
		stroke(255);
		
		let r = 60;
		for (let y=1; y<50; y++) {
			line(this.location.x-r+random(-3,3), this.location.y+y+random(-7,7), this.location.x+r+random(-3,3), this.location.y+y+random(-7,7));
			r-=0.5;
		}

		for (let i=0; i<10; i++) {
			line(this.location.x+1+random(-3,3), this.location.y-100, this.location.x+1+random(-3,3), this.location.y);
		}

		let w = 1;
		for (let y=-100; y<-30; y+=1) {
			line(this.location.x, this.location.y+y+random(-5,5), this.location.x+w+random(-3,3), this.location.y+y+random(-5,5));
			w+=0.5;
		}
		pop();
	}
}