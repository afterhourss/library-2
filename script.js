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
const tableHead = document.querySelector(".table-head");
const addBookBtn = document.querySelector(".add-book-btn");
const popupContainer = document.querySelector(".container-2");
const popupOverlay = document.querySelector(".overlay");

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
  const trList = document.querySelectorAll(".trArrData");
  for (const tr of trList) {
    tr.remove();
  }
  emptyData();
}

function emptyData() {
  if (myLibrary.length === 0) {
    empty.textContent = "oops~ where did book go?";
    tableHead.classList.add("display-none");
  } else if (myLibrary.length >= 1) {
    empty.textContent = "";
    tableHead.classList.remove("display-none");
  }
}

function toggleRead(item) {
  item.isRead = !item.isRead;
  displayBook();
}

function displayBook() {
  refreshTable();

  for (let i = 0; i < myLibrary.length; i++) {
    const table = document.querySelector("table");
    const tr = document.createElement("tr");
    const tableTitle = document.createElement("td");
    const tableAuthor = document.createElement("td");
    const tablePages = document.createElement("td");
    const readBtn = document.createElement("button");
    const removeBtn = document.createElement("button");

    tr.classList.add("trArrData");
    readBtn.classList.add("table-btn");
    removeBtn.classList.add("table-btn");

    table.appendChild(tr);
    tr.appendChild(tableTitle);
    tr.appendChild(tableAuthor);
    tr.appendChild(tablePages);
    tr.appendChild(readBtn);
    tr.appendChild(removeBtn);

    tableTitle.textContent = myLibrary[i].title;
    tableAuthor.textContent = myLibrary[i].author;
    tablePages.textContent = myLibrary[i].pages;
    readBtn.textContent = myLibrary[i].isRead === true ? "udah baca" : "belum";
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
