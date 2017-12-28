const saveAll = (data) => {
  localStorage.setItem('gameData', JSON.stringify(data));
};

const fetchAll = () => {
  return JSON.parse(localStorage.getItem('gameData'));
};
