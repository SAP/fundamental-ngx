import { Component } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

const ITEMS_AMOUNT_ON_LOAD = 5;

@Component({
    selector: 'fd-list-infinite-scroll-example',
    templateUrl: './list-infinite-scroll-example.component.html'
})
export class ListInfiniteScrollExampleComponent {
    // List that is displayed to the user
    items = new Array(10).fill('Initially shown items');

    loading = false;

    loadMore(): void {
        this.loading = true;
        of(this._getNewItems())
            .pipe(delay(2000))
            .subscribe((result) => {
                this.items = this.items.concat(result);
                this.loading = false;
            });
    }

    scrollHandler(): void {
        if (!this.loading) {
            this.loadMore();
        }
    }

    private _getNewItems(): string[] {
        let index = this.items.length;

        return Array(ITEMS_AMOUNT_ON_LOAD)
            .fill(undefined)
            .map(() => `Element ${index++}`);
    }
}
