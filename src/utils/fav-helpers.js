export const toggleFavourite = (item) => {
    const myStorage = window.localStorage;
    const KEY = 'favourites';

    let favourites = myStorage.getItem(KEY);

    if( !favourites ){
        favourites = '[]'; 
    }
    
    let array = JSON.parse(favourites);

    if( favourites.indexOf(item) > -1 ){
        for(var i = array.length - 1; i >= 0; i--) {
            if(array[i] === item) {
                array.splice(i, 1);
            }
        }
    }

    else{
        array.push(item);
    }
    window.localStorage.setItem(KEY, JSON.stringify(array));
}

export const getFavourites = () => {
    const KEY = 'favourites';
    let favourites = window.localStorage.getItem(KEY);
    return favourites;
}

export const isFavourite = (item) => {
    const KEY = 'favourites';
    let favourites = window.localStorage.getItem(KEY);
    let array = JSON.parse(favourites);

    console.log(`Checking if ${item} is in ${array}`);

    return array.indexOf(item) > -1;
}