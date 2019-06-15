import { Component, OnInit } from '@angular/core';

import {StoreItem} from 'src/app/classes/storeItem';
import {StoreService} from 'src/app/services/store.service';
import {SearchComponent} from './search/search.component';

/* import 
-shopItem
-ShopService
*/

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.scss']
})
export class ShopPageComponent implements OnInit {

  items: StoreItem[] = [];

  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.getStoreItems();
  }

  getStoreItems(): void {
    this.storeService.getItems()
      .subscribe(items => this.items = items);
  }

}
