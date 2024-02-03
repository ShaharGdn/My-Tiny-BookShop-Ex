'use strict'

var gBooks = [
    { name: 'Black Fog', author: 'Jane Air', id: makeId(), isAvailable: true },
    { name: 'Ginger', author: 'Shlomo', id: makeId(), isAvailable: true },
    { name: 'Matski', author: 'Ingi', id: makeId(), isAvailable: true },
]

function addBook(elInput) {
    var bookStr = elInput.value
    var bookNameAuthor = bookStr.split(',')
    var bookName = bookNameAuthor[0]
    var author = bookNameAuthor[1]

    const book = { name: bookName, author: author, id: makeId(), isAvailable: true }

    gBooks.unshift(book)
    // renderBooks()
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