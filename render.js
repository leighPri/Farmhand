const showModal = (modal) => {
  modalOverlay.style.display = 'block';
  modalContent.innerHTML = modals[modal];
};

const hideModal = () => {
  modalOverlay.style.display = 'none';
  modalContent.innerHTML = '';
}

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
  goalContainer.innerHTML = goalHtml;
}

const createGoalCard = (id, goalObj) => {
  const { title, image, current, needed } = goalObj;
  return `
    <div class="goal-card" id="${id}" onClick="focusGoal('${id}')">
      <div class="goal-title">${title}</div>
      <div class="goal-edit-button goal-button" onClick="editGoal(event, '${id}')">EDIT</div>
      <div class="goal-amount">
        <div class="minus-button" onClick="changeAmount(event, false, '${id}')">-</div>
        <div class="current-amount">${current}</div> / 
        <div class="needed-amount">${needed}</div>
        <div class="plus-button" onClick="changeAmount(event, true, '${id}')">+</div>
      </div>
      <div class="goal-delete-button goal-button" onClick="deleteGoal(event, '${id}')">DELETE</div>
    </div>
  `;
};

