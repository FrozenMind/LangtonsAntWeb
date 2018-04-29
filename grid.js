class Grid {
	constructor(canWidth, canHeight, rectSize, defaultColor) {
		this.rect_arr = []
		this.can_width = canWidth
		this.can_height = canHeight
		this.rect_size = rectSize
		this.default_color = defaultColor
		
		this.max_y = canHeight / rectSize
		this.max_x = canWidth / rectSize
		
		for(var y = 0; y < this.max_y; y++){
			this.rect_arr[y] = []
			for(var x = 0; x < this.max_x; x++){
				this.rect_arr[y][x] = {x: x * rectSize, y: y * rectSize, color: this.default_color}
			}
		}
	}
	
	createShape(xIndex, yIndex, color){
		this.rect_arr[yIndex][xIndex].shape = new createjs.Shape()
		let cmd = this.rect_arr[yIndex][xIndex].shape.graphics.beginFill(color).command
		this.rect_arr[yIndex][xIndex].cmd = cmd
		this.rect_arr[yIndex][xIndex].shape.graphics.drawRect(0, 0, this.rect_size, this.rect_size)
		this.rect_arr[yIndex][xIndex].shape.x = this.rect_arr[yIndex][xIndex].x
		this.rect_arr[yIndex][xIndex].shape.y = this.rect_arr[yIndex][xIndex].y
		stage.addChild(this.rect_arr[yIndex][xIndex].shape)
	}

	changeColor(xIndex, yIndex, color){
		this.rect_arr[yIndex][xIndex].cmd.style = color
	}	
	
	getColorAt(xIndex, yIndex){
		return this.rect_arr[yIndex][xIndex].color
	}
}
