import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DIALOG_REF, DialogRef } from '@fundamental-ngx/core';

import { SortingComponent, SortDialogData } from './sorting.component';

describe('PlatformTableSortDialogComponent', () => {
    let component: SortingComponent;
    let fixture: ComponentFixture<SortingComponent>;
    const dialogRef = new DialogRef();
    const dialogData: SortDialogData = { columns: [], direction: null, field: null };
    dialogRef.data = dialogData;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [SortingComponent],
                providers: [{ provide: DIALOG_REF, useValue: dialogRef }]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(SortingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
