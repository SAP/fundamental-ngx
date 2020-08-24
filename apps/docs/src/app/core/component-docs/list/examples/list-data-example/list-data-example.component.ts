import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fd-list-data-example',
  templateUrl: './list-data-example.component.html',
  styleUrls: ['./list-data-example.component.scss']
})
export class ListDataExampleComponent implements OnInit {
    items = [
        'Apple',
        'Banana',
        'Orange',
        'Pineapple',
        'Strawberry'
    ];

    ascendingSort = true;

    displayedItems = [];

    searchTerm = '';

    ngOnInit(): void {
        this.handleSearchTermChange('');
    }

    removeItem(index: number): void {
        this.displayedItems.splice(index, 1);
    }

    handleSearchTermChange(searchTerm: string): void {
        this.searchTerm = searchTerm;
        this.displayedItems = this.items.filter(item => item.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
    }

    changeSort(ascending: boolean): void {
        this.ascendingSort = ascending;
    }
}
