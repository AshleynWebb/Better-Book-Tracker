const form = document.querySelector('form');
    const titleInput = document.querySelector('#title');
    const authorInput = document.querySelector('#author');
    const descInput = document.querySelector('#description');
    const statusInput = document.querySelector('#status');
    const bookList = document.querySelector('#book-list');


    let myLibrary = [];

    function Book(title, author, description, status){
        this.title = title;
        this.author = author;
        this.description = description;
        this.status = status;
    }

    function addBookToLibrary() {
        const newBook = new Book(titleInput.value, authorInput.value, descInput.value, statusInput.value);
        myLibrary.push(newBook);
        localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    }

    function displayBooks() {
        bookList.innerHTML = '';
        myLibrary.forEach((book, index) => {
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('book');

            const title = document.createElement('h3');
            title.textContent = book.title;

            const author = document.createElement('p');
            author.textContent = 'By ${book.author}';

            

        })
    }