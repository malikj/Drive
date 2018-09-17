import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import { QuotesApiProvider } from "../../providers/quotes-api/quotes-api"

import { trigger, state, style, transition, animate, keyframes } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    trigger('bounce', [
      state('bouncing', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('* => bouncing', [
        animate('300ms ease-in', keyframes([
          style({transform: 'translate3d(0,0,0)', offset: 0}),
          style({transform: 'translate3d(0,-10px,0)', offset: 0.5}),
          style({transform: 'translate3d(0,0,0)', offset: 1})
        ]))
      ])
    ])
  ]
})

export class HomePage {
  fadeState: String = 'visible';
  bounceState: String = 'noBounce';

  quoteCollections: any;
  constructor( 
    private loadingController:LoadingController, 
    private quotesProvider: QuotesApiProvider){
  }

  ngOnInit() {
    // this also works
    // this.musicApiProvider.getItems().then(data => this.quoteCollections = data);
  }

  ionViewDidLoad() {
    let quotesLoadingController = this.loadingController.create( {
      content:"Getting data from server"
    });
    quotesLoadingController.present();

  this.quotesProvider.getItems().then((data) => {
    quotesLoadingController.dismiss()
    this.quoteCollections = data
  });
  }

  addToFavoritesLoading(quote) {
    this.fadeState = (this.fadeState == 'visible') ? 'invisible' : 'visible';
    let quotesLoadingController = this.loadingController.create( {
      content:"Adding Favorite"
    });
    quotesLoadingController.present();
    this.quotesProvider.addToFavorites(quote)
    quotesLoadingController.dismiss()
    }

  addToFavorites(quote) {
      this.bounceState = (this.bounceState == 'noBounce') ? 'bouncing' : 'noBounce';  
      this.quotesProvider.addToFavorites(quote)
    }

  shareQuote(quote) {
      this.bounceState = (this.bounceState == 'noBounce') ? 'bouncing' : 'noBounce';  
    }

}
