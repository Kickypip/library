let libraryContainer = [];
if (localStorage.libraryContainer) {
    libraryContainer = JSON.parse(localStorage.libraryContainer);
}

class Book {
    constructor(title, author, pages, hasRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.hasRead = hasRead;
    }
}

function addBook(title, author, pages, hasRead) {
    let newBook = new Book(title, author, pages, hasRead);
    libraryContainer.push(newBook);
    localStorage.libraryContainer = JSON.stringify(libraryContainer);
}

function displayBook(book) {
    let bookContainer = document.createElement('div');
    bookContainer.classList.add('book-container');

    let bookTitle = document.createElement('h2');
    bookTitle.classList.add('book-title');
    bookTitle.innerText = book.title;

    let bookAuthor = document.createElement('h3');
    bookAuthor.classList.add('book-author');
    bookAuthor.innerText = book.author;

    bookPages = document.createElement('h4');
    bookPages.classList.add('book-pages')
    if (book.pages) {
        bookPages.innerText = `${book.pages} pages`;
    }
    
    let hasReadText = document.createElement('span');
    hasReadText.classList.add('book-status-text');
    hasReadText.innerText = 'Read Status';

    let readStatus = document.createElement('input');
    readStatus.setAttribute('type', 'checkbox');
    readStatus.classList.add('book-status');
    if (book.hasRead) {
        readStatus.checked = true;
    }
    readStatus.addEventListener('click', function () {
        toggleReadStatus(this);
    })

    let deleteBookBtn = document.createElement('button');
    deleteBookBtn.classList.add('book-delete');
    deleteBookBtn.innerText = 'Delete Book';
    deleteBookBtn.addEventListener('click', function () {
        deleteBook(this);
    })

    bookContainer.append(bookTitle, bookAuthor, bookPages, hasReadText, readStatus, deleteBookBtn);
    mainContent.appendChild(bookContainer);
}

const addBookBtn = document.getElementById('add-book');
const addBookModal = document.getElementById('add-book-modal');
const header = document.getElementById('header');
const mainContent = document.getElementById('main-content');

addBookBtn.addEventListener('click', function () {
    addBookModal.style.cssText = 'display: flex';
    mainContent.style.cssText = 'filter: blur(2px)';
    header.style.cssText = 'filter: blur(2px)';
});

let closeModalBtn = document.getElementById('modal-close');
closeModalBtn.addEventListener('click', function() {
    closeModal();
});

function closeModal() {
    addBookModal.style.cssText = 'display: none';
    mainContent.style.cssText = 'filter: none';
    header.style.cssText = 'filter: none';
}

const modalForm = document.getElementById('modal-form');
const submitBook = document.getElementById('submit-book');
submitBook.addEventListener('click', function () {
    let titleValue = document.getElementById('modal-title').value;
    let authorValue = document.getElementById('modal-author').value;
    let pageCountValue = document.getElementById('modal-pages').value;
    let readStatus = document.getElementById('modal-read').checked;

    if (!titleValue) {
        return;
    } else if (!pageCountValue) {
        pageCountValue = null;
    }
    addBook(titleValue, authorValue, pageCountValue, readStatus);
    displayBook(libraryContainer[libraryContainer.length - 1]);
    closeModal();
    modalForm.reset();
});

function deleteBook(btn) {
    let currentBook = btn.parentElement;
    let currentBookTitle = currentBook.getElementsByClassName('book-title')[0].innerText;
    let currentBookIndex = libraryContainer.findIndex(book => book.title === currentBookTitle);
    libraryContainer.splice((currentBookIndex), 1);
    currentBook.remove();
    localStorage.libraryContainer = JSON.stringify(libraryContainer);
}

function toggleReadStatus(btn) {
    let currentBook = btn.parentElement;
    let currentReadStatus = currentBook.getElementsByClassName('book-status')[0].checked;
    let currentBookTitle = currentBook.getElementsByClassName('book-title')[0].innerText;
    let currentBookIndex = libraryContainer.findIndex(book => book.title === currentBookTitle);
    libraryContainer[currentBookIndex].hasRead = currentReadStatus;
}

libraryContainer.forEach(book => {
    displayBook(book);
});
