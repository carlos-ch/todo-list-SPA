function getFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function setToLocalStorage(key, value, action) {
  const inLocalStorage = getFromLocalStorage(key);
  if (value && action === 'add') {
    inLocalStorage.push(value);
  } else if (value && action === 'remove') {
    inLocalStorage.splice(inLocalStorage.indexOf(value), 1);
  }
  localStorage.setItem(key, JSON.stringify(inLocalStorage));
}

function manageLocalStorage(element) {
  const taskText = element.lastElementChild.textContent;
  if (element.classList.contains('done')) {
    setToLocalStorage('done', taskText, 'remove');
    setToLocalStorage('pending', taskText, 'add');
  } else {
    setToLocalStorage('pending', taskText, 'remove');
    setToLocalStorage('done', taskText, 'add');
  }
}

function deleteFromLocalStorage(string) {
  const tasks = getFromLocalStorage('done');
  tasks.splice(tasks.indexOf(string), 1);
  localStorage.setItem('done', JSON.stringify(tasks));
}

export {
  getFromLocalStorage, setToLocalStorage, manageLocalStorage, deleteFromLocalStorage,
};
