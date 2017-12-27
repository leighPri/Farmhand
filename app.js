let gameHash = {
  oifiojasdfioje: {
    title: 'Breath of the Wild',
    platform: 'Wii U',
    goals: {
      alsdjf4308fjsjdf: { title: 'First Goal', current: 0, needed: 100 },
      alsdjf4308fjsjddf: { title: 'Second Goal', current: 0, needed: 100 },
      alsdjf43018fjsjdf: { title: 'Third Goal', current: 0, needed: 100 },
      alsdjf4308dsfjsjdf: { title: 'Fourth Goal', current: 0, needed: 100 },
      alsdjf4308fafdjsjdf: { title: 'First Goal', current: 0, needed: 100 },
      alsdjf4308f3fsdjsjddf: { title: 'Second Goal', current: 0, needed: 100 },
      alsdjf43012f8fjsjdf: { title: 'Third Goal', current: 0, needed: 100 },
      alsdjf43ef08dsfjsjdf: { title: 'Fourth Goal', current: 0, needed: 100 },
      alsdjf430adsf8fjsjdf: { title: 'First Goal', current: 0, needed: 100 },
      alsdjf43fd08fjsjddf: { title: 'Second Goal', current: 0, needed: 100 },
      alsdjf43sdf018fjsjdf: { title: 'Third Goal', current: 0, needed: 100 },
      alsdjfasdf4308dsfjsjdf: { title: 'Fourth Goal', current: 0, needed: 100 },
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

let goalToEdit = '';

let goalToDelete = '';

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
};

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
  renderGoals(gameHash[selectedGame].goals);
};

const resetGames = () => {
  renderGames(gameHash);
};

const addGame = () => {
  let title = document.getElementById('game-form-title').value;
  let platform = document.getElementById('game-form-platform').value;
  createGame(title, platform);
};

const addGoal = () => {
  let title = document.getElementById('goal-form-title').value;
  let current = document.getElementById('goal-form-current').value;
  let needed = document.getElementById('goal-form-needed').value;
  createGoal(selectedGame, title, current, needed);
};

const editGame = (e, id) => {
  e.stopPropagation();
  selectedGame = id;
  showModal('editGame');
};

const deleteGame = (e, id) => {
  e.stopPropagation();
  selectedGame = id;
  showModal('deleteGame');
}

document.addEventListener('keydown', (e) => {
  if (e.keyCode === 32 && focusedGoal.length) {
    changeAmount(e, !e.altKey, focusedGoal);
  } else if (e.keyCode === 27) {
    hideModal();
  }
});

renderGames(gameHash);
