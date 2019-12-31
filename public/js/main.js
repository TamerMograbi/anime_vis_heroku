
$("#json-btn").click(function(){
     $.get("data", function(data) {
        alert(JSON.stringify(data));
    });   
})

// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 45, left: 65},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var init_min = 1;
var init_max = 200;
var current_min = init_min;
var current_max = init_max;
var movieChecked = true;
var tvChecked = true;
// set the ranges
var x = d3.scaleLinear()
          .range([0, width]);
var y = d3.scaleLinear()
          .range([height, 0]);
          
var x_axis = d3.axisBottom()
			.scale(x);
var y_axis = d3.axisLeft()
            .scale(y);
            
var tooltip = d3.select("body").append("div").attr("class", "toolTip");
          
// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

//init x axis
function initAxis() {
      // add the x Axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(x_axis);
   // text label for the x axis
  svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("Rank");


  // add the y Axis
  svg.append("g")
      .attr("class", "y axis")
      .call(y_axis);
      
  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left )
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Number Of Views"); 
}

//draws the bar
function draw(data) {
     // Scale the range of the data in the domains
  //x.domain(data.map(function(d) { return d.rank; }));
   max_x = d3.max(data, function(d) { return parseInt(d.rank); })
   min_x = d3.min(data, function(d) { return parseInt(d.rank); })
    //x_axis.tickValues(getTickValues(min,max));
    x.domain([min_x,max_x]);
  max_y = d3.max(data, function(d) { return parseInt(d.numberofviews); })
  y.domain([0, max_y]);

  // append the rectangles for the bar chart
  var mysvg = svg.selectAll(".bar")
      .data(data);
      
  mysvg.exit()
  .remove();
      
  mysvg.enter().append("circle")
      .attr("class", "bar")
      .merge(mysvg)
      .on("mousemove", function(d){
            tooltip
              .style("left", d3.event.pageX - 50 + "px")
              .style("top", d3.event.pageY - 70 + "px")
              .style("display", "inline-block")
              .html((d.title));
        })
       .on("mouseout", function(d){ tooltip.style("display", "none");})
       .transition()
      .duration(750)
      .attr("cx", function(d) { return x(d.rank); })
      //.attr("width", x.bandwidth())
      .attr("cy", function(d) { return y(d.numberofviews); })
      .attr("r", 8)
      .attr("stroke", function(d) { return d.episodes == 1 ? "red" : "blue"; })
      .attr("stroke-width",3)
      .attr("fill","white")
      .attr("fill-opacity", 0)
      .attr("stroke-opacity",0.4)
       //stroke="black" stroke-width="3" fill="white"
      //.attr("height", function(d) { return height - y(d.numberofviews); })
      
      
      ;

}
// get the data
$.get("data",{min_pop:init_min,max_pop:init_max,movie_checked:movieChecked,tv_checked:tvChecked}, function(data) {

  // format the data
  //data.forEach(function(d) {
  //  d.sales = +d.sales;
  //});
  draw(data);
  initAxis();
 

});

var behaviourSlider = document.getElementById('slider');

$('#slider').css({"width":width, "margin-left":margin.left, "margin-right":margin.right, "margin-top":-105})
noUiSlider.create(behaviourSlider, {
    start: [init_min, init_max],
    step: 1,
    limit: 750,
    behaviour: 'drag',
    connect: true,
    tooltips: [true,true],
    range: {
        'min': 1,
        'max': 3000
    },
    pips: {
        mode: 'range',
        density: 3
    }
});

function updateAxis(data,min,max){
    max_x = d3.max(data, function(d) { return parseInt(d.rank); })
    min_x = d3.min(data, function(d) { return parseInt(d.rank); })
    x.domain([min_x,max_x]);
    svg.select(".x")
        .transition()
        .duration(750)
        .call(x_axis);
    max_y = d3.max(data, function(d) { return parseInt(d.numberofviews); })
    y.domain([0, max_y]);
    svg.select(".y")
        .transition()
        .duration(750)
        .call(y_axis)
}


function updateQuery(values, handle, unencoded, tap, positions) {
    // values: Current slider values (array);
    // handle: Handle that caused the event (number);
    // unencoded: Slider values without formatting (array);
    // tap: Event was caused by the user tapping the slider (boolean);
    // positions: Left offset of the handles (array);
    $.get("data", {min_pop:values[0],max_pop:values[1],movie_checked:movieChecked,tv_checked:tvChecked} ,function(data) {
        draw(data);
        current_min = parseInt(values[0]);
        current_max = parseInt(values[1]);
        updateAxis(data,current_min,current_max);
    });
}

// Binding signature
slider.noUiSlider.on('end', updateQuery);

function updateDataOnToggle(){
    $.get("data", {min_pop:current_min,max_pop:current_max,movie_checked:movieChecked,tv_checked:tvChecked} ,function(data) {
        draw(data);
        updateAxis(data,current_min,current_min)
    });
}

function movieClick(cb){
    console.log("movie clicked, val = ",cb.checked);
    movieChecked = cb.checked;
    updateDataOnToggle();
}
function tvClick(cb){
    console.log("tv clicked, val = ",cb.checked);
    tvChecked = cb.checked;
    updateDataOnToggle();
}

