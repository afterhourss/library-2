class Library {
  constructor() {
    //default books
    this.books = [
      {
        title: "A Game of Thrones",
        author: "George R. R. Martin",
        pages: 694,
        isRead: true,
      },
      {
        title: "Fight Club",
        author: "Chuck Palahniuk",
        pages: 208,
        isRead: false,
      },
    ];
    console.log(this.books);
  }
  getBook() {
    return this.books.map((book) => book.title);
  }
  removeBook(title) {
    this.books = this.books.filter((book) => book.title !== title);
  }
  getLength() {
    return this.books.length;
  }
  addBookToLibrary(newBook) {
    if (!this.isInLibrary(newBook)) {
      this.books.push(newBook);
    }
    return;
  }
  isInLibrary(newBook) {
    return this.books.some((book) => book.title === newBook.title);
  }
}

class Book {
  constructor(
    title = "unknown",
    author = "unknown",
    pages = "0",
    isRead = false
  ) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

let library = new Library();
//DOM
const btnSubmit = document.querySelector(".submit-btn");
const empty = document.querySelector(".empty-lib-para");
const addBookBtn = document.querySelector(".add-book-btn");
const popupContainer = document.querySelector(".container-2");
const popupOverlay = document.querySelector(".overlay");
const listBookContainer = document.querySelector(".list-book-container");

function getUserInput() {
  const title = document.querySelector(".book-title").value;
  const author = document.querySelector(".book-author").value;
  const pages = document.querySelector(".book-pages").value;
  const isRead = document.querySelector(".book-read").checked;

  return new Book(title, author, pages, isRead);
}

function addBook() {
  const newBook = getUserInput();
  if (library.isInLibrary(newBook)) {
    console.log("book already added");
  } else {
    library.addBookToLibrary(newBook);
    displayBook();
  }
}

function refreshTable() {
  listBookContainer.innerHTML = "";
  emptyData();
}

function emptyData() {
  if (library.getLength() === 0) {
    empty.textContent = "oops~ where did book go?";
  } else if (library.getLength() >= 1) {
    empty.textContent = "";
  }
}

function toggleRead(item) {
  item.isRead = !item.isRead;
  displayBook();
}

function handleStringLength(stringVal) {
  if (stringVal.length > 24) {
    shortenString = stringVal.substring(0, 17).concat("...");
    return shortenString;
  } else {
    return stringVal;
  }
}
function displayBook() {
  refreshTable();

  for (let i = 0; i < library.getLength(); i++) {
    const book = document.createElement("div");
    const bookTitle = document.createElement("p");
    const bookAuthor = document.createElement("p");
    const bookPages = document.createElement("p");
    const readBtn = document.createElement("button");
    const removeBtn = document.createElement("button");

    book.setAttribute("data-book-title", library.books[i].title);

    book.classList.add("display-book");
    bookTitle.classList.add("display-title");
    bookAuthor.classList.add("display-author");
    readBtn.classList.add("read-btn");
    removeBtn.classList.add("remove-btn");

    listBookContainer.appendChild(book);
    book.appendChild(bookTitle);
    book.appendChild(bookAuthor);
    book.appendChild(bookPages);
    book.appendChild(readBtn);
    book.appendChild(removeBtn);

    bookTitle.textContent = handleStringLength(library.books[i].title);
    bookAuthor.textContent = handleStringLength(library.books[i].author);
    bookPages.textContent = library.books[i].pages;
    readBtn.textContent =
      library.books[i].isRead === true ? "already read" : "not read yet";
    removeBtn.textContent = "remove";

    readBtn.addEventListener("click", () => {
      toggleRead(library.books[i]);
    });
    removeBtn.addEventListener("click", () => {
      library.removeBook(book.dataset.bookTitle);
      displayBook();
    });
  }
}

btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  addBook();
  popupContainer.classList.toggle("display-none");
});

displayBook();

//pop up toggle
addBookBtn.addEventListener("click", () => {
  popupContainer.classList.toggle("display-none");
});

popupOverlay.addEventListener("click", () => {
  popupContainer.classList.toggle("display-none");
});
