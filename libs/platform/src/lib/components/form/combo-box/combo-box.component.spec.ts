import { Component, ViewChild, ElementRef, OnInit, DebugElement } from '@angular/core';
import { ComboBoxDataSource, Entity, DataProvider, DATA_PROVIDERS, ArrayDataProvider, ComboBoxComponent, ArrayComboBoxDataSource } from '@fundamental-ngx/platform';
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { FdpComboBoxModule } from './fdp-combo-box.module';
import { OverlayContainer } from '@angular/cdk/overlay';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';


const dataProviderServiceFactory = () => {
  const providers = new Map<string, DataProvider<any>>();

  providers.set('celldata', new ArrayDataProvider<CellData>(
    CELL_DATA.map((i: CellDataCsv) => {

      return new CellData(
        i.column1, i.column2, i.column3,  i.date, i.type );
    })));

  return providers;
};

const CELL_DATA: CellDataCsv[] = [
    { column1: 'Rowaa 1', column2: 'Row 1', column3: 'Row 1', date: '09-07-18', type: 'search' },
    { column1: 'Rowab 3', column2: 'Row 3', column3: 'Row 3', date: '02-14-18', type: 'calendar' }, 
    { column1: 'Rowac 4', column2: 'Row 4', column3: 'Row 4', date: '12-30-17', type: 'search' }, 
    { column1: 'Rowxx 5', column2: 'Row 5', column3: 'Row 5', date: '11-12-18', type: 'search' }
];

export class CellData implements Entity {
    constructor(public readonly column1: string,
        public readonly column2: string,
        public readonly column3: string,
        public readonly  date: string,
        public readonly type: string) {	
    }

    toString(): string {
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

class ComboboxDataProvider extends DataProvider<string> {
    
    constructor() {
        super();
    }
     
    fetch(params: Map<string, any>): Observable<string[]> {
        let cell_data = CELL_DATA;

        if (params['keyword']) {
            const keyword = params['keyword'].toLowerCase();
            cell_data = cell_data.filter(item => (item.column1.toLowerCase().indexOf(keyword) > -1));
        }
        if (params['column1']) {
            cell_data = cell_data.filter(item => item.column1 === params['column1']);
        }
        return of(cell_data.map(item => item.column1));
         
    }
}


@Component({
    selector: 'fdp-test-combo-box',
    template: `
        <fdp-combo-box placeholder="select from here" [dataSource]="dataSource"  displayKey="toString"></fdp-combo-box>
    `
})
class TestWrapperComboBoxComponent implements OnInit {

    inputValue: string;

    public placeholder: string;
    public dataSource: ComboBoxDataSource<CellData>;

    @ViewChild(ComboBoxComponent) comboBox: ComboBoxComponent;

    constructor() { 

    }

    ngOnInit() {
    this.dataSource = new ArrayComboBoxDataSource<CellData>(
      CELL_DATA.map((i: CellDataCsv) => {

        return new CellData(
          i.column1, i.column2, i.column3, i.date, i.type);
        }));
    }

    onInputChange($event) {
        this.inputValue = $event;
    }

}

export interface CellDataCsv {
    column1: string;
    column2: string;
    column3: string;
    date: string;
    type: string;
}

describe('ComboBoxComponent', () => {
    let host: TestWrapperComboBoxComponent;
    let fixture: ComponentFixture<TestWrapperComboBoxComponent>;
    let de: DebugElement;

    let overlayContainerEl: HTMLElement;
   
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestWrapperComboBoxComponent],
            imports: [FdpComboBoxModule],
            providers: [{ provide: DATA_PROVIDERS, useFactory: dataProviderServiceFactory }]
        }).compileComponents();

        inject([OverlayContainer], (overlayContainer: OverlayContainer) => {
            overlayContainerEl = overlayContainer.getContainerElement();
        })();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComboBoxComponent);
        de = fixture.debugElement;
        host = fixture.componentInstance;
        host.placeholder = 'select from the list';
        fixture.detectChanges();
    });

    it('component create', () =>  {
         const textInput = de.query(By.css('input.fd-input'));
        // simulate input entry
        textInput.nativeElement.value = 'Rowa';
        textInput.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        // check dropdown
        expect(host.comboBox._suggestions.length).toBe(3);
    });
});
