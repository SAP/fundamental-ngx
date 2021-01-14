import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogRef } from '@fundamental-ngx/core';

import { GroupDialogData, P13GroupingDialogComponent } from './grouping.component';

describe('PlatformTableP13GroupDialogComponent', () => {
    let component: P13GroupingDialogComponent;
    let fixture: ComponentFixture<P13GroupingDialogComponent>;
    const dialogRef = new DialogRef();
    const dialogData: GroupDialogData = { columns: [], collectionGroup: [] };
    dialogRef.data = dialogData;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [P13GroupingDialogComponent],
                providers: [{ provide: DialogRef, useValue: dialogRef }]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(P13GroupingDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
