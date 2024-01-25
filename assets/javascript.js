let myLibrary = [];
const booksList = document.querySelector(".books");
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
const remove = document.createElement("div");
const removeIcon = '<svg viewBox="0 0 24 24"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>';
remove.className = "remove";
remove.innerHTML = removeIcon;

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

function addFirstBooks() {
  const aGameOfThrones = ([new Book("A Game of Thrones", "George R. R. Martin", 694, true), remove]);
  const aClashOfKings = ([new Book("A Clash of Kings", "George R. R. Martin", 708, false), remove]);
  const aStormOfSwords = ([new Book("A Storm of Swords", "George R. R. Martin", 973, false), remove]);
  const aFeastForCrows = ([new Book("A Feast For Crows", "George R. R. Martin", 753, false), remove]);
  const aDanceWithDragons = ([new Book("A Dance With Dragons", "George R. R. Martin", 1016, false), remove]);

  myLibrary.push(aGameOfThrones, aClashOfKings, aStormOfSwords, aFeastForCrows, aDanceWithDragons);

  for (let i = 0; i < myLibrary.length; i++) {

    const booksList = document.querySelector(".books");
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
    const remove = document.createElement("div");
    const removeIcon = '<svg viewBox="0 0 24 24"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>';
    remove.className = "remove";
    remove.innerHTML = removeIcon;
    
    title.textContent = myLibrary[i][0].title;
    author.textContent = myLibrary[i][0].author;
    pages.textContent = myLibrary[i][0].pages;
    read.textContent = myLibrary[i][0].read;
    item.appendChild(title);
    item.appendChild(author);
    item.appendChild(pages);
    item.appendChild(read);
    item.appendChild(remove);

    remove.addEventListener("click", event => {
      event.target.closest(".remove").parentNode.remove();
      myLibrary.splice(i, 1);
    });

    booksList.appendChild(item);
  };
}

addFirstBooks();

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

  myLibrary.push([new Book(titleInput, authorInput, pagesInput, readInput), remove]);

  remove.addEventListener("click", event => {
    event.target.closest(".remove").parentNode.remove();
    myLibrary = myLibrary.filter(v => v[1] !== event.target.closest(".remove"));
  });

  title.textContent = titleInput;
  author.textContent = authorInput;
  pages.textContent = pagesInput;
  read.textContent = readInput;

  item.appendChild(title);
  item.appendChild(author);
  item.appendChild(pages);
  item.appendChild(read);
  item.appendChild(remove);

  booksList.appendChild(item);
});

closeButton.addEventListener("click", () => {
  dialog.close();
});
