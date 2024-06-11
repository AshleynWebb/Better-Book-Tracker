const form = document.querySelector('form');
    const titleInput = document.querySelector('#title');
    const authorInput = document.querySelector('#author');
    const descInput = document.querySelector('#description');
    const statusInput = document.querySelector('#status');
    const bookList = document.querySelector('#book-list');


    let myLibrary = [];

    function Book(title, author, description, status)
        this.title =