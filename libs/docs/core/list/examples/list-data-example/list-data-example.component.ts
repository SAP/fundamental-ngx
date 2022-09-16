import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'fd-list-data-example',
    templateUrl: './list-data-example.component.html',
    styleUrls: ['./list-data-example.component.scss']
})
export class ListDataExampleComponent implements OnInit {
    items = ['Apple', 'Banana', 'Orange', 'Pineapple', 'Strawberry'];

    ascendingSort = true;

    displayedItems: string[] = [];

    searchTerm = '';

    constructor(private liveAnnouncer: LiveAnnouncer) {}

    ngOnInit(): void {
        this.handleSearchTermChange('');
    }

    removeItem(index: number): void {
        const allValuesIndex = this.items.indexOf(this.displayedItems[index]);
        this.items.splice(allValuesIndex, 1);
        this.displayedItems.splice(index, 1);
    }

    handleSearchTermChange(searchTerm: string): void {
        this.searchTerm = searchTerm;
        this.displayedItems = this.items.filter((item) =>
            item.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
        );
    }

    changeSort(ascending: boolean): void {
        this.ascendingSort = ascending;
        this.liveAnnouncer.clear();
        this.liveAnnouncer.announce(ascending ? 'ascending' : 'descending', 'assertive');
    }
}
