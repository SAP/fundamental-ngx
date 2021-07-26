import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogConfig, DialogRef, DialogService, RtlService } from '@fundamental-ngx/core';

import { P13ColumnsDialogComponent, ColumnsDialogData } from './columns.component';
import { PlatformTableModule } from '../../../table.module';

describe('PlatformTableP13ColumnsDialogComponent', () => {
    let component: P13ColumnsDialogComponent;
    let fixture: ComponentFixture<P13ColumnsDialogComponent>;
    const dialogRef = new DialogRef();
    const dialogData: ColumnsDialogData = { availableColumns: [], visibleColumns: [] };
    dialogRef.data = dialogData;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                providers: [{ provide: DialogRef, useValue: dialogRef }, DialogService, DialogConfig, RtlService],
                imports: [PlatformTableModule, NoopAnimationsModule]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(P13ColumnsDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
