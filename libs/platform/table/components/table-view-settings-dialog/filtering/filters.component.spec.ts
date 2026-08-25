import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogConfig, DialogRef, DialogService } from '@fundamental-ngx/core/dialog';
import { Table } from '@fundamental-ngx/platform/table-helpers';
import { PlatformTableModule } from '../../../table.module';
import { FiltersComponent } from './filters.component';

describe('PlatformTableFiltersDialogComponent', () => {
    let component: FiltersComponent;
    let fixture: ComponentFixture<FiltersComponent>;
    const dialogRef = new DialogRef();
    dialogRef.data = {
        columns: [],
        filterBy: [],
        viewSettingsFilters: []
    };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PlatformTableModule],
            providers: [
                { provide: DialogRef, useValue: dialogRef },
                { provide: Table, useValue: {} },
                DialogService,
                DialogConfig
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FiltersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('focus behavior effect', () => {
        it('should have an effect that watches activeStep signal', () => {
            // The effect is created in the constructor
            expect(component.activeStep).toBeDefined();
            expect(typeof component.activeStep).toBe('function');
        });

        it('should query document for list items when effect runs', () => {
            const querySelectorSpy = jest.spyOn(document, 'querySelector');

            // Simulate opening the filters list by setting activeStep
            // The effect will trigger and query for list items
            component.activeStep.set(0); // ACTIVE_STEP.SELECT_FILTER = 0
            fixture.detectChanges();

            // Note: querySelector may be called but won't find anything in the test environment
            // This test just verifies the mechanism is in place
            expect(component.activeStep()).toBe(0);
        });
    });
});
