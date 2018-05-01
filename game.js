// Simulation Variables
var machine = null;
var timestep = 0;
var grade = 50;
var parent_satisfaction = 0;
var social_connection = 0;

$(document).ready(function() {
  // Config
  var selected_id = NaN;
  var curr_state = 0;
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

      display_state(curr_state);
    },
    function () {
      curr_state++;
      display_state(curr_state);
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

function display_state(state_index) {
  clear_all()
  update_params()
  draw_message(game[state_index].scripts[timestep-1])
  game[state_index].options.forEach((opt)=>{
    console.log("option: "+opt.button_text)
    draw_option(opt);
  })
}

function select_option(id) {
  console.log("Selected "+id);
  selected_id = id;
  machine.update();
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
        <button id="`+option.id+`" type="button" class="tool_tip btn btn-primary" onClick="select_option(this.id)">`+option.button_text;

  if (option.tooltip) {
    output += `<span class="tooltiptext">`;
    Object.keys(option.tooltip).forEach((key) => {
      output += tooltip_icon(key, option.tooltip[key]);
    })

    output += `</span>`;
  }

  output += `</button>
      </div>
    </div>`;


  $("#buttons").append(output);
}

function tooltip_icon(id, value) {
  let return_str = `<img src="assets/icons/`+id+`.png" width="35" height="35" class="d-inline-block align-top">`;
  if (value > 0) {
    for (var i = 0; i < value; i++) {
      return_str += "+";
    }
  } else {
    for (var i = 0; i > value; i--) {
      return_str += "-";
    }
  }
  return return_str + "<br/>";
}