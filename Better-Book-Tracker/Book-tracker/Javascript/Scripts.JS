function getBooks() {
    console.log('getBooks function called');
    const limit = 10;
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '';

    fetch(`https://openlibrary.org/search.json?q=${document.getElementById('findbook').value}&limit=${limit}`)
      .then(response => response.json())
      .then(data => {
        console.log('API response:', data);
        data.docs.forEach(book => {
          const bookElement = document.createElement('div');
          bookElement.classList.add('search-result');

          const title = document.createElement('h3');
          title.textContent = book.title;

          const author = document.createElement('p');
          author.textContent = `By ${book.author_name ? book.author_name[0] : 'Unknown Author'}`;

          const coverImage = document.createElement('img');
          coverImage.src = `https://covers.openlibrary.org/b/isbn/${book.isbn ? book.isbn[0] : ''}-M.jpg`;
          coverImage.alt = `${book.title} Cover`;

          const addButton = document.createElement('button');
          addButton.textContent = 'Add to Library';
          addButton.addEventListener('click', () => {
            const newBook = new Book(
              book.title,
              book.author_name ? book.author_name[0] : 'Unknown Author',
              '', // No description available from the API
              'Want to read' // Set the default reading status
            );
            addBookToLibrary(newBook);
          });

          bookElement.append(title, author, coverImage, addButton);
          searchResults.appendChild(bookElement);
        });
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
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



//CHART 
function generateBookStatusChart() {
    const readCount = myLibrary.filter(book => book.readingStatus === 'Read').length;
    const wantToReadCount = myLibrary.filter(book => book.readingStatus === 'Want to read').length;
    const currentlyReadingCount = myLibrary.filter(book => book.readingStatus === 'Currently reading').length;
  
    const ctx = document.getElementById('bookStatusChart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'bar',
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
        scales: {
          y: {
            beginAtZero: true,
            precision: 0
          }
        }
      }
    });
  }

  