class Giphy {
    constructor(url, key) {
        this.url = url;
        this.apiKey = "api_key=" + key;
    }
    // SUGERIDOS
    async gifDailySuggested (){ 
       let fetch= await fetch(this.url +'/gifs/categories?'+ this.apiKey);

       let dailySuggested = await res.json();

        return dailySuggested;
    }

};

export default Giphy;