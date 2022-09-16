import { Component, ViewChild } from '@angular/core';
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { PaginationComponent } from '@fundamental-ngx/core/pagination';

@Component({
    selector: 'fd-pagination-example',
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
                },
                () => {
                    /* do not update the currentPage when the http action fails */
                    this.notification = 'page change error!';
                },
                () => {
                    this.notification = 'New page selected: ' + this.currentPage;
                }
            );
    }

    goToPage(page: number): void {
        this.paginationComponent.goToPage(page);
    }
}
