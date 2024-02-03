
'use strict'

var gBooks = [
    {name: 'Black Fog', id: makeId(), author: 'Jane Air'},
    {name: 'Talisman', id: makeId(), author: 'Rondalfe'},
    {name: 'Banned', id: makeId(), author: 'Gilbert Zomakdin'}
]

function onInit() {
    console.log('hi')
}

function onSetFilterBy() {
    console.log('hi')
}

function onAddBook(ev) {
    ev.preventDefault()
    const elInput = document.querySelector('.new-book input')
    // const elBooksList = document.querySelector('book-list')

    var bookStr = elInput.value
    var bookNameAuthor = bookStr.split(',')
    var bookName  = bookNameAuthor[0]
    var author  = bookNameAuthor[1]

    const book = {name: bookName, id: makeId(), author: author}

    gBooks.unshift(book)

    elInput.value = ''
}


'use strict'


