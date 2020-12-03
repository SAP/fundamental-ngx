import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DIALOG_REF } from '@fundamental-ngx/core';

import { FiltersComponent } from './filters.component';

describe('PlatformTableFiltersDialogComponent', () => {
    let component: FiltersComponent;
    let fixture: ComponentFixture<FiltersComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [FiltersComponent],
                providers: [{ provide: DIALOG_REF, useExisting: {} }]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(FiltersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
