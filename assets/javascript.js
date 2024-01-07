const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = Boolean(read);
  this.info = function() {
    return this.title + " by " + this.author + ". " + this.pages + " pages." + " Read? " + this.read
  };
  this.changeStatus = () => {
    this.read = read ? false : true;
  };
}

const aGameOfThrones = new Book("A Game of Thrones", "George R. R. Martin", 694, true);
addBookToLibrary(aGameOfThrones);
const aClashOfKings = new Book("A Clash of Kings", "George R. R. Martin", 708, false);
addBookToLibrary(aClashOfKings);
const aStormOfSwords = new Book("A Storm of Swords", "George R. R. Martin", 973, false);
addBookToLibrary(aStormOfSwords);

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayLibrary() {
  const booksList = document.querySelector(".books");
  for (let i = 0; i < myLibrary.length; i++) {
    const item = document.createElement("span");
    item.className = "item";
    const title = document.createElement("div");
    title.className = "title";
    const author = document.createElement("div");
    author.className = "author";
    const pages = document.createElement("div");
    pages.className = "pages";
    const read = document.createElement("div");
    read.className = "read";
    item.appendChild(title);
    title.textContent = myLibrary[i].title;
    item.appendChild(author);
    author.textContent = myLibrary[i].author;
    item.appendChild(pages);
    pages.textContent = myLibrary[i].pages;
    item.appendChild(read);
    read.textContent = myLibrary[i].read;
    booksList.appendChild(item);
  };
}

displayLibrary();

const dialog = document.getElementById("dialog");
const newButton = document.querySelector(".new");
const addButton = document.querySelector(".add");
const closeButton = document.querySelector(".close");

newButton.addEventListener("click", () => {
  dialog.showModal();
});

addButton.addEventListener("click", () => {
  const titleInput = document.querySelector("#new-title").value;
  const authorInput = document.querySelector("#new-author").value;
  const pagesInput = document.querySelector("#new-pages").value;
  const readInput = document.querySelector("#new-read").value;
  let newEntry = new Book(titleInput, authorInput, pagesInput, readInput);
  addBookToLibrary(newEntry);
  displayLibrary();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});
