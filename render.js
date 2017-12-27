let goalContainer = document.getElementById('goal-container');

// creation funciton needs to generate a random key based on the title
let goalHash = {
  alsdjf4308fjsjdf: { title: 'First Goal', image: '', current: 0, needed: 100 },
  alsdjf4308fjsjddf: { title: 'Second Goal', image: '', current: 0, needed: 100 },
  alsdjf43018fjsjdf: { title: 'Third Goal', image: '', current: 0, needed: 100 },
  alsdjf4308dfjsjdf: { title: 'Fourth Goal', image: '', current: 0, needed: 100 },
  alsdjf4308wfjsjdf: { title: 'Fifth Goal', image: '', current: 0, needed: 100 },
  alsdjf4308dfjsjdf: { title: 'Sixth Goal', image: '', current: 0, needed: 100 }
};

const createUniqueKey = (objToCheck) => {
  let newKey = '_' + Math.random().toString(36).substr(2, 9);
  for (const obj in objToCheck) {
    if (newKey === obj) return createUniqueKey(objToCheck);
  }
  return newKey;
};

const createGoal = (title, image, current, needed) => {
  let id = '_' + new Date().getTime();
  console.log(id);
  goalHash[id] = { title, image, current, needed };
  console.log(goalHash);
  renderGoals(goalContainer);
};

const renderGoals = () => {
  let goalHtml = '';
  for (const id in goalHash) {
    goalHtml += createGoalCard(id, goalHash[id]);
  }
  goalContainer.innerHTML = goalHtml;
}

const createGoalCard = (id, goalObj) => {
  const { title, image, current, needed } = goalObj;
  return `
    <div class="goal-card" id="${id}">
      <div class="goal-title">${title}</div>
      <div class="goal-edit-button goal-button" onClick="editGoal('${id}')">EDIT</div>
      <div class="goal-amount">
        <div class="minus-button" onClick="changeAmount(event, false, '${id}')">-</div>
        <div class="current-amount">${current}</div> / 
        <div class="needed-amount">${needed}</div>
        <div class="plus-button" onClick="changeAmount(event, true, '${id}')">+</div>
      </div>
      <div class="goal-delete-button goal-button" onClick="deleteGoal('${id}')">DELETE</div>
    </div>
  `;
};

renderGoals();

// setTimeout(() => {
//   createGoal('Seventh Goal', '', 0, 100);
// }, 5000);
