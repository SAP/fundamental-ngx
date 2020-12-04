import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogRef, DIALOG_REF } from '@fundamental-ngx/core';

import { GroupingComponent, GroupDialogData } from './grouping.component';

describe('PlatformTableGroupDialogComponent', () => {
    let component: GroupingComponent;
    let fixture: ComponentFixture<GroupingComponent>;
    const dialogRef = new DialogRef();
    const dialogData: GroupDialogData = { columns: [], direction: null, field: null };
    dialogRef.data = dialogData;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [GroupingComponent],
                providers: [{ provide: DIALOG_REF, useValue: dialogRef }]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(GroupingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
