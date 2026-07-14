class Mover {
	constructor(x, y, z, vx, vy, vz, acx, acy, acz) {
		this.location = createVector(x, y, z);
		this.velocity = createVector(vx, vy, vz);
		this.accel = createVector(acx, acy, acz);
	}
	
	update() {
		this.velocity.add(this.accel);
		this.location.add(this.velocity);
		
		if (this.location.y < 40 || this.location.y > 60) {
			this.velocity.y *= -1;
		}
		
		if (this.location.x < 0 || this.location.x > width) {
			this.velocity.x *= -1;
		}
	}
	
	display() {}
	
}