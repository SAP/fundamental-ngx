import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

interface ExampleRow {
    column1: any,
    column2?: any,
    column3?: any,
    date?: any,
    type?: any
}

enum Sharing {
    PRIVATE = 1,
    PUBLIC = 2
}

interface View {
    id: number,
    favorite: boolean,
    name: string,
    sharing: string,
    autoApply: boolean,
    default: boolean,
    createdBy: string,
    settings?: any;
}

@Component({
    selector: 'fd-variant-management-example',
    templateUrl: './variant-management-example.component.html'
})
export class VariantManagementExampleComponent implements OnInit {
    tableRows: ExampleRow[];
    displayedRows: ExampleRow[];
    ascending = true;
    filterVal = '';
    open = false;

    settingsChanged = false;

    viewFilters = {
        filterVal: '',
        ascending: false
    }

    defaultView = {
        id: 1,
        favorite: true,
        name: 'Standard',
        sharing: 'Private',
        default: true,
        autoApply: true,
        createdBy: 'SAP',
        data: {
            filterVal: '',
            ascending: true
        }
    };

    views: View[];

    sortColumn1(asc: boolean): void {
        this.ascending = asc;
        this.open = false;
        this.viewFilters.ascending = asc;

        this._viewChange();
    }

    inputKeyup(event: KeyboardEvent): void {
        if (event.key === 'Enter' || event.key === 'Esc') {
            this.open = false;
        }
        this._viewChange();
    };

    _viewChange(): void {
        this.settingsChanged = true;
    }

    applyViewSettings(viewId: number): void {
        this.settingsChanged = false;
        const viewToApply = this.views.find(view => view.id === viewId);
        this.viewFilters = { ...viewToApply.settings };
    }
    
    saveViews(updatedViews: View[]): void {
        const updateExist = this.views
            .map(view => updatedViews
                .find(updatedView => view.id === updatedView.id))
            .filter(Boolean);

        if (updateExist.length) {
            const updatedView = this.views.find(view => view.id === updatedViews[0].id);
            updatedView.settings = this.viewFilters;
        } else {
            this.views.push({
                ...updatedViews[0],
                settings: this.viewFilters
            });
        }
    }

    ngOnInit(): void {
        this.views = [
            {
                id: 1,
                favorite: true,
                name: 'Standard',
                sharing: 'Private',
                default: true,
                autoApply: true,
                createdBy: 'SAP',
                settings: {
                    filterVal: '',
                    ascending: true
                }
            },
            {
                id: 2,
                favorite: false,
                name: 'Second View',
                sharing: 'Public',
                default: false,
                autoApply: true,
                createdBy: 'Self',
                settings: {
                    filterVal: '',
                    ascending: false
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
