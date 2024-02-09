
'use strict'
const gQueryOptions = {
    filterBy: { title: '', rating: 0 },
    sortBy: {},
    page: { idx: 0, size: 10 }
}

var gEditedBook = null

function onInit() {
    //do we have storage or render the demo data?

    getBooks()
    renderBooks()
    updateStats()
    console.log('gBooks:', gBooks)
}

function renderBooks() {
    const elBooksList = document.querySelector('.book-list')
    //do we have a filter? if not return gBooks all
    const books = getBooks(gQueryOptions)

    const titles = `<tr><th>Title</th><th>Author</th><th>Rating</th>
        <th>Price</th><th>Actions</th></tr>`

    const emptyMsg = `<td colspan="5">No matching books were found...</td>`

    if (books.length === 0) {
        return elBooksList.innerHTML = titles + emptyMsg
    }

    //build the DOM structure of the list
    const strHtmls = books.map(book => `<tr>
        <td>${book.name}</td>
        <td>${book.author}</td>
        <td>${'⭐️'.repeat(book.rating)}</td>
        <td>${book.price}</td>
        <td><button class="read" onclick="onReadBook('${book.id}')">Read</button>
        <button class="update" onclick="openEditModal('${book.id}')">Update</button>
        <button class="delete" onclick="onRemoveBook(event,'${book.id}')">Delete</button></td>
        </tr>`)

    elBooksList.innerHTML = titles + strHtmls.join('')

    updateStats()
}

//event handler for when a book is added by user
function onEditBook() {
    const elModal = document.querySelector('.edit-book')
    const elH3 = document.querySelector('.edit-book h3')

    const elRating = document.querySelector('.edit-rating')
    const rating = +elRating.getAttribute('data-value')
    const name = document.querySelector('.edit-title').value
    const author = document.querySelector('.edit-author').value
    const price = document.querySelector('.edit-price').value

    if (gEditedBook) {
        gEditedBook.name = name
        gEditedBook.rating = rating
        gEditedBook.author = author
        gEditedBook.price = price

        console.log('gEditedBook:', gEditedBook)

        updateBook(gEditedBook)
        closeModal()
        showMsg('edit')
        renderBooks()
        return gEditedBook
    }


    const book = {
        name,
        author,
        rating,
        price,
    }

    addBook(book)
    closeModal()
    showMsg('add')
    renderBooks()
    return book
}
// function onAddBook(ev) {
//     ev.preventDefault()
//     const elInput = document.querySelector('.new-book input')

//     const valueArr = elInput.value.split(',')

//     if (valueArr.length < 3) {
//         alert('Error, Please check your input')
//         return
//     }

//     addBook(elInput)
//     renderBooks()

//     elInput.value = ''

//     showMsg('add')
// }

//event handler for when a book is removed by user

function onRemoveBook(ev, bookId) {
    ev.stopPropagation()

    removeBook(bookId)
    renderBooks()

    showMsg('remove')
}

//event handler for when a book price is updated by user
function onUpdateBook(bookId) {
    const elModal = document.querySelector('.edit-book')
    const elH3 = document.querySelector('.edit-book h3')

    elH3.innerText = 'Edit Book'
    elModal.classList.remove('hidden')


    // updateBook(bookId, newPrice)
    // renderBooks()

    // showMsg('update')
}

//event handler for when the details button was clicked 
function onReadBook(BookId) {
    const elModal = document.querySelector('.book-details')
    const elTitle = elModal.querySelector('h2 span')
    const elAuthor = elModal.querySelector('h3 span')
    const elRating = elModal.querySelector('h4 span')
    const elPre = elModal.querySelector('pre')

    const book = readBook(BookId)

    elTitle.innerText = book.name
    elAuthor.innerText = book.author
    elRating.innerText = '⭐️'.repeat(book.rating)
    elPre.innerHTML = book.imgURL

    elModal.showModal()
}

//event handler for when an input is typed in the search bar - assign value to gFilterBy - an argument for getBooks() to render the filtered books only
function onLookupTitle(ev, elValue) {
    ev.preventDefault()
    ev.stopPropagation()

    gQueryOptions.filterBy.title = elValue.value

    renderBooks()
}

