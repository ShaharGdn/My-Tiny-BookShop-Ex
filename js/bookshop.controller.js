'use strict'

function onInit() {
    renderBooks()
}

function renderBooks() {
    const elBooksList = document.querySelector('.book-list')

    const titles = `<tr><th>Title</th><th>Author</th>
        <th>Price</th><th>Actions</th></tr>`
    const strHtmls = gBooks.map(book => `<tr onclick="onToggleBook('${book.id}')">
        <td>${book.name}</td>
        <td>${book.author}</td>
        <td>${book.price}</td>
        <td><button class="read">Read</button><button class="update">Update</button><button class="delete" onclick="onRemoveBook(event,'${book.id}')">Delete</button></td>
        </tr>`)

    elBooksList.innerHTML = titles + strHtmls.join('')
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

function onToggleBook(bookId) {
    toggleBook(bookId)
    renderBooks()
}