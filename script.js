let libraryContainer = [];

class Book {
    constructor(title, author, pages, hasRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.hasRead = hasRead;
    }
}

function addBook() {

}

function displayBooks(libraryContainer) {
    libraryContainer.forEach(book => {
        let bookContainer = document.createElement('div');
        bookContainer.classList.add('book-container');
    
        let bookTitle = document.createElement('h2');
        bookTitle.classList.add('book-title');
        bookTitle.innerText = book.title;
    
        let bookAuthor = document.createElement('h3');
        bookAuthor.classList.add('book-author');
        bookAuthor.innerText = book.author;
    
        let bookPages = document.createElement('h4');
        bookPages.classList.add('book-pages')
        bookPages.innerText = `${book.pages} pages`;

        let hasReadText = document.createElement('span');
        hasReadText.classList.add('book-status-text');
        hasReadText.innerText = 'Read Status';
        let hasRead = document.createElement('input');
        hasRead.classList.add('book-status');
        hasRead.setAttribute('type', 'checkbox');

        bookContainer.append(bookTitle, bookAuthor, bookPages, hasReadText, hasRead);
        document.body.appendChild(bookContainer);

    });
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 255, true);
libraryContainer.push(theHobbit);

const harryPotter = new Book('Harry Potter', 'J.K. Rowling', 223, false);
libraryContainer.push(harryPotter);

console.dir(libraryContainer);


displayBooks(libraryContainer);