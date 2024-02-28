class Book {
  constructor (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = Math.random();
  }
}

const myLibrary = [
  new Book("A Game of Thrones", "George R. R. Martin", 694, true),
  new Book("A Clash of Kings", "George R. R. Martin", 708, false),
  new Book("A Storm of Swords", "George R. R. Martin", 973, false),
  new Book("A Feast For Crows", "George R. R. Martin", 753, false),
  new Book("A Dance With Dragons", "George R. R. Martin", 1016, false),
];

const booksList = document.querySelector(".list");
const dialog = document.getElementById("dialog");
const newButton = document.querySelector(".new");
const addButton = document.querySelector(".add");
const closeButton = document.querySelector(".close");

function renderLibrary() {
  clear();
  myLibrary.forEach(book => {

    function fillReadButton() {
      book.read ? readButton.textContent = "Read" : readButton.textContent = "Unread";
      book.read ? readButton.style.color = "black" : readButton.style.color = "red";
    }

    function changeStatus() {
      book.read = !book.read;
      fillReadButton();
    }

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

    const readButton = document.createElement("div");
    readButton.className = "read-button";

    read.appendChild(readButton);
    readButton.addEventListener("click", changeStatus);

    const remove = document.createElement("div");
    const removeIcon = '<svg viewBox="0 0 24 24"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>';
    remove.className = "remove";
    remove.innerHTML = removeIcon;
    remove.addEventListener("click", e => removeBook(e));

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages;
    fillReadButton();

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
  const pagesInput = Number(document.querySelector("#new-pages").value);
  const readInput = Boolean(document.querySelector("#new-read").checked);
  const remove = document.createElement("div");
  const removeIcon = '<svg viewBox="0 0 24 24"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>';
  remove.className = "remove";
  remove.innerHTML = removeIcon;

  if (validateForm()) {
    myLibrary.push(new Book(titleInput, authorInput, pagesInput, readInput));
    renderLibrary();
  }
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

dialog.addEventListener("click", onClick);

function onClick(event) {
  if (event.target === dialog) {
    dialog.close();
  }
};

function validateForm() {
  const titleInput = document.querySelector("#new-title").value;
  const authorInput = document.querySelector("#new-author").value;
  const pagesInput = Number(document.querySelector("#new-pages").value);

  if (titleInput.length < 3 || authorInput.length < 3) {
    alert("Title and author must be filled out");
    return false;
  } else if (titleInput.length > 22 || authorInput.length > 20) {
    alert("Title or author name too long");
    return false;
  } else if (!titleInput == "" && !authorInput == "" && pagesInput < 1 || pagesInput > 99999) {
    alert("Pages field must contain whole numbers");
    return false;
  } else {
    return true;
  }
};

renderLibrary();
