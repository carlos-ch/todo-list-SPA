/* Todo app javascript */
import 'normalize.css';
import {
  getFromLocalStorage,
  setToLocalStorage,
  manageLocalStorage,
  deleteFromLocalStorage,
} from './localStorage';

const form = document.getElementById('form');
const input = document.getElementById('form__input');
const tasksWrapper = document.getElementById('tasks-wrapper');

function createCard(text, key) {
  if (!text) {
    return;
  }
  const card = document.createElement('article');
  card.setAttribute('class', 'task-card');
  card.innerHTML = `<button class="task__btn--remove hide">Discard</button>
  <p class="task-description">${text}</p>`;
  if (key === 'done') {
    card.firstElementChild.classList.remove('hide');
    card.classList.add(key);
  }
  tasksWrapper.prepend(card);
}

function allCardsStored(key) {
  const todosStored = getFromLocalStorage(key);
  for (let i = 0; i < todosStored.length; i += 1) {
    createCard(todosStored[i], key);
  }
}

function toggleElement(el, attribute) {
  if (el.classList.contains(attribute)) {
    el.classList.remove(attribute);
  } else {
    el.classList.add(attribute);
  }
}

function toggleFeedback() {
  if (tasksWrapper.childElementCount === 0) {
    document.getElementById('feedback').classList.remove('hide');
  } else {
    document.getElementById('feedback').classList.add('hide');
  }
}

function onStart() {
  tasksWrapper.innerHTML = '';
  allCardsStored('done');
  allCardsStored('pending');
  toggleFeedback();
}

function submitHandler() {
  const todo = input.value;
  setToLocalStorage('pending', todo, 'add');
  input.value = '';
  createCard(todo);
}

function discardTodo(e) {
  e.target.parentNode.remove();
  toggleFeedback();
}

onStart();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  submitHandler();
  toggleFeedback();
});

tasksWrapper.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    discardTodo(e);
    deleteFromLocalStorage(e.target.parentNode.lastElementChild.textContent);
  } else if (e.target.tagName === 'ARTICLE') {
    manageLocalStorage(e.target);
    toggleElement(e.target, 'done');
    toggleElement(e.target.firstElementChild, 'hide');
  } else if (e.target.tagName === 'P') {
    manageLocalStorage(e.target.parentNode);
    toggleElement(e.target.parentNode, 'done');
    toggleElement(e.target.parentNode.firstElementChild, 'hide');
  }
});
