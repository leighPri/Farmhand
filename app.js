const topBar = document.getElementById('top-bar');
const cardContainer = document.getElementById('card-container');
const modalOverlay = document.getElementById('modal-overlay');
const modalContent = document.getElementById('modal-content');

const modals = {
  help: function() {
    return `
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
  },
  game: function() {
    return `
      <div class="modal-title">Add Game</div>
      <div class="modal-body">
        Gonna add a game
      </div>
    `
  },
  goal: function() {
    return `
      <div class="modal-title">Add Goal</div>
      <div class="modal-body">
        Gonna add a goal
      </div>
    `
  },
  editGoal: function() {
    return `
    <div class="modal-title">Edit Goal</div>
    <div class="modal-body">
      We're editing ${gameHash[selectedGame].goals[goalToEdit].title}
    </div>
    `;
  },
  deleteGoal: function() {
    return `
      <div class="modal-title">Edit Goal</div>
      <div class="modal-body">
        We're deleting ${gameHash[selectedGame].goals[goalToDelete].title}
      </div>
    `;
  }
};

let gameHash = {
  oifiojasdfioje: {
    title: 'Breath of the Wild',
    platform: 'Wii U',
    goals: {
      alsdjf4308fjsjdf: { title: 'First Goal', current: 0, needed: 100 },
      alsdjf4308fjsjddf: { title: 'Second Goal', current: 0, needed: 100 },
      alsdjf43018fjsjdf: { title: 'Third Goal', current: 0, needed: 100 },
      alsdjf4308dsfjsjdf: { title: 'Fourth Goal', current: 0, needed: 100 },
      alsdjf4308wfjsjdf: { title: 'Fifth Goal', current: 0, needed: 100 },
      alsdjf4308dfjsjdf: { title: 'Sixth Goal', current: 0, needed: 100 }
    }
  },
  oifiojasdadsffioje: {
    title: 'Witcher 3',
    platform: 'PS4',
    goals: {
      asdfalsdjf4308fjsjdf: { title: 'First Goal', current: 0, needed: 100 },
      alsdjf4308fjsjddfdf: { title: 'Second Goal', current: 0, needed: 100 },
      alsdjf43018fjsewjdf: { title: 'Third Goal', current: 0, needed: 100 },
      alsdjf4308dsasfjsjdf: { title: 'Fourth Goal', current: 0, needed: 100 },
      alsdasdfjf4308fdwfjsjdf: { title: 'Fifth Goal', current: 0, needed: 100 },
      alsdjf43frw08dfjsjdf: { title: 'Sixth Goal', current: 0, needed: 100 }
    }
  }
};

let selectedGame = '';

let focusedGoal = '';

let goalToEdit;

let goalToDelete;

const editGoal = (e, id) => {
  e.stopPropagation();
  goalToEdit = id;
  showModal('editGoal');
};

const deleteGoal = (e, id) => {
  e.stopPropagation();
  goalToDelete = id;
  showModal('deleteGoal');
};

const selectGame = (id) => {
  selectedGame = id;
  renderGoals(gameHash[id].goals);
}

const focusGoal = (id) => {
  focusedGoal = id;
};

const changeAmount = (e, increase, id) => {
  let increment = 1;
  if (e.shiftKey) increment = 10;
  if (increase) gameHash[selectedGame].goals[id].current += increment;
  else {
    gameHash[selectedGame].goals[id].current -= increment;
    if (gameHash[selectedGame].goals[id].current < 0) gameHash[selectedGame].goals[id].current = 0;
  }
  renderGoals(gameHash[selectedGame].goals, cardContainer);
};

const resetGames = () => {
  renderGames(gameHash);
};

const editGame = (e, id) => {
  console.log('edit game ' + id);
};

const deleteGame = (e, id) => {
  console.log('delete game ' + id);
}

document.addEventListener('keydown', (e) => {
  if (e.keyCode === 32 && focusedGoal.length) {
    changeAmount(e, !e.altKey, focusedGoal);
  } else if (e.keyCode === 27) {
    hideModal();
  }
});

renderGames(gameHash);
