import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { DialogConfig, DialogRef, DialogService } from '@fundamental-ngx/core/dialog';
import { Table } from '@fundamental-ngx/platform/table';
import { GroupingComponent } from './grouping.component';
import { PlatformTableModule } from '../../../table.module';
import { SortDirection } from '../../../enums';

describe('PlatformTableGroupDialogComponent', () => {
    let component: GroupingComponent;
    let fixture: ComponentFixture<GroupingComponent>;
    const dialogRef = new DialogRef();
    dialogRef.data = {
        columns: [],
        direction: SortDirection.NONE,
        field: null
    };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PlatformTableModule, NoopAnimationsModule],
            providers: [
                { provide: DialogRef, useValue: dialogRef },
                { provide: Table, useValue: {} },
                DialogService,
                DialogConfig
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GroupingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
