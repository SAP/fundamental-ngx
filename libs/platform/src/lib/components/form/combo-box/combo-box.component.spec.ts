import { Component, ViewChild, ElementRef } from '@angular/core';
import { ComboBoxComponent, ComboBoxDataSource, ArrayComboBoxDataSource } from '@fundamental-ngx/platform';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Entity } from '../../../domain/data-model';


@Component({
    selector: 'fdp-test-combo-box',
    template: `
        <fdp-combo-box placeholder="select from here"></fdp-combo-box>
    `
})
class TestWrapperComboBoxComponent {

    @ViewChild(ComboBoxComponent, { static: true })
    selectRef: ComboBoxComponent;

    @ViewChild(ComboBoxComponent, { read: ElementRef, static: true })
    selectElement: ElementRef;

    wrapperValue: string;

CELL_DATA: CellDataCsv[] = [
    { column1: 'Row 1', column2: 'Row 1', column3: 'Row 1', date: '09-07-18', type: 'search' },
    { column1: 'Row 2', column2: 'Row 2', column3: 'Row 2', date: '09-08-18', type: 'cart' },
    { column1: 'Row 3', column2: 'Row 3', column3: 'Row 3', date: '02-14-18', type: 'calendar' },
    { column1: 'Row 4', column2: 'Row 4', column3: 'Row 4', date: '12-30-17', type: 'search' },
    { column1: 'Row 5', column2: 'Row 5', column3: 'Row 5', date: '11-12-18', type: 'search' }
];

}

export interface CellDataCsv {
    column1: string;
    column2: string;
    column3: string;
    date: string;
    type: string;
}

export class CellData implements Entity {
    constructor(public readonly column1: string,
        public readonly column2: string,
        public readonly column3: string,
        public readonly  date: string,
        public readonly type: string) {	
    }

    toString() {
        return `${this.column1} - ${this.type}`;
    }

    identity(): string {
        return this.column1;
    }

    getTypes(): any {
        return{
            column1: String,
            column2: String,
            column3: String,
            date: String,
            type: String,	
        };
    }

    className(): string {
        return 'CellData';
    }
}

describe('ComboBoxComponent', () => {
    let component: ComboBoxComponent;
    let fixture: ComponentFixture<ComboBoxComponent>;
    const cellDataSource = new ArrayComboBoxDataSource<CellData>(
      this.CELL_DATA.map((i: CellDataCsv) => {

        return new CellData(
          i.column1, i.column2, i.column3, i.date, i.type);
      }));

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ComboBoxComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ComboBoxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should check for data source adding', () => {
    component.ngOnInit();
    component.dataSource = cellDataSource;
    component.displayFn = toString;
    fixture.detectChanges();
  });

});
