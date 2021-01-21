import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogRef } from '@fundamental-ngx/core';

import { P13SortingDialogComponent, SortDialogData } from './sorting.component';

describe('PlatformTableP13SortDialogComponent', () => {
    let component: P13SortingDialogComponent;
    let fixture: ComponentFixture<P13SortingDialogComponent>;
    const dialogRef = new DialogRef();
    const dialogData: SortDialogData = { columns: [], collectionSort: [] };
    dialogRef.data = dialogData;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [P13SortingDialogComponent],
                providers: [{ provide: DialogRef, useValue: dialogRef }]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(P13SortingDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
