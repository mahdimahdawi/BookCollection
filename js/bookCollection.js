const bookList = document.querySelector('.book-list');
const BookTitle = document.querySelector('.title');
const BookAuthor = document.querySelector('.author');
const addButton = document.querySelector('.add');

let localBooks = [];
const books = [];

function displayBook(b) {
  const bookDiv = document.createElement('div');
  bookDiv.className = 'book-div';
  bookDiv.innerHTML += `<p>"${b.title}" by ${b.author}</p>
  <button class="remove-btn">Remove</button>`;
  bookList.appendChild(bookDiv);
}
class BookClass {
  constructor(bookTitle, bookAuthor) {
    this.title = bookTitle;
    this.author = bookAuthor;
  }

  AddBook() {
    books.push(this);
    displayBook(this);
    setTimeout(window.location.reload(), 1000);
    localStorage.setItem('book', JSON.stringify(books));
    this.title.value = '';
    this.author.value = '';
  }

  RemoveBook(k, index) {
    k.splice(index, 1);
    localStorage.setItem('book', JSON.stringify(k));
    setTimeout(window.location.reload(), 1000);
  }
}

const getBook = () => {
  const localData = localStorage.getItem('book');
  localBooks = JSON.parse(localData);
  if (localBooks) {
    localBooks.forEach((bk) => {
      displayBook(bk);
      books.push(bk);
    });
  }
};

// Event listener for add button
addButton.addEventListener('click', (e) => {
  e.preventDefault();
  const bk = new BookClass(BookTitle.value, BookAuthor.value);
  bk.AddBook();
});

getBook();

const removeBtns = document.querySelectorAll('.remove-btn');
removeBtns.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    const bk = new BookClass();
    bk.RemoveBook(books, i);
  });
});
