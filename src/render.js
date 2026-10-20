
export function renderBooks(books, bookList) {
  bookList.innerHTML = '';

  books.forEach(function (book) {
    const bookElement = document.createElement('div');
    bookElement.classList.add('book');

    if (book.read) {
      bookElement.classList.add('read');
    }

    bookElement.innerHTML = `
      <div>
        <strong class="book-title">${book.title}</strong> — <em>${book.author}</em>
        <br><small>${book.genre} · ${book.pages} sidor</small>
      </div>
      <button class="toggle-read-btn">
        ${book.read ? 'Markera som oläst' : 'Markera som läst'}
      </button>
    `;

    bookElement.dataset.author = book.author;
    bookElement.dataset.read = book.read;

    bookList.appendChild(bookElement);
  });
}
