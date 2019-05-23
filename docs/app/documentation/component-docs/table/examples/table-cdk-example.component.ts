import { Component } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CellData {
    column1: string;
    column2: string;
    column3: string;
    date: string;
    type: string;
}
const CELL_DATA: CellData[] = [
    {column1: 'Row 1', column2: 'Row 1', column3: 'Row 1', date: '09-07-18', type: 'search'},
    {column1: 'Row 2', column2: 'Row 2', column3: 'Row 2', date: '09-08-18', type: 'cart'},
    {column1: 'Row 3', column2: 'Row 3', column3: 'Row 3', date: '02-14-18', type: 'calendar'},
    {column1: 'Row 4', column2: 'Row 4', column3: 'Row 4', date: '12-30-17', type: 'search'},
    {column1: 'Row 5', column2: 'Row 5', column3: 'Row 5', date: '11-12-18', type: 'search'}
];

@Component({
    selector: 'fd-table-cdk-example',
    templateUrl: './table-cdk-example.component.html'
})
export class TableCdkExampleComponent {
    displayedColumns: string[] = ['column1', 'column2', 'column3', 'date', 'type'];
    dataSource = new ExampleDataSource();
}
export class ExampleDataSource extends DataSource<CellData> {
    data = new BehaviorSubject<CellData[]>(CELL_DATA);

    connect(): Observable<CellData[]> {
        return this.data;
    }

    disconnect() {}
}
