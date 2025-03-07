let searchInputArray = [];
let searchInput = document.getElementById('search');

function erase() {
    searchInputArray = [];
}

function addToSearch(value) {
    let searchValue = document.getElementById('search').value;

    if ( searchValue === '') {
        searchInput.value = value;
        searchInputArray.push(value);
    }else{
        erase();
        searchInputArray.push(searchValue);
        searchInputArray.push(value);
    }
    searchInput.value = searchInputArray;
    
    console.log(searchInputArray); 
    console.log(typeof searchValue) 
}