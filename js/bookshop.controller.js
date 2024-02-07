'use strict'

var gFilterBy = ''

function onInit() {
    //do we have storage or render the demo data?

    getBooks()
    renderBooks()
    updateStats()
}


function renderBooks() {
    const elBooksList = document.querySelector('.book-list')
    //do we have a filter? if not return gBooks all
    const books = getBooks(gFilterBy)
    
    const titles = `<tr><th>Title</th><th>Author</th><th>Rating</th>
        <th>Price</th><th>Actions</th></tr>`
    
    const emptyMsg = `<td colspan="4">No matching books were found...</td>`

    if (books.length === 0) {
        return elBooksList.innerHTML = titles + emptyMsg
    }

    //build the DOM structure of the list
    const strHtmls = books.map(book => `<tr>
        <td>${book.name}</td>
        <td>${book.author}</td>
        <td>${'⭐️'.repeat(book.rating)}</td>
        <td>${book.price}</td>
        <td><button class="read" onclick="onReadBook('${book.id}')">Read</button><button class="update" onclick="onUpdateBook('${book.id}')">Update</button><button class="delete" onclick="onRemoveBook(event,'${book.id}')">Delete</button></td>
        </tr>`)

    elBooksList.innerHTML = titles + strHtmls.join('')

    updateStats()
}

//event handler for when a book is added by user
function onAddBook(ev) {
    ev.preventDefault()
    const elInput = document.querySelector('.new-book input')

    const valueArr = elInput.value.split(',')

    if (valueArr.length < 3) {
        alert('Error, Please check your input')
        return
    }

    addBook(elInput)
    renderBooks()

    elInput.value = ''

    showMsg('add')
}

//event handler for when a book is removed by user
function onRemoveBook(ev, bookId) {
    ev.stopPropagation()

    removeBook(bookId)
    renderBooks()

    showMsg('remove')
}

//event handler for when a book price is updated by user
function onUpdateBook(bookId) {
    const newPrice = prompt('Please enter a new price: ')

    updateBook(bookId, newPrice)
    renderBooks()

    showMsg('update')
}

//event handler for when the details button was clicked 
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

//event handler for when an input is typed in the search bar - assign value to gFilterBy - an argument for getBooks() to render the filtered books only
function onLookupTitle(ev, elValue) {
    ev.preventDefault()
    ev.stopPropagation()

    gFilterBy = elValue.value

    renderBooks()
}

//event handler for clearing the filter and the search bar
function onClearSearch(ev, elValue) {
    ev.stopPropagation()
    ev.preventDefault()

    const searchInput = document.querySelector(".search-input")

    gFilterBy = ''

    renderBooks()

    searchInput.value = ''
}

//switch case for different msg types
function showMsg(type) {
    const elMsg = document.querySelector("p")
    elMsg.classList = ''

    switch (type) {
        case 'add':
            elMsg.innerText = "Book Added Successfully"
            elMsg.classList.add('green-msg')

            break;
        case 'remove':
            elMsg.innerText = "Book Removed Successfully"
            elMsg.classList.add('red-msg')

            break;
        case 'update':
            elMsg.innerText = "Book Updated Successfully"
            elMsg.classList.add('green-msg')

            break;
    }

    setTimeout(() => {
        elMsg.innerText = ''
        elMsg.classList = ''
    }, 2000)
}

function updateStats() {
    const stats = getStats()
    const elExp = document.querySelector(".expensive-books")
    const elCheap = document.querySelector(".cheap-books")
    const elAvg = document.querySelector(".avg-books")

    elExp.innerText = stats.expensive
    elCheap.innerText = stats.cheap
    elAvg.innerText = stats.average
}