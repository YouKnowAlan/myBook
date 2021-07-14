const TO_READ_LIST = 'toReadList';
const DONE_LIST = 'doneList';
const BOOK_ITEMID = 'itemId';
let isComplete;

const toReadList = document.getElementById(TO_READ_LIST);
const doneList = document.getElementById(DONE_LIST);
const body = document.body;

const checkIsComplete = () => {
    const bookDone = document.getElementById('flexCheckDefault').checked;
    if(bookDone === true) {
        isComplete = true
    } 
    if(bookDone === false) {
        isComplete = false;
    }
    console.log(isComplete, bookDone);
    return isComplete;
}

const makeBook = (bookTitleValue, bookWriterValue, bookYearValue, isComplete) => {
    const bookTitle = document.createElement('h4');
    bookTitle.classList.add('book-item-title');
    bookTitle.innerText = bookTitleValue;

    const bookWriter = document.createElement('p');
    bookWriter.classList.add('book-item-writer');
    bookWriter.innerText = bookWriterValue;

    const bookYear = document.createElement('p');
    bookYear.classList.add('book-item-year');
    bookYear.innerText = bookYearValue;

    const bookDetail = document.createElement('div');
    bookDetail.classList.add('bookDetail');
    bookDetail.append(bookTitle, bookWriter, bookYear);

    const iconWrapper = document.createElement('div');
    iconWrapper.classList.add('iconWrapper');
    if(isComplete === true) {
        iconWrapper.append(createUndoButton(), createRemoveButton());
    }
    if(isComplete === false) {
        iconWrapper.append(createDoneButton(), createRemoveButton());
    }

    
    const container = document.createElement('div');
    container.classList.add('bookItemWrapper');
    container.append(bookDetail, iconWrapper);

    return container;
}

const addBook = () => {
    const bookTitleValue = document.getElementById('bookTitle').value;
    const bookWriterValue = document.getElementById('bookWriter').value;
    const bookYearValue = document.getElementById('bookYear').value;

    checkIsComplete();

    const book = makeBook(bookTitleValue, bookWriterValue, bookYearValue, isComplete);
    const bookObject = composeBookObject(bookTitleValue, bookWriterValue, bookYearValue, isComplete);

    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);

    if(isComplete === true) {
        doneList.append(book)
        updateStorage();
    }

    if(isComplete === false) {
        toReadList.append(book);
        updateStorage();
    }

    showAlert('Book has been added successfully!');
}

const filterBook = () => {
    titleSearch = document.getElementById('search-bar').value;
    booksItem = document.querySelectorAll('.bookItemWrapper');
    booksTitle = document.querySelectorAll('.book-item-title');
    for(let i = 0; i < booksTitle.length; i++) {
        const title = booksTitle[i].innerText;
        const book = booksItem[i];

        if(!title.includes(titleSearch)) {
            book.style.display = 'none';
        } else {
            book.style.display = 'flex';
        }
    }
}

const removeBook = (bookItem) => {
    bookIndex = findBookIndex(bookItem[BOOK_ITEMID]);
    books.splice(bookIndex, 1);
    bookItem.remove();
    
    showAlert('Book has been removed successfully!');
    updateStorage();
}

const addToDoneRead = (bookItem) => {
    const bookTitle = document.querySelector('.bookDetail > .book-item-title').innerText;
    const bookWriter = document.querySelector('.bookDetail > .book-item-writer').innerText;
    const bookYear = document.querySelector('.bookDetail > .book-item-year').innerText;
    checkIsComplete();

    const doneRead = makeBook(bookTitle, bookWriter, bookYear, isComplete);
    const book = findBook(bookItem[BOOK_ITEMID]);
    book.isComplete = true;
    doneRead[BOOK_ITEMID] = book.id;

    doneList.append(doneRead);
    bookItem.remove();
    
    showAlert('Book has been move to Done Read!');
    updateStorage();
}

const undoToReadList = (bookItem) => {
    const bookTitle = document.querySelector('.bookDetail > .book-item-title').innerText;
    const bookWriter = document.querySelector('.bookDetail > .book-item-writer').innerText;
    const bookYear = document.querySelector('.bookDetail > .book-item-year').innerText;
    checkIsComplete();

    const toRead = makeBook(bookTitle, bookWriter, bookYear, isComplete);
    const book = findBook(bookItem[BOOK_ITEMID]);
    book.isComplete = false;
    toRead[BOOK_ITEMID] = book.id;

    toReadList.append(toRead);
    bookItem.remove();

    showAlert('book has been move into To Read!');
    updateStorage();

}

const refreshData = () => {
    books.map(book => {
        const newBook = makeBook(book.title, book.writer, book.year, book.isComplete);
        newBook[BOOK_ITEMID] = book.id;
        if(book.isComplete) {
            doneList.append(newBook);
        } else {
            toReadList.append(newBook);
        }
    })
}

const createButton = (buttonTypeClass, eventListener) => {
    const button = document.createElement('button');
    button.classList.add(buttonTypeClass);
    button.addEventListener('click', function(e) {
        eventListener(e)
    })
    
    return button;
}

const createDoneButton = () => {
    return createButton('done-button', function(e) {
        addToDoneRead(e.target.parentElement.parentElement);
    })
}

const createRemoveButton = () => {
    return createButton('trash-button', function(e) {
        removeBook(e.target.parentElement.parentElement);
    })
}

const createUndoButton = () => {
    return createButton('undo-button', function(e) {
        undoToReadList(e.target.parentElement.parentElement);
    })
}

const createAlert = (alertInnerText) => {
    const alertContainer = document.createElement('div');
    alertContainer.classList.add('alert-container', 'fixed-bottom');
    const alertText = document.createElement('strong');
    alertText.classList.add('alert-text');
    alertText.innerText = alertInnerText;

    alertContainer.append(alertText);
    
    return alertContainer;
}

const showAlert = (alertInnerText) => {
    const alertComponent = createAlert(alertInnerText)
    body.prepend(alertComponent);
    setTimeout(() => {
        alertComponent.remove();
    }, 1500);
}




