import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { StoreItem } from 'src/app/classes/storeItem';
import { StoreService } from 'src/app/services/store.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {

  items$: Observable<StoreItem[]>;
  private searchTerms = new Subject<string>();


  constructor(private storeService: StoreService) { }

    // Push a search term into the observable stream.
  search(term: string): void {
      // -- console.log(term);
      this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.items$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.storeService.searchItems(term)),
    );
  }

}
