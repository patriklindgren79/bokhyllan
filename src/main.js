import './style.css';
import books, { toggleRead, addBook } from './books.js';
import { renderBooks } from './render.js';

const bookList = document.querySelector('#book-list');

bookList.addEventListener('click', function (event) {
  if (event.target.classList.contains('toggle-read-btn')) {
    const bookElement = event.target.closest('.book');
    const bookId = books.find(function (book) {
      return book.title === bookElement.querySelector('.book-title').textContent;
    }).id;

    toggleRead(bookId);
    renderBooks(books, bookList);
    updateReadStatus();
  }
});


const timer = document.querySelector('#timer');

let seconds = 0;

setInterval(function () {
  seconds++;

  if (seconds <= 59) {
    timer.textContent = `Tid inne: ${seconds} sekunder`;
  } else {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    timer.textContent = `Tid inne: ${minutes}m ${remainingSeconds}s`;
  }
}, 1000);


const titleInput = document.querySelector('#title-input');
const authorInput = document.querySelector('#author-input');
const genreInput = document.querySelector('#genre-input');
const pagesInput = document.querySelector('#pages-input');

const addBookButton = document.querySelector('#add-book-btn');
const messageArea = document.querySelector('#message-area');


const titleError = document.querySelector('#title-error');
const authorError = document.querySelector('#author-error');
const genreError = document.querySelector('#genre-error');
const pagesError = document.querySelector('#pages-error');

const statusMsg = document.querySelector('#status-msg');


function validateForm() {
  let isValid = true;

  if (titleInput.value.trim() === '') {
    titleError.style.display = 'block';
    titleInput.classList.add('invalid');
    isValid = false;
  } else {
    titleError.style.display = 'none';
    titleInput.classList.remove('invalid');
  }

  if (authorInput.value.trim() === '') {
    authorError.style.display = 'block';
    authorInput.classList.add('invalid');
    isValid = false;
  } else {
    authorError.style.display = 'none';
    authorInput.classList.remove('invalid');
  }

  if (genreInput.value.trim().length < 2) {
    genreError.style.display = 'block';
    genreInput.classList.add('invalid');
    isValid = false;
  } else {
    genreError.style.display = 'none';
    genreInput.classList.remove('invalid');
  }

  if (
    pagesInput.value.trim() === '' ||
    isNaN(pagesInput.value) ||
    Number.parseInt(pagesInput.value, 10) <= 0
  ) {
    pagesError.style.display = 'block';
    pagesInput.classList.add('invalid');
    isValid = false;
  } else {
    pagesError.style.display = 'none';
    pagesInput.classList.remove('invalid');
  }

  return isValid;
}


function updateReadStatus() {
  const readBooks = books.filter(function (book) {
    return book.read;
  });

  statusMsg.textContent =
    `Inlästa böcker: ${readBooks.length} av ${books.length}`;
}

renderBooks(books, bookList);
updateReadStatus();


addBookButton.addEventListener('click', function () {
  const isValid = validateForm();

  if (!isValid) {
    messageArea.textContent = 'Formuläret innehåller fel.';
    messageArea.classList.remove('success');
    messageArea.classList.add('error');
    return;
  }

  addBook({
    title: titleInput.value.trim(),
    author: authorInput.value.trim(),
    genre: genreInput.value.trim(),
    pages: Number.parseInt(pagesInput.value, 10),
    read: false
  });

  renderBooks(books, bookList);
  updateReadStatus();

  titleInput.value = '';
  authorInput.value = '';
  genreInput.value = '';
  pagesInput.value = '';

  messageArea.textContent = 'Boken har lagts till!';
  messageArea.classList.remove('error');
  messageArea.classList.add('success');

  setTimeout(function () {
  messageArea.textContent = '';
  messageArea.classList.remove('success');
}, 3000);
});