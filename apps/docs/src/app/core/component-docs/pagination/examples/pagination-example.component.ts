import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, delay } from 'rxjs/operators';
import { PaginationComponent } from '@fundamental-ngx/core/pagination';

@Component({
    selector: 'fd-pagination-example',
    template: ` <fd-pagination
            [displayTotalItems]="false"
            [totalItems]="totalItems"
            (pageChangeStart)="newPageClicked($event)"
            [currentPage]="currentPage"
        ></fd-pagination>
        <br /><br />
        <button fd-button label="Go to page 1" (click)="goToPage(1)"></button>
        <div *ngIf="notification">{{ notification }}</div>
        `
})
export class PaginationExampleComponent {
    totalItems = 50;
    itemsPerPage = 10;
    currentPage = 5;
    notification: string = null;

    @ViewChild(PaginationComponent) paginationComponent: PaginationComponent;

    newPageClicked(event: number): void {
        this.http.get('assets/pagination-data.json').pipe(
            tap(() => {
                this.notification = 'loading...';
            }),
            delay(100),
        ).subscribe(
            (data) => {
                /* update the currentPage when the http action is successful */
                this.currentPage = event;
                this.notification = 'page change success!';
            },
            (error) => {
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

    constructor(private http: HttpClient) {}
}
