const STORAGE_KEY = 'MYBOOK';

let books = [];

const isStorageExist = () => {
    if(typeof(Storage) === undefined) {
        alert('Browser kamu tidak mendukung local storage');
        return false
    }

    return true;
}

const saveData = () => {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event('ondatasaved'));
}

const loadData = () => {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if(data !== null) 
        books = data;

    document.dispatchEvent(new Event('onloaddata'));
}

const updateStorage = () => {
    if(isStorageExist()) {
        saveData();
    }
}

const composeBookObject = (bookTitleValue, bookWriterValue, bookYearValue, isComplete) => {
    return {
        id: +new Date(),
        title: bookTitleValue,
        writer: bookWriterValue,
        year: bookYearValue,
        isComplete,
    }
}

const findBook = (bookId) => {
    for(book of books) {
        if(book.id === bookId) return book;
    }

    return null;
}

const findBookIndex = (bookId) => {
    let index = 0;
    books.map(book => {
        if(book.id === bookId) return index;
        index++;
    })

    return -1;
}

