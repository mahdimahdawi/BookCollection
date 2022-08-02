const bookTitle = document.querySelector('.title');
const bookAuthor = document.querySelector('.author');
const AddButton = document.querySelector('.add');

const books = [];

const bookList = document.querySelector('.book-list');

function addBook(t, a) {
  const collection = {
    title: t,
    author: a,
  };

  return collection;
}

function dispalyBook(book) {
  const bookT = document.createElement('p');
  bookT.innerHTML = book.title;
  bookT.className = 'book-title';
  const bookA = document.createElement('p');
  bookA.innerHTML = book.author;
  bookA.className = 'book-author';
  const removeButton = document.createElement('button');
  removeButton.innerHTML = 'Remove';
  removeButton.className = 'remove-btn';
  const line = document.createElement('hr');

  bookList.appendChild(bookT);
  bookList.appendChild(bookA);
  bookList.appendChild(removeButton);
  bookList.appendChild(line);
}

let localBooks = [];
function loadBooks() {
  const bookData = localStorage.getItem('booksArr');
  localBooks = JSON.parse(bookData);
  if (localBooks) {
    localBooks.forEach((bk) => {
      dispalyBook(bk);
      books.push(bk);
    });
  }
}
AddButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (bookTitle.value != null && bookAuthor.value != null) {
    const bk = addBook(bookTitle.value, bookAuthor.value);
    books.push(bk);
    dispalyBook(bk);
    location.reload();
    localStorage.setItem('booksArr', JSON.stringify(books));
  }
});
loadBooks();
document.querySelectorAll('.remove-btn').forEach((btn, i) => {
  btn.addEventListener('click', () => {
    books.splice(i, 1);
    localStorage.setItem('booksArr', JSON.stringify(books));
    location.reload();
  });
});
