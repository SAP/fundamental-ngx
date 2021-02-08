import { Component, OnInit, ViewChild } from '@angular/core';
import { VariantManagementComponent, View } from '@fundamental-ngx/core';

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
    displayedRows: ExampleRow[];

    currentView: View;

    views: View[];
    @ViewChild(VariantManagementComponent) viewManager: VariantManagementComponent;

    sortColumn1(): void {
        this.views = this.views.map(view => {
            if (view.id === this.currentView.id) {
                view.settings = this.currentView.settings;
            }
            return view;
        });
    }

    applyViewSettings(viewId: string): void {
        const viewToApply = this.views.find(view => view.id === viewId) || this.views.find(view => view.default);
        if (viewToApply) {
            this.currentView = viewToApply;
        }
    }
    
    saveView(updatedView: View): void {
        console.log(updatedView);

        const index = this.views.findIndex(v => v.id === updatedView.id)
        if (index !== -1) {
            this.views.splice(index, 1, updatedView);
        } else {
            this.views = [...this.views, updatedView];
        }
        
        // const updateExist = this.views
        //     .map(view => updatedViews
        //         .find(updatedView => view.id === updatedView.id))
        //     .filter(Boolean);

        // if (updateExist.length) {
        //     const updatedView = this.views.find(view => view.id === updatedViews[0].id);
        //     updatedView.settings = this.viewFilters;
        // } else {
        //     this.views.push({
        //         ...updatedViews[0],
        //         settings: this.viewFilters
        //     });
        // }
    }

    updateViewsDueCurrent(): void {
        this.views = this.views.map(view => {
            if (view.id === this.currentView.id) {
                view.settings = this.currentView.settings;
            }
            return view;
        });
    }

    manualUpdateViews(): void {
        // Randomize update for column1
        this.viewManager?.updateViews(this.views.map(view => {
            if (view.settings.column1) {
                view.settings.column1.filterVal = this.tableRows[0].column1.substring(0, Math.floor(Math.random() * this.tableRows[0].column1.length));
            }
            return view;
        }));
    }

    ngOnInit(): void {
        this.views = [
            {
                id: '1',
                favorite: true,
                name: 'Standard',
                access: 'private',
                default: true,
                readonly: true,
                autoApply: true,
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
                name: 'Second View',
                access: 'public',
                readonly: false,
                default: false,
                autoApply: true,
                createdBy: 'Self',
                settings: {
                    column1: {
                        filterVal: '',
                        ascending: false
                    }
                }
            }
        ];

        this.tableRows = [
            {
                column1: 'Apple',
                column2: 'Row 1',
                column3: 'Row 1',
                date: '09-07-18',
                type: 'search'
            },
            {
                column1: 'Banana',
                column2: 'Row 2',
                column3: 'Row 2',
                date: '09-08-18',
                type: 'cart'
            },
            {
                column1: 'Kiwi',
                column2: 'Row 3',
                column3: 'Row 3',
                date: '02-14-18',
                type: 'calendar'
            },
            {
                column1: 'Peach',
                column2: 'Row 4',
                column3: 'Row 4',
                date: '12-30-17',
                type: 'search'
            },
            {
                column1: 'Strawberry',
                column2: 'Row 5',
                column3: 'Row 5',
                date: '11-12-18',
                type: 'search'
            }
        ];
        this.displayedRows = this.tableRows;
    }
}
