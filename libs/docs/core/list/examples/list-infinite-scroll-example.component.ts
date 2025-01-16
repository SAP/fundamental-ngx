import { LiveAnnouncer } from '@angular/cdk/a11y';

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BusyIndicatorComponent } from '@fundamental-ngx/core/busy-indicator';
import { InfiniteScrollModule } from '@fundamental-ngx/core/infinite-scroll';
import { ListModule } from '@fundamental-ngx/core/list';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

const ITEMS_AMOUNT_ON_LOAD = 5;

@Component({
    selector: 'fd-list-infinite-scroll-example',
    templateUrl: './list-infinite-scroll-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [BusyIndicatorComponent, ListModule, InfiniteScrollModule]
})
export class ListInfiniteScrollExampleComponent {
    // List that is displayed to the user
    items = new Array(10).fill('Initially shown items');

    loading = false;

    constructor(
        private liveAnnouncer: LiveAnnouncer,
        private readonly _destroyRef: DestroyRef,
        private readonly _cdr: ChangeDetectorRef
    ) {}

    loadMore(): void {
        this.loading = true;
        this.liveAnnouncer.announce('Loading', 'assertive');
        of(this._getNewItems())
            .pipe(delay(2000), takeUntilDestroyed(this._destroyRef))
            .subscribe((result) => {
                this.items = this.items.concat(result);
                this.loading = false;
                this.liveAnnouncer.clear();
                this._cdr.detectChanges();
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
