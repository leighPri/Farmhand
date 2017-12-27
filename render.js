const showModal = (modal) => {
  modalOverlay.style.display = 'block';
  modalContent.innerHTML = modals[modal]();
};

const hideModal = () => {
  modalOverlay.style.display = 'none';
  modalContent.innerHTML = '';
};

const createUniqueKey = (objToCheck) => {
  let newKey = '_' + Math.random().toString(36).substr(2, 9);
  for (const obj in objToCheck) {
    if (newKey === obj) return createUniqueKey(objToCheck);
  }
  return newKey;
};

const createGoal = (gameId, title, current, needed) => {
  let id = '_' + new Date().getTime();
  gameHash[gameId].goals[id] = { title, current, needed };
  renderGoals(gameHash[gameId].goals);
};

const renderGoals = (goalHash) => {
  let goalHtml = '';
  for (const id in goalHash) {
    goalHtml += createGoalCard(id, goalHash[id]);
  }
  renderTopBar(gameHash[selectedGame].title);
  cardContainer.innerHTML = goalHtml;
}

const createGoalCard = (id, goalObj) => {
  const { title, current, needed } = goalObj;
  return `
    <div class="card" id="${id}" onClick="focusGoal('${id}')">
      <div class="card-title">${title}</div>
      <div class="card-edit-button card-button no-select farmhand-button" onClick="editGoal(event, '${id}')">EDIT</div>
      <div class="goal-amount no-select">
        <div class="minus-button" onClick="changeAmount(event, false, '${id}')">-</div>
        <div class="current-amount">${current}</div> / 
        <div class="needed-amount">${needed}</div>
        <div class="plus-button" onClick="changeAmount(event, true, '${id}')">+</div>
      </div>
      <div class="card-delete-button card-button no-select farmhand-button" onClick="deleteGoal(event, '${id}')">DELETE</div>
    </div>
  `;
};

const renderTopBar = (gameTitle) => {
  let title = gameTitle.length ? gameTitle : 'My Games';
  let button = gameTitle.length ? 'Add Goal' : 'Add Game';
  let modalKey = gameTitle.length ? 'goal' : 'game';
  topBar.innerHTML = gameTitle.length ? '<div class="back-button" onClick="resetGames()">< Back to My Games</div>' : '';
  topBar.innerHTML += `
    <div class="page-title">${title}</div>
    <div class="add-button no-select farmhand-button" onClick="showModal('${modalKey}')">${button}</div>
  `;
}

const renderGames = (gameHash) => {
  let gameHtml = '';
  for (const id in gameHash) {
    gameHtml += createGameCard(id, gameHash[id]);
  }
  renderTopBar('');
  cardContainer.innerHTML = gameHtml;
};

const createGameCard = (id, gameObj) => {
  const numGoals = Object.keys(gameObj).length;
  const { title, platform } = gameObj;
  return `
    <div class="card" id="${id}" onClick="selectGame('${id}')">
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

