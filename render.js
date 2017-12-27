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

const createGoal = (goalHash, title, image, current, needed) => {
  let id = '_' + new Date().getTime();
  console.log(id);
  goalHash[id] = { title, image, current, needed };
  console.log(goalHash);
  renderGoals(goalHash);
};

const renderGoals = (goalHash) => {
  let goalHtml = '';
  for (const id in goalHash) {
    goalHtml += createGoalCard(id, goalHash[id]);
  }
  cardContainer.innerHTML = goalHtml;
}

const createGoalCard = (id, goalObj) => {
  const { title, image, current, needed } = goalObj;
  return `
    <div class="goal-card" id="${id}" onClick="focusGoal('${id}')">
      <div class="goal-title">${title}</div>
      <div class="goal-edit-button goal-button no-select farmhand-button" onClick="editGoal(event, '${id}')">EDIT</div>
      <div class="goal-amount no-select">
        <div class="minus-button" onClick="changeAmount(event, false, '${id}')">-</div>
        <div class="current-amount">${current}</div> / 
        <div class="needed-amount">${needed}</div>
        <div class="plus-button" onClick="changeAmount(event, true, '${id}')">+</div>
      </div>
      <div class="goal-delete-button goal-button no-select farmhand-button" onClick="deleteGoal(event, '${id}')">DELETE</div>
    </div>
  `;
};

const renderTopBar = (gameTitle) => {
  let title = gameTitle ? gameTitle : 'My Games';
  let button = gameTitle ? 'Add Goal' : 'Add Game';
  let modalKey = gameTitle ? 'goal' : 'game';
  topBar.innerHTML = `
    <div class="page-title">${title}</div>
    <div class="add-button no-select farmhand-button" onClick="showModal('${modalKey}')">${button}</div>
  `;
}

const renderGames = (gameHash) => {

};

const createGameCard = (id, gameObj) => {

};

