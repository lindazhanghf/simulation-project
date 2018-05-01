// Simulation Variables
var machine = null;
var curr_state = 0;
var timestep = 0;
var grade = 50;
var parent_satisfaction = 10;
var social_connection = 0;

var curr_result = "";

$(document).ready(function() {
  // Config
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
  Object.keys(game[state_index].options).forEach((key)=>{
    draw_option(key, game[state_index].options[key]);
  })
}

function select_option(id) {
  console.log("Selected "+id);
  curr_result = "";
  let affects = game[curr_state].options[id].affect;
  Object.keys(affects).forEach((key) => {
    if (key == "grade")
      grade += affects[key];
    else if (key == "parent")
      parent_satisfaction += affects[key];
    else if (key == "social")
      social_connection += affects[key];
    console.log(key + " => " + affects[key]);
  });
  if (game[curr_state].options[id].result)
    curr_result = game[curr_state].options[id].result;
  machine.update();
}

// Draw /////////////
///////////////////////////////////////////////
param_list = ["#output", "#buttons", "#grade", "#parent", "#social"]
function clear_all() {
  param_list.forEach((id) => {
    return ClearByID(id);
  });
}

function update_params() {
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
    "<p>" + curr_result + msg + "</p>"
  );
}

function draw_progress(id, value) {
  $(id).append(
    '<div class="progress-bar bg-info" role="progressbar" style="width: '+value+'%" aria-valuenow="'+value+'" aria-valuemin="0" aria-valuemax="100"></div>'
  );
}

function draw_option(id, option) {
  console.log("Draw option: "+option.button_text);
  var output = `<div class="card text-center" style="height: 20rem;">`
  if (option.image_path) {
    output += `<img class="card-img-top" src="`+option.image_path+`" alt="Morning Reading Photo" style="height: 12rem;">`;
  }
  output += `
      <div class="card-body">
        <p class="card-text">`+option.text+`</p>
        <button ` + (option.require&&(parent_satisfaction<option.require) ? `disabled`:``) + ` id="`+id+`" type="button" class="tool_tip btn btn-primary" onClick="select_option(this.id)">`+option.button_text;

  if (option.tooltip) {
    output += `<span class="tooltiptext">`;
    if (option.require && parent_satisfaction < option.require) {
      output += `<div style="color:red">Requires</div>` + tooltip_icon("parent", 0) + " > " + option.require + "%";
    } else {
      Object.keys(option.tooltip).forEach((key) => {
        output += tooltip_icon(key, option.tooltip[key]);
      })
    }
    output += `</span>`;
  }
  output += `</button>
      </div>
    </div>`;

  $("#buttons").append(output);
}

function tooltip_icon(id, value) {
  let return_str = `<img src="assets/icons/`+id+`.png" width="35" height="35" class="d-inline-block align-top"><b>`;
  if (value > 0) {
    for (var i = 0; i < value; i++) {
      return_str += " +";
    }
  } else if (value < 0) {
    for (var i = 0; i > value; i--) {
      return_str += " -";
    }
  }
  return return_str + "</b><br/>";
}