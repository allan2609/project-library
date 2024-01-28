const myLibrary = [
  new Book("A Game of Thrones", "George R. R. Martin", 694, true),
  new Book("A Clash of Kings", "George R. R. Martin", 708, false),
  new Book("A Storm of Swords", "George R. R. Martin", 973, false),
  new Book("A Feast For Crows", "George R. R. Martin", 753, false),
  new Book("A Dance With Dragons", "George R. R. Martin", 1016, false),
];

const booksList = document.querySelector(".books");
const dialog = document.getElementById("dialog");
const newButton = document.querySelector(".new");
const addButton = document.querySelector(".add");
const closeButton = document.querySelector(".close");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = Boolean(read);
  this.info = function() {
    return this.title + " by " + this.author + ". " + this.pages + " pages." + " Read? " + this.read;
  };
  this.changeStatus = () => {
    this.read = read ? false : true;
  };
  this.id = Math.random();
}

function renderLibrary() {
  clear();

  myLibrary.forEach(book => {

    const item = document.createElement("span");
    item.className = "item";
    item.dataset.bookID = book.id;

    const title = document.createElement("div");
    title.className = "title";

    const author = document.createElement("div");
    author.className = "author";

    const pages = document.createElement("div");
    pages.className = "pages";

    const read = document.createElement("div");
    read.className = "read";

    const remove = document.createElement("div");
    const removeIcon = '<svg viewBox="0 0 24 24"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>';
    remove.className = "remove";
    remove.innerHTML = removeIcon;
    remove.addEventListener("click", e => removeBook(e));

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages;
    read.textContent = book.read;

    item.appendChild(title);
    item.appendChild(author);
    item.appendChild(pages);
    item.appendChild(read);
    item.appendChild(remove);

    booksList.appendChild(item);
  });
}

function clear() {
  while (booksList.hasChildNodes()) {
    booksList.removeChild(booksList.firstChild);
  }
};

function removeBook(event) {
  const targetBook = event.target.closest(".item").dataset.bookID;
  const index = myLibrary.findIndex(book => book.id == targetBook);
  myLibrary.splice(index, 1);
  renderLibrary();
};

newButton.addEventListener("click", () => {
  dialog.showModal();
});

addButton.addEventListener("click", () => {
  const titleInput = document.querySelector("#new-title").value;
  const authorInput = document.querySelector("#new-author").value;
  const pagesInput = document.querySelector("#new-pages").value;
  const readInput = document.querySelector("#new-read").value;
  myLibrary.push(new Book(titleInput, authorInput, pagesInput, readInput));
  renderLibrary();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

renderLibrary();
