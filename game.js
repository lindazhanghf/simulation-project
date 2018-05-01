// Simulation Variables
var machine = null;
var timestep = 0;
var grade = 50;
var parent_satisfaction = 0;
var social_connection = 0;

var breakfast = {
  "scripts" : [`It's a new day! You are stressed out from homework yesterday night. <br/><br/>What should you do?`],
  "options" : [
    {
      "id":"opt_early",
      "text":"Participate in the Morning Reading",
      "image_path":"assets/morning_reading.jpg",
      "button_text":"Go to school early"
    },
    {
      "id":"opt_late",
      "text":"Skip the Morning Reading",
      "image_path":"assets/sleep.jpg",
      "button_text":"Sleep for longer"
    }
  ]
}

$(document).ready(function() {
  // Config
  var selected_id = NaN;
  var changeToState = function (state) {
    machine.change(state);
  }

  var state_begin = new State("Begin",
    null,
    () => changeToState(state_breakfast)
  );

  var state_breakfast = new State("game",
    function () {
      timestep++
      console.log("New timestep: " + timestep)
      clear_all()
      update_params()
      draw_message(breakfast.scripts[0])
      breakfast.options.forEach((opt)=>{
        console.log("option: "+opt.button_text)
        draw_option(opt);
      })
    },
    function () {
      // changeToState(state_school)
    },
    null
  );

  var state_ending = new State("Ending");



  machine = new StateMachine(state_begin); // To start the StateMachine, just create a new state object and pass it the initial state, like so
  $("#bttn").click(function() {
    machine.update();
  });
});

function select_option(id) {
  console.log("Selected "+id);
  selected_id = id;
  machine.update();
}

function display_state(id) {
  clear_all()
  update_params()
  draw_message(game[id].scripts[timestep-1])
  game[id].options.forEach((opt)=>{
    console.log("option: "+opt.button_text)
    draw_option(opt);
  })
}

// Draw /////////////
///////////////////////////////////////////////
param_list = ["#output", "#buttons", "#grade", "#parent", "#social"]
function clear_all() {
  // ClearByID("#output");
  param_list.forEach((id) => {
    return ClearByID(id);
  });
}

function update_params() {
  // param_list.forEach(function(id) {
  //   return ClearByID(id);
  // })
  draw("#grade", grade);
  draw_progress("#parent", parent_satisfaction);
  draw_progress("#social", social_connection);
}

function ClearByID(id) {
  $(id).html($([]));
}

function draw(id, input) {
  $(id).append(input);
}

function draw_message(msg) {
  $("#output").append(
    "<p>" + msg + "</p>"
  );
}

function draw_progress(id, value) {
  $(id).append(
    '<div class="progress-bar bg-info" role="progressbar" style="width: '+value+'%" aria-valuenow="'+value+'" aria-valuemin="0" aria-valuemax="100"></div>'
  );
}

function draw_option(option) {
  var output = `<div class="card text-center" style="height: 20rem;">`
  if (option.image_path) {
    output += `<img class="card-img-top" src="`+option.image_path+`" alt="Morning Reading Photo" style="height: 12rem;">`;
  }
  output += `
      <div class="card-body">
        <p class="card-text">`+option.text+`</p>
        <button id="`+option.id+`" type="button" class="btn btn-primary" onClick="select_option(this.id)">`+option.button_text+`</button>
      </div>
    </div>`;


  $("#buttons").append(output);
}