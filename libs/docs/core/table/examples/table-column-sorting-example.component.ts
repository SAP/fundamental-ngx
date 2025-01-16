import { LiveAnnouncer } from '@angular/cdk/a11y';

import { ChangeDetectionStrategy, Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FocusableGridDirective } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FormControlComponent, FormItemComponent, FormLabelComponent } from '@fundamental-ngx/core/form';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { ListModule } from '@fundamental-ngx/core/list';
import { PopoverBodyComponent, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { TableModule } from '@fundamental-ngx/core/table';
import { ToolbarComponent, ToolbarSpacerDirective } from '@fundamental-ngx/core/toolbar';

const sort = (a, b, key?: string): number => {
    if (key) {
        return a[key] > b[key] ? 1 : -1;
    } else {
        return a > b ? 1 : -1;
    }
};

@Pipe({
    name: 'sortBy',
    pure: false,
    standalone: true
})
export class SortByPipe implements PipeTransform {
    transform(tableRows: any[], ascending: boolean, sortKey?: string): any[] {
        const ascModifier: number = ascending ? 1 : -1;
        tableRows.sort((a, b) => sort(a, b, sortKey) * ascModifier);
        return tableRows;
    }
}

@Pipe({
    name: 'filter',
    standalone: true
})
export class FilterPipe implements PipeTransform {
    transform(values: any[] = [], searchTerm: string = '', key: string = ''): any[] {
        if (!searchTerm) {
            return values;
        }
        if (key) {
            values = values.filter((item) => item[key].toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
        } else {
            values = values.filter((item) => item.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
        }
        return values;
    }
}

const rows = [
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

interface ExampleRow {
    column1: any;
    column2?: any;
    column3?: any;
    date?: any;
    type?: any;
}

@Component({
    selector: 'fd-table-column-sorting-example',
    templateUrl: './table-column-sorting-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ToolbarComponent,
        ToolbarSpacerDirective,
        ContentDensityDirective,
        InputGroupModule,
        FormsModule,
        ButtonComponent,
        FocusableGridDirective,
        TableModule,
        LinkComponent,
        IconComponent,
        PopoverComponent,
        PopoverControlComponent,
        PopoverBodyComponent,
        ListModule,
        FormItemComponent,
        FormLabelComponent,
        FormControlComponent,
        SortByPipe,
        FilterPipe
    ]
})
export class TableColumnSortingExampleComponent implements OnInit {
    tableRows: ExampleRow[];
    displayedRows: ExampleRow[];
    tableRows2: ExampleRow[];
    displayedRows2: ExampleRow[];
    ascending = true;
    ascending2 = true;
    filterVal = '';
    filterVal2 = '';
    open = false;

    constructor(private liveAnnouncer: LiveAnnouncer) {}

    sortColumn1(asc: boolean): void {
        this.ascending2 = asc;
        this.open = false;
    }

    inputKeyup(event: KeyboardEvent): void {
        if (event.key === 'Enter' || event.key === 'Esc') {
            this.open = false;
        }
    }

    async changeSort(asc: boolean): Promise<void> {
        this.ascending = asc;
        await this.liveAnnouncer.announce(`Set sort ${asc ? 'ascending' : 'descending'}`, 'assertive');
    }

    ngOnInit(): void {
        this.tableRows = [...rows];
        this.displayedRows = this.tableRows;
        this.tableRows2 = [...rows];
        this.displayedRows2 = this.tableRows2;
    }
}
