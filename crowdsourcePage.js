
$(document).ready(function(){

  var current_fs, next_fs, previous_fs;
  
  // No BACK button on first screen
  if($(".show").hasClass("first-screen")) {
  $(".prev").css({ 'display' : 'none' });
  }
  
  // Next button
  $(".next-button").click(function(){
  
  current_fs = $(this).parent().parent();
  next_fs = $(this).parent().parent().next();
  
  $(".prev").css({ 'display' : 'block' });
  
  $(current_fs).removeClass("show");
  $(next_fs).addClass("show");
  
  $("#progressbar li").eq($(".card2").index(next_fs)).addClass("active");
  
  current_fs.animate({}, {
  step: function() {
  
  current_fs.css({
  'display': 'none',
  'position': 'relative'
  });
  
  next_fs.css({
  'display': 'block'
  });
  }
  });
  });
  
  // Previous button
  $(".prev").click(function(){
  
  current_fs = $(".show");
  previous_fs = $(".show").prev();
  
  $(current_fs).removeClass("show");
  $(previous_fs).addClass("show");
  
  $(".prev").css({ 'display' : 'block' });
  
  if($(".show").hasClass("first-screen")) {
  $(".prev").css({ 'display' : 'none' });
  }
  
  $("#progressbar li").eq($(".card2").index(current_fs)).removeClass("active");
  
  current_fs.animate({}, {
  step: function() {
  
  current_fs.css({
  'display': 'none',
  'position': 'relative'
  });
  
  previous_fs.css({
  'display': 'block'
  });
  }
  });
  });
  
  });
// // function changeColor(){
// // 	let avail = document.getElementById("Availability").value;
// // 	let r, g, b;
// // 	if(avail > 50){
// // 		r = Math.floor(255 - ((avail-50)*2 *2.55));
// // 		g = 255
// // 		b = 100;
// // 	}
// // 	else
// // 	{
// // 		r = 255;
// // 		g = Math.floor((avail)*2.55*2);
// // 		b = 100;
// // 	}
	
 
// // 	document.getElementById("availContainer").style.background = "rgb("+r+","+g+","+b+")"; 
	
	
// // }
// // var a = document.getElementById("Availability");
// // a.addEventListener('input', changeColor);

const $element = $('input[type="range"]');
const $tooltip = $('#range-tooltip');
const sliderStates = [
  {name: "1", tooltip: "<h2><strong>Out of stock</strong></h2>", range: _.range(0, 10) },
  {name: "2", tooltip: "<h2><strong>A few left</strong></h2>", range: _.range(10, 20)},
  {name: "3", tooltip: "<h2><strong>A good amount available</strong></h2>", range: _.range(20, 30)},
  {name: "4", tooltip: "<h2><strong>Plenty available</strong></h2>", range: _.range(30, 40)},
  {name: "5", tooltip: "<h2><strong>Fully in stock</strong></h2>", range: _.range(40, 50)},
];
var currentState;
var $handle;

$element
  .rangeslider({
    polyfill: false,
    onInit: function() {
      $handle = $('.rangeslider__handle', this.$range);
      updateHandle($handle[0], this.value);
      updateState($handle[0], this.value);
    }
  })
  .on('input', function() {
    updateHandle($handle[0], this.value);
    checkState($handle[0], this.value);
  });

// Update the value inside the slider handle
function updateHandle(el, val) {
  el.textContent = "";
}

// Check if the slider state has changed
function checkState(el, val) {
  // if the value does not fall in the range of the current state, update that shit.
  if (!_.contains(currentState.range, parseInt(val))) {
    updateState(el, val);
  }
}

// Change the state of the slider
function updateState(el, val) {
  for (var j = 0; j < sliderStates.length; j++){
    if (_.contains(sliderStates[j].range, parseInt(val))) {
      currentState = sliderStates[j];
      // updateSlider();
    }
  }
  // If the state is high, update the handle count to read 50+
  if (currentState.name == "high") {
    updateHandle($handle[0], "50+");
  }
  // Update handle color
  $handle
    .removeClass (function (index, css) {
    return (css.match (/(^|\s)js-\S+/g) ||   []).join(' ');
  })
    .addClass("js-" + currentState.name);
  // Update tooltip
  $tooltip.html(currentState.tooltip);
}
