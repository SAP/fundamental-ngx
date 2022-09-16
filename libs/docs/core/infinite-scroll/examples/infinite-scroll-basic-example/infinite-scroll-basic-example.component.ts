import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'fd-infinite-scroll-basic-example',
    templateUrl: './infinite-scroll-basic-example.component.html'
})
export class InfiniteScrollBasicExampleComponent implements OnInit {
    // List that is displayed to the user
    displayedElements: Item[] = [
        { label: 'Initially shown element' },
        { label: 'Initially shown element' },
        { label: 'Initially shown element' },
        { label: 'Initially shown element' },
        { label: 'Initially shown element' }
    ];

    // Data to add. Can also come from an observable, service...
    // Can also be concatenated directly to displayedElements.
    // Here it comes from the generateArray() method.
    data: Item[] = [];

    // Used to emulate paging in this static example
    private dataSelector = 0;
    private increment = 5;

    loadMoreElements(): void {
        if (this.dataSelector < this.data.length) {
            this.displayedElements = this.displayedElements.concat(
                this.data.slice(this.dataSelector, this.dataSelector + this.increment)
            );
            this.dataSelector += this.increment;
        }
    }

    ngOnInit(): void {
        this.generateArray(1000);
    }

    generateArray(size: number): void {
        for (let i = 0; i < size; ++i) {
            this.data.push({ label: 'New element number: ' + i });
        }
    }
}

interface Item {
    label: string;
}
