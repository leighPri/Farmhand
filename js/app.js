/*

  Schema 

  %id%: {
    title: '',
    platform: '',
    goals: {
      %id%: { title: '', current: 0, needed: 0 }
    }
  }

*/

let gameHash = {};

let selectedGame = '';

let focusedGoal = '';

let goalToEdit = '';

let goalToDelete = '';

const editGoal = (e, id) => {
  e.stopPropagation();
  goalToEdit = id;
  showModal('editGoal');
};

const saveGoal = (game, goal) => {
  gameHash[game].goals[goal].title = document.getElementById('goal-form-title').value;
  let current = document.getElementById('goal-form-current');
  let needed = document.getElementById('goal-form-needed');

  if (!current.value) current.value = 0;
  if (Number.isNaN(parseInt(current.value, 10))) current.value = null;
  if (Number.isNaN(parseInt(needed.value, 10))) needed.value = null;

  if (!current.value || !needed.value) {
    console.error('show user an error for bad inputs');
    return;
  }

  gameHash[game].goals[goal].current = current.value;
  gameHash[game].goals[goal].needed = needed.value;

  saveAll(gameHash);
  renderGoals(gameHash[selectedGame].goals);
  hideModal();
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
  saveAll(gameHash);
};

const resetGames = () => {
  renderGames(gameHash);
};

const addGame = () => {
  let title = document.getElementById('game-form-title').value;
  let platform = document.getElementById('game-form-platform').value;
  createGame(title, platform);
  saveAll(gameHash);
};

const addGoal = () => {
  let title = document.getElementById('goal-form-title').value;
  let current = document.getElementById('goal-form-current');
  let needed = document.getElementById('goal-form-needed');

  if (!current.value) current.value = 0;
  if (Number.isNaN(parseInt(current.value, 10))) current.value = null;
  if (Number.isNaN(parseInt(needed.value, 10))) needed.value = null;

  if (!current.value || !needed.value) {
    console.error('show user an error for bad inputs');
    return;
  }

  createGoal(selectedGame, title, parseInt(current.value, 10), parseInt(needed.value, 10));
  saveAll(gameHash);
};

const editGame = (e, id) => {
  e.stopPropagation();
  selectedGame = id;
  showModal('editGame');
};

const saveGame = (id) => {
  gameHash[id].title = document.getElementById('game-form-title').value;
  gameHash[id].platform = document.getElementById('game-form-platform').value;
  saveAll(gameHash);
  renderGames(gameHash);
  hideModal();
};

const deleteGame = (e, id) => {
  e.stopPropagation();
  selectedGame = id;
  showModal('deleteGame');
};

const loadPage = () => {
  let savedData = fetchAll();
  if (savedData) {
    gameHash = savedData;
    renderGames(gameHash);
  } else {
    renderTopBar('');
  }
};

document.addEventListener('keydown', (e) => {
  if (e.keyCode === 32 && focusedGoal.length) {
    changeAmount(e, !e.altKey, focusedGoal);
  } else if (e.keyCode === 27) {
    hideModal();
  }
});

loadPage();
