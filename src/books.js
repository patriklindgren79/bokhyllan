
const books = [
  {
    id: 1,
    title: 'Bilbo',
    author: 'Tolkien',
    genre: 'Fantasy',
    pages: 310,
    read: false
  },
  {
    id: 2,
    title: '1984',
    author: 'Orwell',
    genre: 'Dystopia',
    pages: 328,
    read: true
  }
];

export default books;


export function addBook(bookData) {
  const nextId = Math.max(...books.map(function (book) {
    return book.id;
  })) + 1;

  const newBook = {
    ...bookData,
    id: nextId
  };

  books.push(newBook);
}



export function toggleRead(bookId) {
  const book = books.find(function (book) {
    return book.id === bookId;
  });

  if (book) {
    book.read = !book.read;
  }
}
