'use strict'

var gBooks

function getBooks() {
    return gBooks = [
        { name: 'Black Fog', author: 'Jane Air', price: '100', id: makeId(), isAvailable: true },
        { name: 'Ginger', author: 'Shlomo', price: '120', id: makeId(), isAvailable: true },
        { name: 'Matski', author: 'Ingi', price: '80', id: makeId(), isAvailable: true },
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