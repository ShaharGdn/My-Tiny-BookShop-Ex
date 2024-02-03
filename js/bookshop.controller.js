'use strict'

function onInit() {
    renderBooks()
}

function renderBooks() {
    const elBooksList = document.querySelector('.book-list')

    const strHtmls = gBooks.map(book => `<td>`)

    // elBooksList.innerHTML = strHtmls.join('')
}

function onSetFilterBy() {
    console.log('hi')
}

function onAddBook(ev) {
    ev.preventDefault()
    const elInput = document.querySelector('.new-book input')

    addBook(elInput)

    elInput.value = ''
}

function onRemoveBook(ev, bookId) {
    ev.stopPropagation()

    removeBook(bookId)
    renderBooks()
}

function onToggleTodo(bookId) {
    toggleBook(bookId)
    renderBooks()
}