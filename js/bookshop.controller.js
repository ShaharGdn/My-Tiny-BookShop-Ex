'use strict'

function onInit() {
    getBooks()
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
        <td><button class="read" onclick="onReadBook('${book.id}')">Read</button><button class="update" onclick="onUpdateBook('${book.id}')">Update</button><button class="delete" onclick="onRemoveBook(event,'${book.id}')">Delete</button></td>
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
    renderBooks()

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

function onUpdateBook(bookId) {
    const newPrice = prompt('Please enter a new price: ')

    updateBook(bookId, newPrice)
    renderBooks()
}

function onReadBook(BookId) {
    const elModal = document.querySelector('.book-details')
    const elTitle = elModal.querySelector('h2 span')
    const elAuthor = elModal.querySelector('h3 span')
    const elPre = elModal.querySelector('pre')

    const book = readBook(BookId)
    
    elTitle.innerText = book.name
    elAuthor.innerText = book.author
    elPre.innerHTML = book.imgURL

    elModal.showModal()
}