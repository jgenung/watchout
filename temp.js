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
  bestScore: 0
};

// updateScore()
//  d3.select('#current-score').text(gameStats.score.toString())
  

//updateBestScore()
//  gameStats.bestScore = _.max[gameStats.bestScore, gameStats.score]
// d3.select('#best-score').text(gameStats.bestScore.toString())

var boardWidth = 1000;
var boardHeight = 1000;

var circleRadius = 15;

var board = d3.select('body').append('svg:svg')
  .attr('width', boardWidth)
  .attr('height', boardHeight);

var enemies = [];  

for(var x = 0; x < 65; x++){
  enemies.push(x);
}


//d3.select('body').append('svg')


/*d3.select("body").append("svg").attr("width", 50).attr("height", 50).append("circle")
    .attr("cx", 25).attr("cy", 25).attr("r", 25).style("fill", "purple");*/

/*var enemies = board.selectAll('circle').data(enemies)
  .enter()
  .append('circle');

/*var enemyAttributes = enemies
  .attr("cx", function(){ return Math.random() * 100;})
  .attr("cy", function(){return Math.random() * 100;})
  .attr("r", 25)
  .style("fill", "blue");*/

var drag = d3.behavior.drag()
  .on('dragstart', function() { player.style('fill', 'red'); })
  .on('drag', function() { player.attr('cx', d3.event.x)
    .attr('cy', d3.event.y); })
  .on('dragend', function() { player.style('fill', 'black'); });

var player = board.selectAll('.player')
  .data([{x:(boardHeight/2), y:(boardHeight/2), r:circleRadius}])
  .enter()
  .append('svg:circle') // one of our problems - makes other circles start at same place
  .attr('cx', function(d) { return d.x; })
  .attr('cy', function(d) { return d.y; })
  .attr('r', function(d) { return d.r; })
  .attr('class','player')
  .style("fill", "orange")
  .call(drag);


var circles = board.selectAll("circle")
  .data(enemies)
  .enter()
  .append("circle");
  //.style("fill", "orange");

var circleAttributes = circles
  .attr("cx", function(){ return Math.random() * 1000;})
  .attr("cy", function(){return Math.random() * 1000;})
  .attr("r", circleRadius)
  .style("fill", "blue");

var timer_elapsed = 0;

d3.timer(tickFn);

function tickFB(_elapsed) {
  timer_elapsed = _elapsed;
  
  for(var i = 0; i<enemies.length;i++) {

    var t_enemies = enemies[i];
    if (t_enemies.get('move') == true) {
      if (t_enemies.get('starttime') == undefined) {
        t_enemies.set('starttime', _elapsed);
      }

      // Calc elapsed time.
      var t_elapsed = _elapsed - t_enemies.get('starttime');

      // Keep a record.
      t_enemies.set('elapsed', t_elapsed);

      // Calculate how far through the desired time for one iteration.
      var t = t_elapsed / t_enemies.get('timelimit');
   }

        t_enemies.set('cx', Math.random() * 1000);
        t_enemies.set('cy', Math.random() * 1000);  

  }  

}

// Actually move the circles
  var t_enemies = svg.selectAll("circle");
  t_enemies
    .attr("transform", function(d) {return "translate(" + d.get('cx') + "," + d.get('cy') + ")";});

