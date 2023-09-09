const myLibrary = [
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
  {
    title: "Fight Club",
    author: "Chuck Palahniukasdasdasdasdasdasdas",
    pages: 208,
    isRead: false,
  },
];

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
  myLibrary.push(newBook);
  displayBook();
}

function refreshTable() {
  listBookContainer.innerHTML = "";
  emptyData();
}

function emptyData() {
  if (myLibrary.length === 0) {
    empty.textContent = "oops~ where did book go?";
    console.log("test");
  } else if (myLibrary.length >= 1) {
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

  for (let i = 0; i < myLibrary.length; i++) {
    const book = document.createElement("div");
    const bookTitle = document.createElement("p");
    const bookAuthor = document.createElement("p");
    const bookPages = document.createElement("p");
    const readBtn = document.createElement("button");
    const removeBtn = document.createElement("button");

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

    bookTitle.textContent = handleStringLength(myLibrary[i].title);
    bookAuthor.textContent = handleStringLength(myLibrary[i].author);
    bookPages.textContent = myLibrary[i].pages;
    readBtn.textContent =
      myLibrary[i].isRead === true ? "already read" : "not read yet";
    removeBtn.textContent = "remove";

    readBtn.addEventListener("click", () => {
      toggleRead(myLibrary[i]);
    });
    removeBtn.addEventListener("click", () => {
      myLibrary.splice(myLibrary.indexOf(myLibrary[i]), 1);
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
