function getBooks() {
  const limit = 10;
  const searchResults = document.getElementById('search-results');
  searchResults.innerHTML = '';

  fetch(`https://openlibrary.org/search.json?q=${document.getElementById('findbook').value}&limit=${limit}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('API response:', data);
      if (data.docs.length === 0) {
        showErrorMessage('No results found for the given search query.');
      } else {
        renderSearchResults(data.docs);
      }
    })
    .catch(error => {
      console.error('Error fetching books:', error);
      showErrorMessage('An error occurred while fetching book data. Please try again later.');
    });
}

function renderSearchResults(books) {
  const searchResults = document.getElementById('search-results');
  searchResults.innerHTML = '';

  books.forEach(book => {
    const bookElement = document.createElement('div');
    bookElement.classList.add('search-result');

    const title = document.createElement('h3');
    title.textContent = book.title || 'Unknown Title';

    const author = document.createElement('p');
    author.textContent = `By ${book.author_name ? book.author_name[0] : 'Unknown Author'}`;

    const coverImage = document.createElement('img');
    coverImage.src = book.isbn ? `https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-M.jpg` : 'placeholder.jpg';
    coverImage.alt = `${book.title || 'Unknown Title'} Cover`;

    const addButton = document.createElement('button');
    addButton.textContent = 'Add to Library';
    addButton.addEventListener('click', () => {
      const newBook = new Book(
        book.title || 'Unknown Title',
        book.author_name ? book.author_name[0] : 'Unknown Author',
        '',
        'Want to read' 
      );
      addBookToLibrary(newBook);
    });

    bookElement.append(title, author, coverImage, addButton);
    searchResults.appendChild(bookElement);
  });
}

function showErrorMessage(message) {
  const searchResults = document.getElementById('search-results');
  searchResults.innerHTML = `<p class="error-message">${message}</p>`;
}

const form = document.getElementById('add_book');
const titleInput = document.querySelector('#titleInput');
const authorInput = document.querySelector('#authorInput');
const descInput = document.querySelector('#descriptionInput');
const statusInput = document.querySelector("#readingStatusInput");
const bookList = document.querySelector('#book-list');

let myLibrary = [];

class Book {
    title;
    author;
    description;
    readingStatus;

    constructor(title, author, description, readingStatus) { 
        this.title = title;
        this.author = author;
        this.description = description;
        this.readingStatus = readingStatus;
    }
}

function addBookToLibrary(newBook) {
    const existingBook = myLibrary.find(book => book.title === newBook.title);
    if (existingBook) {
        console.log(`Book "${newBook.title}" already exists in the library.`);
        return;
    }

    myLibrary.push(newBook);
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    displayBooks();
}

function displayBooks() {
    bookList.innerHTML = '';
    myLibrary.forEach((book, index) => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');

        const title = document.createElement('h3');
        title.textContent = book.title;

        const author = document.createElement('p');
        author.textContent = `By ${book.author}`;

        const description = document.createElement('p');
        description.textContent = book.description;
        description.classList.add('description');

        const status = document.createElement('p');
        status.classList.add('status');

        switch (book.readingStatus) {
            case 'Read':
                status.textContent = 'Read';
                status.style.color = 'white';
                break;
            case 'Want to read':
                status.textContent = 'Want to read';
                status.style.color = 'red'
                break;
            case 'Currently reading':
                status.textContent = 'Currently reading';
                status.style.color = 'Orange';
                break;
            default:
                break;
        }

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            myLibrary.splice(index, 1);
            localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
            displayBooks();
        });

        const editBtn = document.createElement('button');
        editBtn.classList.add('edit-btn');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => {
            titleInput.value = book.title;
            authorInput.value = book.author;
            descInput.value = book.description;
            statusInput.value = book.readingStatus;

            myLibrary.splice(index, 1);
            localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
            displayBooks();
        });

        bookDiv.append(title, author, description, status, editBtn, deleteBtn);
        bookList.appendChild(bookDiv);
    });
    generateBookStatusChart();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary(new Book(titleInput.value, authorInput.value, descInput.value, statusInput.value));
    form.reset();
    displayBooks();
});

if (localStorage.getItem('myLibrary')) {
    myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    displayBooks();
}
let bookStatusChart = null;

function generateBookStatusChart() {
  const readCount = myLibrary.filter(book => book.readingStatus === 'Read').length;
  const wantToReadCount = myLibrary.filter(book => book.readingStatus === 'Want to read').length;
  const currentlyReadingCount = myLibrary.filter(book => book.readingStatus === 'Currently reading').length;

  const ctx = document.getElementById('bookStatusChart').getContext('2d');
 
 function generateBookStatusChart() {

}

function searchLibrary(query) {
  console.log("Searching library for:", query);
  const results = myLibrary.filter(book => 
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase()) ||
      book.description.toLowerCase().includes(query.toLowerCase())
  );
  return results;
}


function displayBooks(books = myLibrary) {
  bookList.innerHTML = '';
  books.forEach((book, index) => {
      const bookDiv = document.createElement('div');
      bookDiv.classList.add('book');

      const title = document.createElement('h3');
      title.textContent = book.title;

      const author = document.createElement('p');
      author.textContent = `By ${book.author}`;

      const description = document.createElement('p');
      description.textContent = book.description;
      description.classList.add('description');

      const status = document.createElement('p');
      status.classList.add('status');
      status.textContent = book.readingStatus;

      bookDiv.append(title, author, description, status);
      bookList.appendChild(bookDiv);
  });

  generateBookStatusChart();
}

document.getElementById('library-search-button').addEventListener('click', () => {
    const query = document.getElementById('library-search-input').value;
    const filteredBooks = searchLibrary(query);
    displayBooks(filteredBooks);
});

document.getElementById('library-search-input').addEventListener('input', () => {
    const query = document.getElementById('library-search-input').value;
    if (query === '') {
        displayBooks(); 
    }
});


  const chart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Read', 'Want to Read', 'Currently Reading'],
      datasets: [{
        label: 'Book Status',
        data: [readCount, wantToReadCount, currentlyReadingCount],
        backgroundColor: ['#4CAF50', '#F44336', '#FF9800'],
        borderColor: ['#4CAF50', '#F44336', '#FF9800'],
        borderWidth: 1
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Book Status Distribution'
        }
      }
    }
  });
}

