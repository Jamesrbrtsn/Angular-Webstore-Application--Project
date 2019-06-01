import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ManagerControlPageComponent } from './components/manager-control-page/manager-control-page.component';
import { ShopPageComponent } from './components/shop-page/shop-page.component';
import { PolicyPageComponent } from './components/policy-page/policy-page.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    PageNotFoundComponent,
    ManagerControlPageComponent,
    ShopPageComponent,
    PolicyPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
