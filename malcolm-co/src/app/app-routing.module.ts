// ng g module app-routing --flat --module=app

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Router Functionality
import {RouterModule, Routes} from '@angular/router';

// Component Links
import {ShopPageComponent} from './components/shop-page/shop-page.component';
import {ManagerControlPageComponent} from './components/manager-control-page/manager-control-page.component';
import {PolicyPageComponent} from './components/policy-page/policy-page.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'shop', component: ShopPageComponent },
  { path: 'manager-control-page', component: ManagerControlPageComponent },
  { path: 'policies', component: PolicyPageComponent },
  { path: '', redirectTo: '/shop', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },

 // TO ADD
 // { path: 'login', component:  },
 // { path: 'account/:id', component:  },
 // { path: 'account', component:  },

  // { path: '', component:  },
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
