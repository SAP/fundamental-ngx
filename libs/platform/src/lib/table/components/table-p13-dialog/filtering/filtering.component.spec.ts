import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DialogConfig, DialogRef } from '@fundamental-ngx/core/dialog';
import { PlatformTableModule } from '../../../table.module';
import { FilterDialogData, P13FilteringDialogComponent } from './filtering.component';
import { FilterableColumnDataType } from '../../../enums/filter-type.enum';

describe('PlatformTableP13FilterDialogComponent', () => {
    let component: P13FilteringDialogComponent;
    let fixture: ComponentFixture<P13FilteringDialogComponent>;

    const dialogRef = new DialogRef();
    const dialogData: FilterDialogData = {
        columns: [
            {
                label: 'Name',
                key: 'name',
                dataType: FilterableColumnDataType.STRING
            },
            {
                label: 'Description',
                key: 'description',
                dataType: FilterableColumnDataType.STRING,
                filterable: false
            },
            {
                label: 'Price',
                key: 'price.value',
                dataType: FilterableColumnDataType.STRING,
                filterable: true
            },
            {
                label: 'Status',
                key: 'status',
                dataType: FilterableColumnDataType.STRING,
                filterable: true
            }
        ],
        collectionFilter: []
    };

    dialogRef.data = dialogData;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PlatformTableModule, NoopAnimationsModule],
            providers: [{ provide: DialogRef, useValue: dialogRef }, DialogConfig]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(P13FilteringDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not add columns where filterable is false or unspecified', () => {
        expect(component.columns.length).toEqual(2);
    });
});
