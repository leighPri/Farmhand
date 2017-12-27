const editGoal = (id) => {
  console.log('you clicked edit on ' + id);
};

const deleteGoal = (id) => {
  console.log('you clicked delete on ' + id);
};

const changeAmount = (e, increase, id) => {
  let increment = 1;
  if (e.shiftKey) increment = 10;
  if (increase) goalHash[id].current += increment;
  else {
    goalHash[id].current -= increment;
    if (goalHash[id].current < 0) goalHash[id].current = 0;
  }
  renderGoals();
};
