document.addEventListener('DOMContentLoaded', function() {
    const bookForm = document.getElementById('form');
    const searchBookByTitle = document.getElementById('search-button');
    bookForm.addEventListener('submit', function(e) {
        e.preventDefault();
        addBook();
    })
    searchBookByTitle.addEventListener('click', function() {
        filterBook();
    })
    if(isStorageExist()) {
        loadData();
    }
})

document.addEventListener('ondatasaved', function() {
    console.log('data has been save successfully');
})

document.addEventListener('onloaddata', function() {
    refreshData();
})