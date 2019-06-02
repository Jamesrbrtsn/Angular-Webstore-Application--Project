import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ManagerControlPageComponent } from './components/manager-control-page/manager-control-page.component';
import { ShopPageComponent } from './components/shop-page/shop-page.component';
import { PolicyPageComponent } from './components/policy-page/policy-page.component';

// mport Forms, contains list of external modules needed for the app
import {FormsModule} from '@angular/forms'; // --houses NgModel
import { StoreItemComponent } from './components/shop-page/store-item/store-item.component';
import { ItemDetailComponent } from './components/shop-page/item-detail/item-detail.component';
import { SearchComponent } from './components/shop-page/search/search.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    PageNotFoundComponent,
    ManagerControlPageComponent,
    ShopPageComponent,
    PolicyPageComponent,
    StoreItemComponent,
    ItemDetailComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
