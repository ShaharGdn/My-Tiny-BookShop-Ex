'use strict'

var gBooks
_createBooks()

function getBooks() {
    // return gBooks = [
    //     { name: 'Black Fog', author: 'Jane Air', price: '100', id: makeId(), isAvailable: true, imgURL: `<img src="https://edit.org/images/cat/book-covers-big-2019101610.jpg">` },
    //     { name: 'Ginger', author: 'Shlomo', price: '120', id: makeId(), isAvailable: true, imgURL: `<img src="https://content.wepik.com/statics/90897927/preview-page0.jpg">` },
    //     { name: 'Matski', author: 'Ingi', price: '80', id: makeId(), isAvailable: true, imgURL: `<img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-book-cover-design-template-34323b0f0734dccded21e0e3bebf004c_screen.jpg?ts=1637015198">` },
    // ]
    return gBooks
}

function addBook(elInput) {
    var bookStr = elInput.value
    var bookNameAuthorPrice = bookStr.split(',')
    var name = bookNameAuthorPrice[0]
    var author = bookNameAuthorPrice[1]
    var price = bookNameAuthorPrice[2]

    const book = _createBook(name, author, price, `<img src="https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg">`)

    if (bookNameAuthorPrice.length < 3) {
        alert('Error, Please check your input')
        return
    }

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

// function toggleBook(bookId) {
//     // Update
//     const book = gBooks.find(book => book.id === bookId)
//     book.isAvailable = !book.isAvailable

//     return book
// }

function updateBook(bookId, newPrice) {
    const idx = gBooks.findIndex(book => book.id === bookId)
    gBooks[idx].price = newPrice

    _saveBooks()

}

function readBook(BookId) {
    // Read
    const book = gBooks.find(book => book.id === BookId)
    return book
}


// Private functions

function _createBooks() {
    gBooks = loadFromStorage('booksDB')
    if (!gBooks || gBooks.length === 0) {
        gBooks = [
            // { name: 'Black Fog', author: 'Jane Air', price: '100', id: makeId(), imgURL: `<img src="https://edit.org/images/cat/book-covers-big-2019101610.jpg">` },
            // { name: 'Ginger', author: 'Shlomo', price: '120', id: makeId(), imgURL: `<img src="https://content.wepik.com/statics/90897927/preview-page0.jpg">` },
            // { name: 'Matski', author: 'Ingi', price: '80', id: makeId(), imgURL: `<img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-book-cover-design-template-34323b0f0734dccded21e0e3bebf004c_screen.jpg?ts=1637015198">` },
            _createBook('Black Fog', 'Jane Air', '100', `<img src="https://edit.org/images/cat/book-covers-big-2019101610.jpg">`),
            _createBook('Ginger', 'Shlomo', '120', `<img src="https://content.wepik.com/statics/90897927/preview-page0.jpg">`),
            _createBook('Matski', 'Ingi', '80', `<img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-book-cover-design-template-34323b0f0734dccded21e0e3bebf004c_screen.jpg?ts=1637015198">`)
        ]
        _saveBooks()
    }
}

function _createBook(name, author, price, imgURL) {
    return {
        name,
        author,
        price,
        id: makeId(),
        imgURL,
    }
}

function _saveBooks() {
    saveToStorage('booksDB', gBooks)
}