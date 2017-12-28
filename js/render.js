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
      <div class="modal-body form">
        <label for="game-form-title">Title</label>
        <input type="text" id="game-form-title"><br>
        <label for="game-form-platform">Platform</label>
        <input type="text" id="game-form-platform">
      </div>
      <div class="modal-button-container">
        <div class="modal-button farmhand-button cancel" onClick="hideModal()">Cancel</div>
        <div class="modal-button farmhand-button confirm" onClick="addGame()">Save</div>
      </div>
    `
  },
  goal: function() {
    return `
    <div class="modal-title">Add Goal</div>
    <div class="modal-body form">
      <label for="goal-form-title">Title</label>
      <input type="text" id="goal-form-title"><br>
      <label for="goal-form-current">Currently Have</label>
      <input type="number" id="goal-form-current"><br>
      <label for="goal-form-needed">Total Needed</label>
      <input type="number" id="goal-form-needed">
    </div>
    <div class="modal-button-container">
      <div class="modal-button farmhand-button cancel" onClick="hideModal()">Cancel</div>
      <div class="modal-button farmhand-button confirm" onClick="addGoal()">Save</div>
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
    let goalTitle = gameHash[selectedGame].goals[goalToDelete].title;
    return `
      <div class="modal-title">Delete ${goalTitle}?</div>
      <div class="modal-body">
        Are you sure you want to delete ${goalTitle}? This cannot be undone.
      </div>
      <div class="modal-button-container">
        <div class="modal-button farmhand-button cancel" onClick="hideModal()">Cancel</div>
        <div class="modal-button farmhand-button confirm" onClick="confirmDeleteGoal(event, '${selectedGame}', '${goalToDelete}')">Delete</div>
      </div>
    `;
  },
  editGame: function() {
    let game = gameHash[selectedGame];
    return `
    <div class="modal-title">Edit Goal</div>
    <div class="modal-body">
      We're editing ${gameHash[selectedGame].title}
    </div>
    `;
  },
  deleteGame: function() {
    return `
      <div class="modal-title">Delete ${gameHash[selectedGame].title}?</div>
      <div class="modal-body">
      This will also delete any goals associated with ${gameHash[selectedGame].title}. Are you sure you want to delete it?
      </div>
      <div class="modal-button-container">
        <div class="modal-button farmhand-button cancel" onClick="hideModal()">Cancel</div>
        <div class="modal-button farmhand-button confirm" onClick="confirmDeleteGame(event, '${selectedGame}')">Delete</div>
      </div>
    `;
  },
  dataNotice: function() {
    return `
      <div class="modal-title">Data Notice</div>
      <div class="modal-body">Farmhand currently uses localStorage to store your game data. Clearing your cache or otherwise wiping this storage will delete all game and goal data.</div>
    `;
  }
};

const createGameCard = (id, gameObj) => {
  const numGoals = Object.keys(gameObj.goals).length;
  const { title, platform } = gameObj;
  return `
    <div class="card game-card" id="${id}" onClick="selectGame('${id}')">
      <div class="card-title">${title}</div>
      <div class="card-edit-button card-button no-select farmhand-button" onClick="editGame(event, '${id}')">EDIT</div>
      <div class="game-body">
        <div class="game-platform">Platform: ${platform}</div>
        <div class="game-goals">Goals: ${numGoals}</div>
      </div>
      <div class="card-delete-button card-button no-select farmhand-button" onClick="deleteGame(event, '${id}')">DELETE</div>
    </div>
  `;
};

const createGoalCard = (id, goalObj) => {
  const { title, current, needed } = goalObj;
  return `
    <div class="card" id="${id}" onClick="focusGoal('${id}')">
      <div class="card-title">${title}</div>
      <div class="card-edit-button card-button no-select farmhand-button" onClick="editGoal(event, '${id}')">EDIT</div>
      <div class="goal-amount no-select">
        <div class="minus-button" onClick="changeAmount(event, false, '${id}')">-</div>
        <div class="amount-display">${current} / ${needed}</div>
        <div class="plus-button" onClick="changeAmount(event, true, '${id}')">+</div>
      </div>
      <div class="card-delete-button card-button no-select farmhand-button" onClick="deleteGoal(event, '${id}')">DELETE</div>
    </div>
  `;
};

const showModal = (modal) => {
  modalOverlay.style.display = 'block';
  modalContent.innerHTML = modals[modal]();
};

const hideModal = () => {
  modalOverlay.style.display = 'none';
  modalContent.innerHTML = '';
};

const createGame = (title, platform) => {
  let id = '_' + new Date().getTime();
  gameHash[id] = { title, platform, goals: {} };
  renderGames(gameHash);
  hideModal();
};

const confirmDeleteGame = (e, id) => {
  delete gameHash[id];
  renderGames(gameHash);
  hideModal();
  saveAll(gameHash);
};

const createGoal = (gameId, title, current, needed) => {
  let id = '_' + new Date().getTime();
  gameHash[gameId].goals[id] = { title, current, needed };
  renderGoals(gameHash[gameId].goals);
  hideModal();
};

const confirmDeleteGoal = (e, gameId, goalId) => {
  delete gameHash[gameId].goals[goalId];
  renderGoals(gameHash[gameId].goals);
  hideModal();
  saveAll(gameHash);
};

const renderGoals = (goalHash) => {
  let goalHtml = '';
  for (const id in goalHash) {
    goalHtml += createGoalCard(id, goalHash[id]);
  }
  if (!goalHtml.length) goalHtml = '<div class="empty-goals">No goals found, add some!</div>'
  renderTopBar(gameHash[selectedGame].title);
  cardContainer.innerHTML = goalHtml;
}

const renderTopBar = (gameTitle) => {
  let title = gameTitle.length ? gameTitle : 'My Games';
  let button = gameTitle.length ? 'Add Goal' : 'Add Game';
  let modalKey = gameTitle.length ? 'goal' : 'game';
  topBar.innerHTML = gameTitle.length ? '<div class="back-button" onClick="resetGames()">< Back to My Games</div>' : '';
  topBar.innerHTML += `
    <div class="page-title">${title}</div>
    <div class="add-button no-select farmhand-button" onClick="showModal('${modalKey}')">${button}</div>
  `;
};

const renderGames = (gameHash) => {
  let gameHtml = '';
  for (const id in gameHash) {
    gameHtml += createGameCard(id, gameHash[id]);
  }
  if (!gameHtml.length) gameHtml = '<div class="empty-goals">No games found, add some!</div>'
  renderTopBar('');
  cardContainer.innerHTML = gameHtml;
};
