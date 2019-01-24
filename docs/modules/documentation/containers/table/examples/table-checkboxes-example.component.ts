import { Component, QueryList, ViewChildren } from '@angular/core';

@Component({
    selector: 'fd-table-checkboxes-example',
    templateUrl: './table-checkboxes-example.component.html'
})
export class TableCheckboxesExampleComponent {

    @ViewChildren('localCheckbox') checkboxes: QueryList<any>;

    selectedRows = [];

    allSelected = false;

    tableRows = [
        {
            column1: 'Row 1',
            column2: 'Row 1',
            column3: 'Row 1',
            date: '09-07-18',
            type: 'search'
        },
        {
            column1: 'Row 2',
            column2: 'Row 2',
            column3: 'Row 2',
            date: '09-07-18',
            type: 'cart'
        },
        {
            column1: 'Row 3',
            column2: 'Row 3',
            column3: 'Row 3',
            date: '09-07-18',
            type: 'calendar'
        },
        {
            column1: 'Row 4',
            column2: 'Row 4',
            column3: 'Row 4',
            date: '09-07-18',
            type: 'search'
        },
        {
            column1: 'Row 5',
            column2: 'Row 5',
            column3: 'Row 5',
            date: '09-07-18',
            type: 'search'
        }
    ];

    select(event: any, row: number): void {
        if (event.srcElement.checked) {
            this.selectedRows.push(row);
        } else {
            this.selectedRows.splice(this.selectedRows.indexOf(row), 1);
        }

        this.allSelected = this.checkIfAllSelected();
    }

    selectMaster() {
        if (this.allSelected) {
            this.deselectAll();
            this.allSelected = false;
        } else {
            this.selectAll();
            this.allSelected = true;
        }
    }

    private selectAll(): void {
        this.checkboxes.forEach((checkbox, index) => {
            if (checkbox.nativeElement.checked === false) {
                checkbox.nativeElement.checked = true;
                this.selectedRows.push(index);
            }
        });
        this.allSelected = true;
    }

    private deselectAll(): void {
        this.checkboxes.forEach(checkbox => {
            checkbox.nativeElement.checked = false;
        });
        this.allSelected = false;
        this.selectedRows = [];
    }

    private checkIfAllSelected(): boolean {
        let state = true;
        this.checkboxes.forEach(checkbox => {
            if (checkbox.nativeElement.checked === false) {
                state = false;
            }
        });
        return state;
    }

}