//event handler for clearing the filter and the search bar
function onClearFilters() {
    const searchInput = document.querySelector(".search-input")
    const elRatingFilter = document.querySelector(".filters input")
    const elAscending = document.querySelector('.ascending')
    const elDescending = document.querySelector('.descending')
    const elSortBy = document.querySelector('.sort-by')


    gQueryOptions.filterBy = {
        title: '',
        rating: 0
    }

    gQueryOptions.sortBy = {}

    searchInput.value = ''
    elRatingFilter.value = ''
    elAscending.checked = false
    elDescending.checked = false
    elSortBy.selectedIndex = 0

    renderBooks()
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

function onFilterRating(elInput) {
    const rating = elInput.value
    elInput.title = rating

    gQueryOptions.filterBy.rating = rating

    renderBooks()
}

function onSortBy(elOption) {
    const elAscending = document.querySelector('.ascending')
    const elDescending = document.querySelector('.descending')

    gQueryOptions.sortBy[elOption.value] = elDescending.checked ? -1 : 1

    renderBooks()
}

function onCheckAscending(el) {
    const elDescending = document.querySelector('.descending')
    const elOption = document.querySelector('.sort-by')


    elDescending.checked = false

    gQueryOptions.sortBy[elOption.value] = elDescending.checked ? -1 : 1


    renderBooks()
}

function onCheckDescending(el) {
    const elAscending = document.querySelector('.ascending')
    const elOption = document.querySelector('.sort-by')

    elAscending.checked = false

    gQueryOptions.sortBy[elOption.value] = el.checked ? -1 : 1

    renderBooks()
}

function onPrevPage() {
    var booksCount = getBooksCount(gQueryOptions)

    if (gQueryOptions.page.idx > 0) gQueryOptions.page.idx--
    else gQueryOptions.page.idx = Math.floor(booksCount / ((gQueryOptions.page.idx + 1) * gQueryOptions.page.size))

    renderBooks()
}

function onNextPage() {
    var booksCount = getBooksCount(gQueryOptions)

    if (booksCount > ((gQueryOptions.page.idx + 1) * gQueryOptions.page.size)) gQueryOptions.page.idx++
    else gQueryOptions.page.idx = 0

    renderBooks()
}

function onEditRating(event, btn) {
    event.preventDefault()

    const editRatingElement = document.querySelector('.edit-rating')
    const elBtnValue = +btn.value
    var dataValue = +editRatingElement.getAttribute('data-value')
    var spanCurrValue = dataValue

    if (spanCurrValue === 5 && elBtnValue === 1) {
        return editRatingElement.innerText = '⭐️'.repeat(5)
    } else if (spanCurrValue === 1 && elBtnValue === -1) {
        return editRatingElement.innerText = '⭐️'.repeat(1)
    }

    editRatingElement.setAttribute('data-value', dataValue += elBtnValue)
    editRatingElement.innerText = '⭐️'.repeat(spanCurrValue += elBtnValue)
}

function openEditModal(bookID) {
    const elH3 = document.querySelector('.edit-book h3')
    const elModal = document.querySelector('.edit-book')

    elH3.innerText = 'Edit Book'
    elModal.classList.remove('hidden')
    gEditedBook = {}
    gEditedBook.id = bookID
}

// function openEditModal(bookID) {
//     const elH3 = document.querySelector('.edit-book h3')
//     const elModal = document.querySelector('.edit-book')

//     if(bookID) {
//         elH3.innerText = 'Edit Book'
//         elModal.classList.remove('hidden')
//         console.log('book id:',bookID)
//         gEditedBook = {}
//         gEditedBook.id = bookID
//         return
//     }

//     elH3.innerText = 'Add Book'

//     elModal.classList.remove('hidden')
// }

function openAddModal(ev) {
    ev.stopPropagation()
    ev.preventDefault()
    const elH3 = document.querySelector('.edit-book h3')
    const elModal = document.querySelector('.edit-book')

    elH3.innerText = 'Add Book'

    elModal.classList.remove('hidden')
}

function closeModal() {
    const elModal = document.querySelector('.edit-book')
    const elForm = document.querySelector('.edit-form')

    elModal.classList.add('hidden')
    elForm.reset()

    gEditedBook = null
}
