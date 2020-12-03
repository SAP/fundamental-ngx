import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DIALOG_REF } from '@fundamental-ngx/core';

import { SortingComponent } from './sorting.component';

describe('PlatformTableSortDialogComponent', () => {
    let component: SortingComponent;
    let fixture: ComponentFixture<SortingComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [SortingComponent],
                providers: [{ provide: DIALOG_REF, useExisting: {} }]
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
