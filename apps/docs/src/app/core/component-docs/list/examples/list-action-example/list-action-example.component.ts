import { Component } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
    selector: 'fd-list-action-example',
    templateUrl: './list-action-example.component.html'
})
export class ListActionExampleComponent {
    readonly ITEMS_AMOUNT_ON_LOAD = 5;

    loading = false;

    items = [1, 2, 3, 4, 5];

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

    _getNewItems(): number[] {
        const lastItem = this._lastItem();
        const items = [];
        for (let i = lastItem; i < lastItem + this.ITEMS_AMOUNT_ON_LOAD; ++i) {
            items.push(i);
        }
        return items;
    }

    private _lastItem(): number {
        return this.items[this.items.length - 1];
    }
}
