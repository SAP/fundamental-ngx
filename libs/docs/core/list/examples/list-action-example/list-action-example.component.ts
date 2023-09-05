import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BusyIndicatorComponent } from '@fundamental-ngx/core/busy-indicator';
import { ListModule } from '@fundamental-ngx/core/list';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
    selector: 'fd-list-action-example',
    templateUrl: './list-action-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ListModule, NgFor, BusyIndicatorComponent]
})
export class ListActionExampleComponent {
    readonly ITEMS_AMOUNT_ON_LOAD = 5;

    loading = false;

    items = [1, 2, 3, 4, 5];

    private readonly _destroyRef = inject(DestroyRef);
    private readonly _cdr = inject(ChangeDetectorRef);

    loadMore(): void {
        this.loading = true;

        of(this._getNewItems())
            .pipe(delay(2000), takeUntilDestroyed(this._destroyRef))
            .subscribe((result) => {
                this.items = this.items.concat(result);
                this.loading = false;
                this._cdr.detectChanges();
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
