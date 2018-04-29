class Ant {
	constructor(setting) {
		this.direction = setting.direction
		this.color = setting.color || "red"
		this.y_index = setting.y_index || 0
		this.x_index = setting.x_index || 0
	}
	
	turn(dir){
		switch(dir){
			case "l":
			case "left":
				this.direction--
				break
			case "r":
			case "right":
				this.direction++
				break
			default:
				throw new Error("cant turn ant to " + dir)
				break
		}			
		if(this.direction == 4) this.direction = 0
		if(this.direction == -1) this.direction = 3
	}
	
	moveForward() {
		switch(this.direction){
			case 0: //up
				this.y_index --
				break
			case 1:	//right
				this.x_index ++
				break
			case 2: //down
				this.y_index ++
				break
			case 3: //left
				this.x_index --
				break
			default:
				throw new Error("cant move Ant to direction: " + this.direction)
				break
		}
	}
	
}
