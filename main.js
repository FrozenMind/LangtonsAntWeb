let stage, width, height, paused = true,
  rect_size = 20,
  grid, ants = [],
  rule_set, step = 0,
  step_shape, fps = 20, //to display current step and fps
  let number_of_rules = 2,
    background_color = "white", //for now white and black
    color_array = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
      '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
      '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
      '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
      '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
      '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
      '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
      '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
      '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
      '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
    ];

$(document).ready(function() {
  console.log("ready")
  //catch key clicks
  $("body").keydown(function(e) {
    keydown(e)
  })
  rescaleCanvas() //rescale canvas to fullscreen
  start() //start
})

window.onerror = function() {
  restart()
  console.log("! GLOBAL ERROR !")
}

//rescale canvas to fullscreen
function rescaleCanvas() {
  let canWidth = $('body').width()
  let canHeight = $('body').height()
  $('#can').attr("width", canWidth)
  $('#can').attr("height", canHeight)
}

//restart everything
function restart() {
  //remove ticker and all childs
  createjs.Ticker.removeEventListener("tick", tick);
  stage.removeAllChildren()
  stage.update()
  //set all variables to undefined
  step_shape = undefined
  stage = undefined
  ants = []
  rule_set = undefined
  step = 0
  grid = undefined
  start() //start again
}

//init and start ticker
function start() {
  //setup / init stage size
  stage = new createjs.Stage('can')
  $('#can').css('background-color', background_color);
  width = stage.canvas.width
  height = stage.canvas.height

  //create 2D array for area
  grid = new Grid(width, height, rect_size, background_color)

  //init ant at mid point
  ants.push(new Ant({
    direction: 1, // 1 = right
    y_index: parseInt(grid.max_y / 2),
    x_index: parseInt(grid.max_x / 2),
    color: "red" //startColor
  }))
  /* you can add multiple ants
  ants.push(new Ant(
  	{
  		direction: 0,
  		y_index: parseInt(grid.max_y / 2),
  		x_index: parseInt(grid.max_x / 2 - 5),
  		color: "yellow"
  	}))
	*/

  //create shapes for ants
  for (var a = 0; a < ants.length; a++) {
    grid.createShape(ants[a].x_index, ants[a].y_index, ants[a].color)
  }

  //load rules
  loadRules()

  //init text shape
  step_shape = new createjs.Text("FPS: " + fps + "\nStep: " + step, "11px Arial", "#00ff00");
  step_shape.x = 10;
  step_shape.y = 10;
  stage.addChild(step_shape)

  //start ticker
  stage.update()
  createjs.Ticker.setFPS(fps)
  createjs.Ticker.addEventListener("tick", tick)
}

//load rules
function loadRules() {
  rule_set = new RuleSet()
  /*
   * important with rules is that the colors loop
   * otherwise theres a high chance the ant stops suddenly
   * the classic rule
   * rule_set.add("white", "black", "r")
   * rule_set.add("black", "white", "l")
   */
  //generate a random of rules
  number_of_rules = Math.floor(Math.random() * (6 - 3 + 1)) + 3
  var c1 = color_array[Math.floor(Math.random() * color_array.length)]
  var c2
  rule_set.add(background_color, c1, Math.floor(Math.random() * 2) === 1 ? "r" : "l")
  for (c = 0; c < number_of_rules - 2; c++) {
    c2 = color_array[Math.floor(Math.random() * color_array.length)]
    rule_set.add(c1, c2, Math.floor(Math.random() * 2) === 1 ? "r" : "l")
    c1 = c2
  }
  rule_set.add(c2, background_color, Math.floor(Math.random() * 2) === 1 ? "r" : "l")
  console.log(rule_set.rules)
}

//interval
function tick() {
  //if paused break function
  if (paused)
    return

  for (var a = 0; a < ants.length; a++) {
    //move ant
    //1. turn ant based on color
    var current_grid_field_color = grid.getColorAt(ants[a].x_index, ants[a].y_index)
    for (var r = 0; r < rule_set.rules.length; r++) {
      //if current grid field is same color as rule
      if (current_grid_field_color == rule_set.rules[r].from_color) {
        //turn ant based on rule
        ants[a].turn(rule_set.rules[r].turn)
        //change color based on rule
        grid.rect_arr[ants[a].y_index][ants[a].x_index].color = rule_set.rules[r].to_color
        grid.changeColor(ants[a].x_index, ants[a].y_index, rule_set.rules[r].to_color)
      }
    }

    //3. move ant on step forward
    ants[a].moveForward()

    //create shape for new field if not exist and change color to ant color
    if (!grid.rect_arr[ants[a].y_index][ants[a].x_index].shape) {
      grid.createShape(ants[a].x_index, ants[a].y_index, ants[a].color)
    } else {
      grid.changeColor(ants[a].x_index, ants[a].y_index, ants[a].color)
    }
  }

  //update step
  step++
  step_shape.text = "FPS: " + fps + "\nStep: " + step

  //update
  stage.update()
}

//key down event
function keydown(e) {
  switch (e.key) {
    case "p": //p = pause/continue (80)
      paused = !paused
      console.log("paused? " + paused)
      break
    case "+": //faster
      fps++
      createjs.Ticker.setFPS(fps)
      break;
    case "-": //slower
      if (fps > 1) {
        fps--
        createjs.Ticker.setFPS(fps)
      }
      break;
    case "r": //restart
      restart()
      break
    case "b": //toggle background white / black
      if (background_color == "white")
        background_color = "black"
      else
        background_color = "white"
      break
  }
}