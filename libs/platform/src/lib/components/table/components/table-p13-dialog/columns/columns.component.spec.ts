import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogRef } from '@fundamental-ngx/core';

import { P13ColumnsDialogComponent, ColumnsDialogData } from './columns.component';

describe('PlatformTableP13ColumnsDialogComponent', () => {
    let component: P13ColumnsDialogComponent;
    let fixture: ComponentFixture<P13ColumnsDialogComponent>;
    const dialogRef = new DialogRef();
    const dialogData: ColumnsDialogData = { availableColumns: [], visibleColumns: [] };
    dialogRef.data = dialogData;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [P13ColumnsDialogComponent],
                providers: [{ provide: DialogRef, useValue: dialogRef }]
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
