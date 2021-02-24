import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MessageToastService, VariantManagementComponent, View } from '@fundamental-ngx/core';

interface ExampleRow {
    column1: any,
    column2?: any,
    column3?: any,
    date?: any,
    type?: any
}
@Component({
    selector: 'fd-variant-management-example',
    templateUrl: './variant-management-example.component.html'
})
export class VariantManagementExampleComponent implements OnInit {
    tableRows: ExampleRow[];
    displayedRows: ExampleRow[] = [];
    activeView: View;
    views: View[];
    @ViewChildren(VariantManagementComponent) viewManagers: QueryList<VariantManagementComponent>;

    constructor (public messageToastService: MessageToastService) {}

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

        this.activeView = {...this.views[0]};

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

    manageViews(views: View[]): void {
        this.views = views.slice();
        if (!this.views.some(v => v.id === this.activeView.id)) {
            this.selectView(Object.assign({}, this.views[0]));
        }

        this.messageToastService.open('Views were updated!', {
            duration: 1000
        });
    }

    selectView(view: View): void {
        this.activeView = this.views.find(({ id }) => id === view.id);
        this.filterRows();
    }

    filterColumn(columnName: string, value: string): void {
        this.activeView.settings[columnName].filterVal = value;
        this.updateViewsDueCurrent();

        this.filterRows();
    }

    saveView(data: { view: View; autoApply: boolean; }): void {
        data.view.createdBy = 'Self';
        this.views = [...this.views, data.view];

        let content = 'View was added!';
        if (data.autoApply) {
            this.selectView(data.view);
            content = 'View was added and applied!';
        }

        this.messageToastService.open(content, {
            duration: 1000
        });
    }
    
    updateView(updatedView: View): void {
        this.views = this.views.map(view => {
            if (view.id === updatedView.id) {
                return updatedView;
            }

            return view;
        });
        this.activeView = {...updatedView};
        this.messageToastService.open('View was updated', {
            duration: 1000
        });
    }

    updateViewsDueCurrent(): void {
        this.viewManagers.forEach(viewManager => {
            viewManager?.updateDraftView(this.activeView);
        })
    }

    private filterRows(): void {
        const keys = Object.keys(this.activeView.settings).filter(key => !!this.activeView.settings[key].filterVal);
        this.displayedRows = this.tableRows.filter(row => {
            const flag = keys.every(key => {
                const str = this.activeView.settings[key].filterVal.toLocaleLowerCase();
                return row[key].toLocaleLowerCase().includes(str);
            });

            return keys.length ? flag : true;
        });
    }
}
