import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'fd-dropdown-infinite-scroll-example',
    templateUrl: './dropdown-infinite-scroll-example.component.html'
})
export class DropdownInfiniteScrollExampleComponent implements OnInit {

    // List that is displayed to the user
    displayedList = [
        {label: 'Initially shown element'},
        {label: 'Initially shown element'},
        {label: 'Initially shown element'},
        {label: 'Initially shown element'},
        {label: 'Initially shown element'}
    ];

    // Data to add. Can also come from an observable, service...
    // Here it comes from the generateArray() method
    data = [];

    // Used to emulate paging in this static example
    private dataSelector = 0;
    private increment = 5;

    // The scroll percent at which to load more elements
    scrollPercent = 80;

    loadMoreElements(): void {
        if (this.dataSelector < this.data.length) {
            this.displayedList = this.displayedList.concat(this.data.slice(this.dataSelector, this.dataSelector + this.increment));
            this.dataSelector += this.increment;
        }
    }

    ngOnInit(): void {
        this.generateArray(1000)
    }

    generateArray(size: number): void {
        for (let i = 0; i < size; ++i) {
            this.data.push({label: 'Element ' + i});
        }
    }
}
