import { Component } from '@angular/core';
import { DestroyedService } from '@fundamental-ngx/cdk';
import { of } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'fd-list-action-example',
    templateUrl: './list-action-example.component.html',
    providers: [DestroyedService]
})
export class ListActionExampleComponent {
    readonly ITEMS_AMOUNT_ON_LOAD = 5;

    loading = false;

    items = [1, 2, 3, 4, 5];

    constructor(private readonly _destroy$: DestroyedService) {}

    loadMore(): void {
        this.loading = true;

        of(this._getNewItems())
            .pipe(delay(2000), takeUntil(this._destroy$))
            .subscribe((result) => {
                this.items = this.items.concat(result);
                this.loading = false;
            });
    }

    _getNewItems(): number[] {
        const lastItem = this._lastItem();
        const items: number[] = [];
        for (let i = lastItem; i < lastItem + this.ITEMS_AMOUNT_ON_LOAD; ++i) {
            items.push(i);
        }
        return items;
    }

    private _lastItem(): number {
        return this.items[this.items.length - 1];
    }
}
