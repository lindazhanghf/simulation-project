'use strict';

class StateMachine {
  constructor (initState) {
    this.timeStep = 0;
    this.currentState = initState;
    this.nextState;

    //this.update = this.update.bind(this);
    //this.change = this.change.bind(this);
    //this.transition = this.transitions.bind(this);

    this.currentState.enter();
  }
  update() {
    this.timeStep++;
    this.currentState.update(function() {
      this.transition();
    }.bind(this));
  };
  change(state) {
    this.nextState = state;
  };
  transition() {
    if (this.nextState !== undefined) {
      this.currentState.exit();
      this.currentState = this.nextState;
      this.nextState = undefined;
      this.currentState.enter();
    }
  }
}
class State {
  constructor (name,enterCB,updateCB,exitCB) {
    this.name = name;
    this.enterCB = enterCB === undefined ? null : enterCB;
    this.updateCB = updateCB === undefined ? null : updateCB;
    this.exitCB = exitCB === undefined ? null : exitCB;
  }
  // Happens once when state is entered
  enter() {
    console.log("- " + this.name + " Enter");
    if (this.enterCB !== null) this.enterCB();
  };
  update(completed) {
    console.log("- " + this.name + " Update");
    if (this.updateCB !== null) this.updateCB();
    completed();
  };
  exit(completed) {
    console.log("- " + this.name + " Exit");
    if (this.exitCB !== null) this.exitCB();
  };
}