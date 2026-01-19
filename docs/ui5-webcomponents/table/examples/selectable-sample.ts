import { Component, computed, signal } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { RadioButton } from '@fundamental-ngx/ui5-webcomponents/radio-button';
import { Table } from '@fundamental-ngx/ui5-webcomponents/table';
import { TableCell } from '@fundamental-ngx/ui5-webcomponents/table-cell';
import { TableHeaderCell } from '@fundamental-ngx/ui5-webcomponents/table-header-cell';
import { TableHeaderRow } from '@fundamental-ngx/ui5-webcomponents/table-header-row';
import { TableRow } from '@fundamental-ngx/ui5-webcomponents/table-row';
import { TableSelectionMulti } from '@fundamental-ngx/ui5-webcomponents/table-selection-multi';
import { TableSelectionSingle } from '@fundamental-ngx/ui5-webcomponents/table-selection-single';
import { TableSelectionBehavior } from '@fundamental-ngx/ui5-webcomponents/types';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

interface Employee {
    id: number;
    name: string;
    department: string;
    role: string;
    email: string;
    phone: string;
}

@Component({
    selector: 'ui5-doc-selectable-table-sample',
    templateUrl: './selectable-sample.html',
    standalone: true,
    imports: [
        Table,
        TableHeaderRow,
        TableHeaderCell,
        TableRow,
        TableCell,
        TableSelectionSingle,
        TableSelectionMulti,
        RadioButton,
        Label,
        Button
    ]
})
export class SelectableTableSample {
    readonly employees = signal<Employee[]>([
        {
            id: 1,
            name: 'John Doe',
            department: 'Engineering',
            role: 'Senior Developer',
            email: 'john.doe@example.com',
            phone: '+1-555-0101'
        },
        {
            id: 2,
            name: 'Jane Smith',
            department: 'Marketing',
            role: 'Marketing Manager',
            email: 'jane.smith@example.com',
            phone: '+1-555-0102'
        },
        {
            id: 3,
            name: 'Bob Johnson',
            department: 'Engineering',
            role: 'DevOps Engineer',
            email: 'bob.johnson@example.com',
            phone: '+1-555-0103'
        },
        {
            id: 4,
            name: 'Alice Williams',
            department: 'Sales',
            role: 'Sales Representative',
            email: 'alice.williams@example.com',
            phone: '+1-555-0104'
        },
        {
            id: 5,
            name: 'Charlie Brown',
            department: 'HR',
            role: 'HR Specialist',
            email: 'charlie.brown@example.com',
            phone: '+1-555-0105'
        }
    ]);

    readonly employeesDisplay = computed(() => this.employees());
    readonly selectedEmployee = signal<string>('');
    readonly selectedEmployees = signal<string>('');
    readonly behaviors = signal(TableSelectionBehavior);
    readonly singleSelectionBehavior = signal<TableSelectionBehavior>(TableSelectionBehavior.RowSelector);
    readonly multiSelectionBehavior = signal<TableSelectionBehavior>(TableSelectionBehavior.RowSelector);

    onSingleSelectionBehaviorChange(change: TableSelectionBehavior): void {
        this.singleSelectionBehavior.set(change);
    }

    onMultiSelectionBehaviorChange(change: TableSelectionBehavior): void {
        this.multiSelectionBehavior.set(change);
    }

    onSingleSelectionChange(event: UI5WrapperCustomEvent<TableSelectionSingle, 'ui5Change'>): void {
        this.selectedEmployee.set(event.currentTarget.selected ?? '');
    }

    onMultiSelectionChange(event: UI5WrapperCustomEvent<TableSelectionMulti, 'ui5Change'>): void {
        this.selectedEmployees.set(event.currentTarget.selected ?? '');
    }

    clearSingleSelected(): void {
        this.selectedEmployee.set('');
    }

    clearMultiSelected(): void {
        this.selectedEmployees.set('');
    }
}
