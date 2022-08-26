import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DialogConfig, DialogRef, DialogService } from '@fundamental-ngx/core/dialog';
import { Table } from '@fundamental-ngx/platform/table';

import { SettingsSortDialogData, SortingComponent } from './sorting.component';
import { PlatformTableModule } from '../../../table.module';
import { SortDirection } from '../../../enums';

describe('PlatformTableSortDialogComponent', () => {
    let component: SortingComponent;
    let fixture: ComponentFixture<SortingComponent>;
    const dialogRef = new DialogRef();
    const dialogData: SettingsSortDialogData = {
        columns: [],
        direction: SortDirection.NONE,
        field: null,
        allowDisablingSorting: false
    };
    dialogRef.data = dialogData;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: DialogRef, useValue: dialogRef },
                { provide: Table, useValue: {} },
                DialogService,
                DialogConfig
            ],
            imports: [PlatformTableModule, NoopAnimationsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SortingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
