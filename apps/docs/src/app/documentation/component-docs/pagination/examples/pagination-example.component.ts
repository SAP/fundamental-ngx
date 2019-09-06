import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaginationComponent } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-pagination-example',
    template: `
        <fd-pagination [totalItems]="totalItems" (pageChangeStart)="newPageClicked($event)" 
                       [itemsPerPage]="itemsPerPage"
                       [currentPage]="currentPage"></fd-pagination>
        <br/><br/>
        <button fd-button (click)="goToPage1()">Go to page 1</button>`
})
export class PaginationExampleComponent {
    totalItems = 50;
    itemsPerPage = 10;
    currentPage = 3;

    @ViewChild(PaginationComponent) paginationComponent: PaginationComponent;

    newPageClicked(event) {
        this.http.get('assets/pagination-data.json').subscribe(data => {
            /*
             update the currentPage when the http action is successful
             */
            this.currentPage = event;
            console.log('page change success!');
        }, error => {
            /*
             do not update the currentPage when the http action fails
             */
            console.log('page change error!');
        }, () => {
            alert('New page selected: ' + this.currentPage);
        });
    }

    goToPage1() {
        this.paginationComponent.goToPage(1);
    }

    constructor(private http: HttpClient) {
    }
}
