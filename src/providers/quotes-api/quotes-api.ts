import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


/*
  Generated class for the QuotesApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QuotesApiProvider {

  favoriteQuotes = [];
  constructor(private http: HttpClient) {}

 getItems(){
  return new Promise(resolve => {
      this.http.get('assets/data.json')
        .subscribe(res => resolve(res));
  });
}

getFavorites() {
return this.favoriteQuotes;
}

addToFavorites(quote) {
let isQuoteAdded = this.favoriteQuotes.findIndex((favQuote) => {
    return quote.id === favQuote.id
  });
 if (isQuoteAdded === -1) {
  this.favoriteQuotes.push(quote)
}
}
}
