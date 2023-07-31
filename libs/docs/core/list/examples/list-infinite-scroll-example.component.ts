import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { of } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DestroyedService } from '@fundamental-ngx/cdk/utils';

const ITEMS_AMOUNT_ON_LOAD = 5;

@Component({
    selector: 'fd-list-infinite-scroll-example',
    templateUrl: './list-infinite-scroll-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyedService]
})
export class ListInfiniteScrollExampleComponent {
    // List that is displayed to the user
    items = new Array(10).fill('Initially shown items');

    loading = false;

    constructor(
        private liveAnnouncer: LiveAnnouncer,
        private readonly _destroy$: DestroyedService,
        private readonly _cdr: ChangeDetectorRef
    ) {}

    loadMore(): void {
        this.loading = true;
        this.liveAnnouncer.announce('Loading', 'assertive');
        of(this._getNewItems())
            .pipe(delay(2000), takeUntil(this._destroy$))
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
