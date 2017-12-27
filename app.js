const goalContainer = document.getElementById('goal-container');
const modalOverlay = document.getElementById('modal-overlay');
const modalContent = document.getElementById('modal-content');

const modals = {
  help: `
    <div class="modal-title">Controls</div>
    <div class="modal-body">
      <ul>
        <li>Click buttons to increment</li>
        <li>Click anywhere on goal to focus</li>
        <li>Space bar increases focused goal</li>
        <li>Alt/option + space decreases focused goal</li>
        <li>Hold shift to increment by 10</li>
      </ul>
    </div>
  `
};

let goalHash = {
  alsdjf4308fjsjdf: { title: 'First Goal', image: '', current: 0, needed: 100 },
  alsdjf4308fjsjddf: { title: 'Second Goal', image: '', current: 0, needed: 100 },
  alsdjf43018fjsjdf: { title: 'Third Goal', image: '', current: 0, needed: 100 },
  alsdjf4308dsfjsjdf: { title: 'Fourth Goal', image: '', current: 0, needed: 100 },
  alsdjf4308wfjsjdf: { title: 'Fifth Goal', image: '', current: 0, needed: 100 },
  alsdjf4308dfjsjdf: { title: 'Sixth Goal', image: '', current: 0, needed: 100 }
};

let focusedGoal = '';

let goalToEdit = '';

let goalToDelete = '';

const editGoal = (e, id) => {
  e.stopPropagation();
  goalToEdit = id;
  console.log('you clicked edit on ' + id);
};

const deleteGoal = (e, id) => {
  e.stopPropagation();
  goalToDelete = id;
  console.log('you clicked delete on ' + id);
};

const focusGoal = (id) => {
  focusedGoal = id;
};

const changeAmount = (e, increase, id) => {
  let increment = 1;
  if (e.shiftKey) increment = 10;
  if (increase) goalHash[id].current += increment;
  else {
    goalHash[id].current -= increment;
    if (goalHash[id].current < 0) goalHash[id].current = 0;
  }
  renderGoals(goalHash, goalContainer);
};

document.addEventListener('keydown', (e) => {
  if (e.keyCode === 32 && focusedGoal.length) {
    changeAmount(e, !e.altKey, focusedGoal);
  } else if (e.keyCode === 27) {
    hideModal();
  }
});

renderGoals(goalHash);
