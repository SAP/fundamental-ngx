import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild, inject } from '@angular/core';
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { PaginationComponent } from '@fundamental-ngx/core/pagination';

@Component({
    selector: 'fd-pagination-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <fd-pagination
            [displayTotalItems]="false"
            [totalItems]="totalItems"
            (pageChangeStart)="newPageClicked($event)"
            [currentPage]="currentPage"
            ariaLabel="Basic pagination example"
        ></fd-pagination>

        <button fd-button label="Go to page 1" (click)="goToPage(1)"></button>

        <div *ngIf="notification">{{ notification }}</div>
    `
})
export class PaginationExampleComponent {
    totalItems = 50;
    itemsPerPage = 10;
    currentPage = 5;
    notification = '';

    @ViewChild(PaginationComponent) paginationComponent: PaginationComponent;

    private _cdr = inject(ChangeDetectorRef);

    newPageClicked(event: number): void {
        of(1)
            .pipe(
                tap(() => {
                    this.notification = 'loading...';
                }),
                delay(1000)
            )
            .subscribe(
                () => {
                    /* update the currentPage when the http action is successful */
                    this.currentPage = event;
                    this.notification = 'page change success!';
                    this._cdr.detectChanges();
                },
                () => {
                    /* do not update the currentPage when the http action fails */
                    this.notification = 'page change error!';
                    this._cdr.detectChanges();
                },
                () => {
                    this.notification = 'New page selected: ' + this.currentPage;
                    this._cdr.detectChanges();
                }
            );
    }

    goToPage(page: number): void {
        this.paginationComponent.goToPage(page);
    }
}
