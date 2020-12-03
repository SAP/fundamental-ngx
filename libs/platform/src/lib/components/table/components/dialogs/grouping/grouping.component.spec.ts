import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DIALOG_REF } from '@fundamental-ngx/core';

import { GroupingComponent } from './grouping.component';

describe('PlatformTableGroupDialogComponent', () => {
    let component: GroupingComponent;
    let fixture: ComponentFixture<GroupingComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [GroupingComponent],
                providers: [{ provide: DIALOG_REF, useExisting: {} }]
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
