import { Component, OnInit } from '@angular/core';
import { View } from '@fundamental-ngx/core';

interface ExampleRow {
    column1: any,
    column2?: any,
    column3?: any,
    date?: any,
    type?: any
}
@Component({
    selector: 'fd-variant-management-header-size-example',
    templateUrl: './variant-management-header-size-example.component.html'
})
export class VariantManagementHeaderSizeExampleComponent implements OnInit {
    tableRows: ExampleRow[];
    displayedRows: ExampleRow[] = [];
    activeView: View;
    views: View[];

    ngOnInit(): void {
        this.views = [
            {
                id: '1',
                favorite: true,
                name: 'Standard',
                access: 'private',
                default: true,
                readonly: true,
                createdBy: 'SAP',
                settings: {
                    column1: {
                        filterVal: '',
                        ascending: true
                    }
                }
            },
            {
                id: '2',
                favorite: false,
                name: '2 View',
                access: 'public',
                default: false,
                createdBy: 'Self',
                settings: {
                    column1: {
                        ascending: false
                    },
                    column2: {
                        filterVal: 'sa'
                    }
                }
            },
            {
                id: '3',
                favorite: false,
                name: '3 View',
                access: 'private',
                default: false,
                createdBy: 'Someone',
                settings: {
                    column1: {
                        filterVal: 'an'
                    }
                }
            }
        ];

        this.activeView = this.views[0];

        this.tableRows = [
            {
                column1: 'Analyst',
                column2: 'Auto Loan Account',
                column3: 'Row 1',
                date: '09-07-18',
                type: 'search'
            },
            {
                column1: 'Consultant',
                column2: 'Checking Account',
                column3: 'Row 2',
                date: '09-07-18',
                type: 'search'
            },
            {
                column1: 'Representative',
                column2: 'Investment Account',
                column3: 'Row 3',
                date: '09-07-18',
                type: 'search'
            },
            {
                column1: 'Architect',
                column2: 'Savings Account',
                column3: 'Row 4',
                date: '09-07-18',
                type: 'search'
            },
            {
                column1: 'Developer',
                column2: 'Credit Card Account',
                column3: 'Row 5',
                date: '09-07-18',
                type: 'search'
            },
            {
                column1: 'Supervisor',
                column2: 'Savings Account',
                column3: 'Row 6',
                date: '09-07-18',
                type: 'cart'
            },
            {
                column1: 'Manager',
                column2: 'Checking Account',
                column3: 'Row 7',
                date: '09-07-18',
                type: 'calendar'
            },
            {
                column1: 'Director',
                column2: 'Money Market Account',
                column3: 'Row 8',
                date: '09-07-18',
                type: 'search'
            },
            {
                column1: 'Administrator',
                column2: 'Investment Account',
                column3: 'Row 10',
                date: '09-07-18',
                type: 'search'
            }
        ];

        this.displayedRows = this.tableRows.slice();
    }
}