/*board.selectAll("circle").each(function(d){      
    var x = Math.pow(player.attr('cx') - d3.select(this).attr('cx'),2);
    var y = Math.pow(player.attr('cy') - d3.select(this).attr('cy'),2);
    var sum = x + y;
    var diffRadius = Math.pow(player.attr('r') - d3.select(this).attr('r'),2);
    var sumRadius = Math.pow(player.attr('r') + d3.select(this).attr('r'),2);
    console.log("player x: ", player.attr('cx'), "y: ", player.attr('cy'), "r: ", player.attr('r'));
    console.log("circle x: ", d3.select(this).attr('cx'), "y: ", d3.select(this).attr('cy'), "r: ", d3.select(this).attr('r'));
    //if(diffRadius <= sum && sum <= sumRadius){
    if(sum <= sumRadius){
      console.log("colission");
    }

  setInterval(function(){
    circles.transition()
    .attr("cx", function () {return Math.random() * 1000;}).duration(1500)
    .attr("cy", function () {return Math.random() * 1000;}).duration(1500)}, 1000);

    //(x2-x1)^2 + (y1-y2)^2 <= (r1+r2)^2
    //console.log(player.attr('cx'));
    //console.log(this);
    //console.log(d3.select(this).attr('cx'));


  /*
  * Two circles intersect if, and only if, the distance between their centers is 
  * between the sum and the difference of their radii. 
  * Given two circles (x0,y0,R0) and (x1,y1,R1), the formula is as follows:
  * (R0-R1)^2 <= (x0-x1)^2+(y0-y1)^2 <= (R0+R1)^2
  
  });*/




 /*  .each("end", repeat);

function repeat(){
    if(d3.select(this).attr("y")==0){
        d3.select(this).transition()
            .delay(pausing_delay)
            .duration(speed)
            .attr("y", 100)
            .each("end", repeat);
    }
    else{
        d3.select(this).transition()
            .attr("y", 0)
            .duration(speed)
            .each("end", repeat);
    }
}*/


  //.style("fill", "orange");
  /*circlesSel.enter().append("circle")
    .attr({
      "r": function (d) { return d.radius; },
      "cx": function (d) { return d.x; },
      "cy": function (d) { return d.y; }
    })
   .style("fill", "blue"); 

/*
var circles = board.selectAll("circle")
  .data(enemies)
  .enter()
  .append("circle");
  //.style("fill", "orange");

var circleAttributes = circles
  .attr("cx", function(){ return Math.random() * 1000;})
  .attr("cy", function(){return Math.random() * 1000;})
  .attr("r", circleRadius)
  .style("fill", "blue");



// Start animation.
  var startTime = new Date().getTime();
  d3.timer(step);

  function step() {
    var i, len, c, time;
    for (i = 0, len = count; i < len; i++) {
        c = circles[i];
        if (c.x >= maxX || c.x <= 0) c.vx *= -1;
        if (c.y >= maxY || c.y <= 0) c.vy *= -1;
        c.x += c.vx;
        c.y += c.vy;
    }
    circlesSel.attr({
        "cx": function (d) { return d.x; },
        "cy": function (d) { return d.y; }
    });
    if (steps < maxSteps) {
      steps++;
    } else {
      time = new Date().getTime() - startTime;
      updateResults(count, time, maxSteps);
      test();
      return true;
    }
  }
}







board.selectAll("circle").each(function(d){      
    var x = Math.pow(player.attr('cx') - d3.select(this).attr('cx'),2);
    var y = Math.pow(player.attr('cy') - d3.select(this).attr('cy'),2);
    var sum = x + y;
    var diffRadius = Math.pow(player.attr('r') - d3.select(this).attr('r'),2);
    var sumRadius = Math.pow(player.attr('r') + d3.select(this).attr('r'),2);
    console.log("player x: ", player.attr('cx'), "y: ", player.attr('cy'), "r: ", player.attr('r'));
    console.log("circle x: ", d3.select(this).attr('cx'), "y: ", d3.select(this).attr('cy'), "r: ", d3.select(this).attr('r'));
    //if(diffRadius <= sum && sum <= sumRadius){
    if(sum <= sumRadius){
      console.log("colission");
    }

  setInterval(function(){
    circles.transition()
    .attr("cx", function () {return Math.random() * 1000;}).duration(1500)
    .attr("cy", function () {return Math.random() * 1000;}).duration(1500)}, 1000);

    //(x2-x1)^2 + (y1-y2)^2 <= (r1+r2)^2
    //console.log(player.attr('cx'));
    //console.log(this);
    //console.log(d3.select(this).attr('cx'));


  /*
  * Two circles intersect if, and only if, the distance between their centers is 
  * between the sum and the difference of their radii. 
  * Given two circles (x0,y0,R0) and (x1,y1,R1), the formula is as follows:
  * (R0-R1)^2 <= (x0-x1)^2+(y0-y1)^2 <= (R0+R1)^2
----------------------  
  });




 /*  .each("end", repeat);

function repeat(){
    if(d3.select(this).attr("y")==0){
        d3.select(this).transition()
            .delay(pausing_delay)
            .duration(speed)
            .attr("y", 100)
            .each("end", repeat);
    }
    else{
        d3.select(this).transition()
            .attr("y", 0)
            .duration(speed)
            .each("end", repeat);
    }
}*/