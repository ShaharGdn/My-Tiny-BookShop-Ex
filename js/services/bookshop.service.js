'use strict'

var gBooks

function getBooks() {
    return gBooks = [
        { name: 'Black Fog', author: 'Jane Air', price: '100', id: makeId(), isAvailable: true ,imgURL: `<img src="https://edit.org/images/cat/book-covers-big-2019101610.jpg">`},
        { name: 'Ginger', author: 'Shlomo', price: '120', id: makeId(), isAvailable: true ,imgURL: `<img src="https://content.wepik.com/statics/90897927/preview-page0.jpg">`},
        { name: 'Matski', author: 'Ingi', price: '80', id: makeId(), isAvailable: true ,imgURL: `<img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-book-cover-design-template-34323b0f0734dccded21e0e3bebf004c_screen.jpg?ts=1637015198">`},
    ]
}

function addBook(elInput) {
    var bookStr = elInput.value
    var bookNameAuthorPrice = bookStr.split(',')
    var bookName = bookNameAuthorPrice[0]
    var author = bookNameAuthorPrice[1]
    var price = bookNameAuthorPrice[2]

    const book = { name: bookName, author: author, price: price, id: makeId(), isAvailable: true }

    gBooks.unshift(book)
    renderBooks()
    console.log('gBooks:', gBooks)
}

function removeBook(bookId) {
    // Delete
    const idx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(idx, 1)
}

function toggleBook(bookId) {
    // Update
    const book = gBooks.find(book => book.id === bookId)
    book.isAvailable = !book.isAvailable

    return book
}

function updateBook(bookId, newPrice) {
    const idx = gBooks.findIndex(book => book.id === bookId)
    gBooks[idx].price = newPrice
}

function readBook(BookId) {
	// Read
	const book = gBooks.find(book => book.id === BookId)
	return book
}