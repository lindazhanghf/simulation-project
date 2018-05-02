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
    () => changeToState(state_week)
  );

  var state_week = new State("game",
    function () {
      timestep++
      console.log("New timestep: " + timestep)

      display_state(curr_state);
    },
    function () {
      normalize_params();

      curr_state++;
      if (curr_state >= 5) {
        changeToState(state_end_week);
        curr_state = 0;
      } else {
        display_state(curr_state);
      }
    },
    function () {
      normalize_params();
    }
  );

  var state_end_week = new State("end_week",
    function () {
      clear_all()
      update_params()
      let message = "";
      message += "You finished the first week with a " + grade + ". ";
      message += grade>=85?"Great job!" : (grade>=70? "Not bad!":"Work harder next time!");
      message += "<br/><br/>You parents were ";
      if (parent_satisfaction > 90)
        message += "very satisfied with you. They believed that you can achieve in anything you like.";
      else if (parent_satisfaction > 70)
        message += "satisfied with your performance. Now they are more willing to let you pursue your interests.";
      else
        message += "not happy about your performance. They are still restricting certain activities."

      message += "<br/><br/>";
      if (social_connection < 5)
        message += "You spent the whole time studying too hard and missing out on social life. Your well being is at risk!";
      else if (social_connection < 30)
        message += "You social connection remained low. This makes you a bit depressed and could hurt your performance in <i>Gaokao</i>.";
      else
        message += "You are enjoying your social life. Feeling optimistic about <i>Gaokao</i>!"

      draw_message(message);
      draw_continue_button();
    },
    function () {
      if (timestep < 3)
        changeToState(state_week);
      else
        changeToState(state_ending);
    },
    null
  );

  var state_ending = new State("ending",
  function() {
      clear_all();
      update_params();
      ClearByID("#week");
      draw("#week", "<b>Week of <i>Gaokao</i></b>");
      let message = "<h3></h3><br/><br/>";

      if (grade > 90)
        message += "You worked really hard and your score passed the <b>1st tier</b> in College Entrance Exam. So you get to attend your dream school.<br/><br/>";
      if (grade > 75)
        message += "Your grade has improved drastically and you ended up passing the <b>2nd tier</b> in College Entrance Exam. You are admitted to a good local college in your town."
      else
        message += "Your didn't pass the College Entrance Exam. So you signed up for a local technical college."
      message += "<br/><br/>";

      if (parent_satisfaction > 90)
        message += "Your parents are pround of you, and they will let you pursue your dream in university.";
      else if (parent_satisfaction > 70)
        message += "Your parents are quite satisfied at you, so they will let you pursue your dream in university.";
      else
        message += "Your parents are not satisfied by your performance and felt that you could be much better. You have no choice on what to major in college since they have already made the decision for you.";
      message += "<br/><br/>";

      if (social_connection < 5)
        message += "Since you hardly have any social connections, you feel socially awkward in college. You also had a hard time seperating from your parent and becoming independent.";
      else if (social_connection < 50)
        message += "Finally you move out of your parent's house to live in a dorm. You are glad that you finally have freedom over your social life and quickly made many friends in college.";
      else
        message += "You college life was a blast! You became one of the most popular students in your college and everyone loves to hang out with you. Your social skills allowed you to become the president of student council in your college."

      draw_message(message);
  });

  machine = new StateMachine(state_begin); // To start the StateMachine, just create a new state object and pass it the initial state, like so
  $("#bttn").click(function() {
    machine.update();
  });
});

function normalize_params() {
  grade = normalize(grade);
  parent_satisfaction = normalize(parent_satisfaction);
  social_connection = normalize(social_connection);
}

function normalize(param) {
  if (param < 0)
    return 0;
  else if (param > 100)
    return 100;
  return param;
}

function display_state(state_index) {
  clear_all()
  update_params()
  draw_message(game[state_index].scripts[0], curr_result)
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
param_list = ["#output", "#buttons", "#week", "#grade", "#parent", "#social"]
function clear_all() {
  param_list.forEach((id) => {
    return ClearByID(id);
  });
}

function update_params() {
  draw("#week", "<b>Week "+timestep+"</b>");
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

function draw_message(msg, result) {
  $("#output").append(
    "<p>" + (result?result:"") + msg + "</p>"
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
    output += `<img class="card-img-top image-flexible" src="`+option.image_path+`" alt="Morning Reading Photo" style="height: 12rem;">`;
  }
  output += `
      <div class="card-body">
        <p class="card-text">`+option.text+`</p>
        <button ` + (option.require&&(parent_satisfaction<option.require) ? `disabled`:``) + ` id="`+id+`" type="button" class="tool_tip btn btn-primary" onClick="select_option(this.id)">`+option.button_text;

  if (option.tooltip) {
    output += `<span class="tooltiptext">`;
    if (option.require && parent_satisfaction < option.require) {
      output += `<span style="color:red">Requires</span><br/>` + tooltip_icon("parent", 0) + "> " + option.require + "%";
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
  } else if (id == "grade")
    return_str += " ?";
  return return_str + "</b><br/>";
}

function draw_continue_button() {
  $("#buttons").append(`
        <div class="col-md-2">
            <button id="bttn" type="button" class="tool_tip btn btn-primary">Continue
            </button>
        </div>
    `);
  $("#bttn").click(function() {
    machine.update();
  });
}