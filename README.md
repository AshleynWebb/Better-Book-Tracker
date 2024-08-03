# Better Book Tracker

Welcome to Better Book Tracker, a web application designed to help bibliophiles keep track of their book collections and reading progress. This project is built using HTML, CSS, and JavaScript, and it leverages the Open Library API to search for and add books to your personal library.

## Features

Features used in this project:
1.Use arrays, objects, sets or maps to store and retrieve information that is displayed in your app.
Arrays and objects are used to store and retrieve information about books in the myLibrary array.

2.Analyze data that is stored in arrays, objects, sets or maps and display information about it in your app.
The project analyzes data stored in the myLibrary array to display information about books and generate a chart.

3.Use a regular expression to validate user input and either prevent the invalid input or inform the user about it (in all cases prevent invalid input from being stored or saved).
The addBookToLibrary function accepts multiple input parameters (title, author, description, readingStatus) and adds a new book to the library.

4.Analyze text and display useful information about it. (e.g. word/character count in an input field)
The project visualizes data in a user-friendly way using a pie chart to show the distribution of book statuses.

5.Retrieve data from a third-party API and use it to display something within your app.
The project uses the Open Library API to search for books and display the results. This is evident in the getBooks() function, which fetches data from the API and then renders the search results using the renderSearchResults() function.


- **Book Search**: Search for books using the Open Library API and add them to your library with a single click.
- **Add Books Manually**: If a book is not found in the Open Library API, you can manually add it to your library by providing the title, author, description, and reading status.
- **Book Management**: View, edit, and delete books from your library.
- **Reading Status Tracking**: Keep track of your reading progress by marking books as "Read," "Want to Read," or "Currently Reading."
- **Local Storage**: Your book library is stored locally in your browser, so your data persists even after closing the application.
- **Book Status Chart**: A visual representation of your reading progress using a bar chart.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Open Library API
- Chart.js (for the book status chart)

## Getting Started

To run the Better Book Tracker application locally, follow these steps:

1. Clone the repository or download the source code.
2. Open the `index.html` file in a web browser.

## Project Structure

- `index.html`: The main HTML file that contains the structure and layout of the application.
- `CSS/Styles.css`: The CSS file that styles the application.
- `Javascript/Scripts.JS`: The JavaScript file that contains the application logic and functionality.
- `images/`: A directory containing the images used in the application.

## Usage

1. **Search for Books**: Enter a book title or author in the search input field and click the "Search for a book" button. The application will fetch book data from the Open Library API and display the search results.
2. **Add Books to Library**: Click the "Add to Library" button next to a book in the search results to add it to your personal library.
3. **Add Books Manually**: If a book is not found in the Open Library API, you can manually add it to your library by filling out the "Add a book" form and clicking the "Add Book selection" button.
4. **Manage Books**: In your library, you can edit a book's details by clicking the "Edit" button, or delete a book by clicking the "Delete" button.
5. **Track Reading Status**: Each book in your library has a reading status indicator ("Read," "Want to Read," or "Currently Reading"). You can change a book's status by editing its details.
6. **View Book Status Chart**: A bar chart at the bottom of the page displays the distribution of books across the different reading statuses.

## Contributing

Contributions to the Better Book Tracker project are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the project's GitHub repository.

## License

This project is licensed under the [MIT License](LICENSE).
