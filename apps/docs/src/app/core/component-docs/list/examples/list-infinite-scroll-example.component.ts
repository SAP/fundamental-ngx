import { Component } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
    selector: 'fd-list-infinite-scroll-example',
    templateUrl: './list-infinite-scroll-example.component.html'
})
export class ListInfiniteScrollExampleComponent {
    readonly ITEMS_AMOUNT_ON_LOAD = 5;

    // List that is displayed to the user
    items = [
        'Initially shown element',
        'Initially shown element',
        'Initially shown element',
        'Initially shown element',
        'Initially shown element',
        'Initially shown element',
        'Initially shown element',
        'Initially shown element',
        'Initially shown element',
        'Initially shown element'
    ];

    loading = false;

    loadMore(): void {
        this.loading = true;
        of(this._getNewItems())
            .pipe(
                delay(2000)
            )
            .subscribe(result => {
                this.items = this.items.concat(result);
                this.loading = false;
            })
        ;
    }

    scrollHandler(): void {
        if (!this.loading) {
            this.loadMore();
        }
    }

    private _getNewItems(): string[] {
        const lastItemIndex = this.items.length;
        const items = [];
        for (let i = lastItemIndex; i < lastItemIndex + this.ITEMS_AMOUNT_ON_LOAD; ++i) {
            items.push('Element' + i);
        }
        return items;
    }
}
