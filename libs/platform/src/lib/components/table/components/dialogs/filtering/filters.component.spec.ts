import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogRef } from '@fundamental-ngx/core';

import { FiltersComponent, FiltersDialogData } from './filters.component';

describe('PlatformTableFiltersDialogComponent', () => {
    let component: FiltersComponent;
    let fixture: ComponentFixture<FiltersComponent>;
    const dialogRef = new DialogRef();
    const dialogData: FiltersDialogData = { columns: [], filterBy: [], viewSettingsFilters: [] };
    dialogRef.data = dialogData;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [FiltersComponent],
                providers: [{ provide: DialogRef, useValue: dialogRef }]
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
