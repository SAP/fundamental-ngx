import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogRef } from '@fundamental-ngx/core';

import { P13FilteringDialogComponent, FilterDialogData } from './filtering.component';

describe('PlatformTableP13FilterDialogComponent', () => {
    let component: P13FilteringDialogComponent;
    let fixture: ComponentFixture<P13FilteringDialogComponent>;
    const dialogRef = new DialogRef();
    const dialogData: FilterDialogData = { columns: [], collectionFilter: [] };
    dialogRef.data = dialogData;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [P13FilteringDialogComponent],
                providers: [{ provide: DialogRef, useValue: dialogRef }]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(P13FilteringDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
