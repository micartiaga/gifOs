class Giphy {
    constructor(url, key) {
        this.url = url;
        this.apiKey = "api_key=" + key;
    }
    // SUGERIDOS
    async gifDailySuggested() {
        let res = await fetch(this.url + '/gifs/categories?' + this.apiKey);
        let dailySuggested = await res.json();
       
        return dailySuggested;
    }

    //TRENDINGS
    async gifTrendings(offset){
        let res = await fetch(this.url + '/gifs/trending?' + this.apiKey + "&limit=25&offset="+ offset);
        let trendings = await res.json();
        return trendings;
    
    }

    // SEARCH

     async gifSearch(term, offset){
         let res = await fetch (this.url + 'gifs/search?' + this.apiKey + '&q='+ term + "&limit=25&offset=" + offset);


     }

};

export default Giphy;