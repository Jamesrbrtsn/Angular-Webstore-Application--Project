import { Component, OnInit } from '@angular/core';

import {StoreItem} from 'src/app/classes/storeItem';


import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { StoreService } from 'src/app/services/store.service';


@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {

  item: StoreItem;

  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getItem();
  }

  getItem(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.storeService.getItem(id)
        .subscribe(item => this.item = item);
  }

  goBack(): void {
    this.location.back();
  }

}
