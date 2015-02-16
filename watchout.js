// start slingin' some d3 here.
//Reimplement this game, referring to the source code as needed. You should have commits that refer to each of these numbered steps.
//Draw the enemies in an svg element.
//Make it so that the enemies move to a new random location every second using.
//Make a differently-colored dot to represent the player. Make it draggable.
//Detect when a enemy touches you.
//Keep track of the user's score, and display it.
//Use css3 animations to make the enemies whirling shuriken.

var gameStats = {
  score: 0,
  bestScore: 0,
  collision: 0,
  inCollision: false
};

var boardWidth = window.innerWidth;
var boardHeight = window.innerHeight;

var circleRadius = 30;
  
var axes = {
    x: d3.scale.linear().domain([0, 100]).range([0, boardWidth]),
    y: d3.scale.linear().domain([0, 100]).range([0, boardHeight])
  };

var pixelize = function(number){ return number + 'px'; }
var rand = function(n){ return Math.floor( Math.random() * n ); };
var randX = function(){ return pixelize( rand(window.innerWidth+circleRadius*2) ) };
var randY = function(){ return pixelize ( rand(window.innerHeight+circleRadius*2) ) };

increaseScore = function() {
  if(!inCollison) {
    gameStats.score += 1;
  }
  return updateScore();
};

updateScore = function() {
  return d3.select('.current').select('span').text(gameStats.score.toString());
};

updateBestScore = function() {
  if(gameStats.bestScore < gameStats.score){
    gameStats.bestScore = gameStats.score;
  }
  return d3.select('.high').select('span').text(gameStats.bestScore.toString());
};

updateCollision = function() {
  return d3.select('.collisions').select('span').text(gameStats.collision.toString());
};


//was body
var board = d3.select('.board')
/*.style({
  width: pixelize( boardWidth ),
  height: pixelize( boardHeight )
  });*/
  .append('svg')
  .attr('width', boardWidth)
  .attr('height', boardHeight)
  .attr('class', 'board');

var enemies = [];  
var enemyCount = 150;

var drag = d3.behavior.drag()
  .on('dragstart', function() { player.style('fill', 'red'); })
  .on('drag', function() { player.attr('x', d3.event.x)
    .attr('y', d3.event.y); })
  .on('dragend', function() { player.style('fill', 'orange'); });

var player = board.selectAll('.player')
  .data([{x:(boardHeight/2), y:(boardHeight/2), r:circleRadius}])
  .enter()
  .append('svg:image')
  .attr("xlink:href", "http://www.ninjasoftware.net/images/NinjaSoftware.png") // one of our problems - makes other circles start at same place
  .attr('height','30px')
  .attr('width', '30px')
  .attr('x', function(d) { return d.x; })
  .attr('y', function(d) { return d.y; })
  .attr('r', function(d) { return d.r; })
  .attr('class','player')
  .call(drag)

  for (var i = 0; i < enemyCount; i++) {
      circle = {
          x: boardWidth * Math.random(),
          y: boardHeight * Math.random(),
          radius: circleRadius,
          fill: 'blue',
          vx: Math.random()+1,
          vy: Math.random()+1,
          collision: 0,
          class: 'enemy'
      };
      enemies.push(circle);
  }

  // was circle
  var circlesSel = board.selectAll("circle").data(enemies)
    .enter()
    .append('svg:image')
    .attr("xlink:href", "http://www.clker.com/cliparts/W/O/h/E/A/w/ninja-star-md.png") // one of our problems - makes other circles start at same place
    .attr('height','30px')
    .attr('width', '30px')
    .attr('class', function(d) {return d.class;});
   
    if(!gameStats.inCollision)
    {
      setInterval(increaseScore, 500);
    }

  var startTime = new Date().getTime();
  d3.timer(step);

  function step() {
    //console.log("player: ", player.attr('cx'));
    inCollison = false;
    var i, len, c, time;
    for (i = 0, len = enemyCount; i < len; i++) {
        c = enemies[i];
        if (c.x >= (boardWidth) || c.x <= 0) c.vx *= -1;
        if (c.y >= (boardHeight) || c.y <= 0) c.vy *= -1;
        c.x += c.vx;
        c.y += c.vy;
    
        var xDiff = Math.pow(player.attr('x') - c.x,2);
        var yDiff = Math.pow(player.attr('y') - c.y,2);
        var sum = Math.sqrt(xDiff + yDiff);
        var sumRadius = parseFloat(player.attr('r')) + c.radius;
        //console.log('sum:' + sum + ' sumRadius:' + sumRadius);
        if(sum < sumRadius){
          inCollision = true;
          if(c.collision !== 1){
            c.collision = 1;
            gameStats.score = 0;
            gameStats.collision +=1;
            console.log("collision");
          }
        } else {
          c.collision = 0;
        }   

        updateCollision();
        updateScore();
        updateBestScore(); 
    }
    circlesSel.attr({
        "x": function (d) { return d.x; },
        "y": function (d) { return d.y; }
    });
   
}