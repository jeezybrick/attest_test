import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  @Output() filterTextChanged = new EventEmitter<string>();
  searchString = '';

  constructor() { }

  ngOnInit() {
  }

  public onFilterTextChanged(): void {
    this.filterTextChanged.emit(this.searchString);
  }

}
