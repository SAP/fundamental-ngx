import { Component, OnInit, ViewChild } from '@angular/core';
import { FocusableGridDirective } from '@fundamental-ngx/cdk/utils';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { MenuComponent } from '@fundamental-ngx/core/menu';
import { PaginationModule } from '@fundamental-ngx/core/pagination';
import { TableModule } from '@fundamental-ngx/core/table';
import { ToolbarItemDirective } from '@fundamental-ngx/core/toolbar';

@Component({
    selector: 'fd-table-pagination-example',
    templateUrl: './table-pagination-example.component.html',
    imports: [FocusableGridDirective, TableModule, LinkComponent, IconComponent, PaginationModule, ToolbarItemDirective]
})
export class TablePaginationExampleComponent implements OnInit {
    @ViewChild('itemsPerPageMenu')
    itemsPerPageMenu: MenuComponent;

    tableRows: any[];
    displayedRows: any[];
    totalItems = 30;
    itemsPerPage = 5;
    currentPage = 3;
    itemsPerPageOptions: number[] = [3, 5, 10];

    newPageClicked(pageNumber: number): void {
        this.currentPage = pageNumber;
        const firstDisplayedRow = (pageNumber - 1) * this.itemsPerPage;
        this.displayedRows = this.tableRows.slice(firstDisplayedRow, firstDisplayedRow + this.itemsPerPage);
        if (this.itemsPerPageMenu) {
            this.itemsPerPageMenu.close();
        }
    }

    itemsPerPageChange(value: number): void {
        this.itemsPerPage = value;
        this.newPageClicked(this.currentPage);
    }

    ngOnInit(): void {
        this.tableRows = [
            {
                column1: 'Row 1',
                date: '09-07-18',
                type: 'search'
            },
            {
                column1: 'Row 2',
                date: '09-08-18',
                type: 'cart'
            },
            {
                column1: 'Row 3',
                date: '02-14-18',
                type: 'calendar'
            },
            {
                column1: 'Row 4',
                date: '12-30-17',
                type: 'search'
            },
            {
                column1: 'Row 5',
                date: '11-12-18',
                type: 'search'
            },
            {
                column1: 'Row 6',
                date: '09-07-18',
                type: 'search'
            },
            {
                column1: 'Row 7',
                date: '09-08-18',
                type: 'cart'
            },
            {
                column1: 'Row 8',
                date: '02-14-18',
                type: 'calendar'
            },
            {
                column1: 'Row 9',
                date: '12-30-17',
                type: 'search'
            },
            {
                column1: 'Row 10',
                date: '11-12-18',
                type: 'search'
            },
            {
                column1: 'Row 11',
                date: '09-07-18',
                type: 'search'
            },
            {
                column1: 'Row 12',
                date: '09-08-18',
                type: 'cart'
            },
            {
                column1: 'Row 13',
                date: '02-14-18',
                type: 'calendar'
            },
            {
                column1: 'Row 14',
                date: '12-30-17',
                type: 'search'
            },
            {
                column1: 'Row 15',
                date: '11-12-18',
                type: 'search'
            },
            {
                column1: 'Row 16',
                date: '09-07-18',
                type: 'search'
            },
            {
                column1: 'Row 17',
                date: '09-08-18',
                type: 'cart'
            },
            {
                column1: 'Row 18',
                date: '02-14-18',
                type: 'calendar'
            },
            {
                column1: 'Row 19',
                date: '12-30-17',
                type: 'search'
            },
            {
                column1: 'Row 20',
                date: '11-12-18',
                type: 'search'
            },
            {
                column1: 'Row 21',
                date: '09-07-18',
                type: 'search'
            },
            {
                column1: 'Row 21',
                date: '09-08-18',
                type: 'cart'
            },
            {
                column1: 'Row 23',
                date: '02-14-18',
                type: 'calendar'
            },
            {
                column1: 'Row 24',
                date: '12-30-17',
                type: 'search'
            },
            {
                column1: 'Row 25',
                date: '11-12-18',
                type: 'search'
            },
            {
                column1: 'Row 26',
                date: '11-12-18',
                type: 'search'
            },
            {
                column1: 'Row 27',
                date: '11-12-18',
                type: 'search'
            },
            {
                column1: 'Row 28',
                date: '11-12-20',
                type: 'search'
            },
            {
                column1: 'Row 29',
                date: '11-12-21',
                type: 'search'
            },
            {
                column1: 'Row 30',
                date: '11-12-22',
                type: 'search'
            }
        ];

        this.newPageClicked(3);
    }
}
