'use strict'

//Data

var gBooks
_createBooks()


//returns the filtered books from a search or original gBooks.
function getBooks(value) {
    if (!value) return gBooks;

    const valueLower = value.toLowerCase()

    var filteredBooks = gBooks.filter(book => {
        const nameLower = book.name.toLowerCase()
        return nameLower.startsWith(valueLower) || nameLower.includes(valueLower)
    })

    return filteredBooks
}

// adds a book to the model 
function addBook(elInput) {
    const bookStr = elInput.value
    const bookNameAuthorPrice = bookStr.split(',')
    const name = bookNameAuthorPrice[0]
    const author = bookNameAuthorPrice[1]
    const price = bookNameAuthorPrice[2]
    const rating = bookNameAuthorPrice[2]

    const book = _createBook(name, author, rating, price, `<img src="https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg">`)

    gBooks.unshift(book)

    _saveBooks()

    return book
}



function removeBook(bookId) {
    // Delete
    const idx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(idx, 1)

    _saveBooks()
}

// update books price model 
function updateBook(bookId, newPrice) {
    const idx = gBooks.findIndex(book => book.id === bookId)
    gBooks[idx].price = newPrice

    _saveBooks()
}


// Read - Get book details 
function readBook(BookId) {
    const book = gBooks.find(book => book.id === BookId)
    return book
}

// Private functions

//make books
function _createBooks() {
    gBooks = loadFromStorage('booksDB')
    if (!gBooks || gBooks.length === 0) {
        gBooks = [
            _createBook('Black Fog', 'Jane Air', '100', `<img src="https://edit.org/images/cat/book-covers-big-2019101610.jpg">`),
            _createBook('Ginger', 'Shlomo', '120', `<img src="https://content.wepik.com/statics/90897927/preview-page0.jpg">`),
            _createBook('Matski', 'Ingi', '80', `<img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-book-cover-design-template-34323b0f0734dccded21e0e3bebf004c_screen.jpg?ts=1637015198">`),
            _createBook('The Secret Garden', 'Frances Hodgson Burnett', '150', '<img src="https://images.unsplash.com/photo-1588369821874-53c00efb7685">'),
            _createBook('Pride and Prejudice', 'Jane Austen', '200', '<img src="https://images.unsplash.com/photo-1568534678241-1b2e5185c5c6">'),
            _createBook('The Great Gatsby', 'F. Scott Fitzgerald', '180', '<img src="https://images.unsplash.com/photo-1600608104861-9ffbd2138e7c">'),
            _createBook('To Kill a Mockingbird', 'Harper Lee', '120', '<img src="https://images.unsplash.com/photo-1566504740002-1a89e9ff183c">'),
            _createBook('1984', 'George Orwell', '130', '<img src="https://images.unsplash.com/photo-1588591798329-d79a9fad52f2">'),
            _createBook('The Catcher in the Rye', 'J.D. Salinger', '140', '<img src="https://images.unsplash.com/photo-1587402307869-00f786ef4911">'),
            _createBook('Lord of the Flies', 'William Golding', '110', '<img src="https://images.unsplash.com/photo-1602039200700-fc4582eadd81">'),
            _createBook('The Hobbit', 'J.R.R. Tolkien', '170', '<img src="https://images.unsplash.com/photo-1566567159379-27a24e3e7118">'),
            _createBook('Brave New World', 'Aldous Huxley', '160', '<img src="https://images.unsplash.com/photo-1558208213-42b1b4e7662a">'),
            _createBook('The Chronicles of Narnia', 'C.S. Lewis', '190', '<img src="https://images.unsplash.com/photo-1583030725685-4a87b0d57892">')

        ]
        _saveBooks()
    }
}

//make a single book
function _createBook(name, author , price, imgURL) {
    return {
        name,
        author,
        rating: getRandomRating(5),
        price,
        id: makeId(),
        imgURL,
    }
}

//save books to local DB
function _saveBooks() {
    saveToStorage('booksDB', gBooks)
}

//get stats of existing books
function getStats() {
    var stats = gBooks.reduce((acc, book) => {
        if (book.price > 200) {
            acc.expensive++;
        } else if (book.price <= 200 && book.price > 80) {
            acc.average++;
        } else if (book.price <= 80) {
            acc.cheap++;
        }
        return acc;
    }, { expensive: 0, average: 0, cheap: 0 });

    return stats
}

function getRandomRating(maxRate) {
    return getRandomIntInclusive(1, maxRate)
}