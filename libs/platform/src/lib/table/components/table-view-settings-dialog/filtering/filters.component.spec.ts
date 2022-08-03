import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { DialogConfig, DialogRef, DialogService } from '@fundamental-ngx/core/dialog';
import { FiltersComponent } from './filters.component';
import { PlatformTableModule } from '../../../table.module';

describe('PlatformTableFiltersDialogComponent', () => {
    let component: FiltersComponent;
    let fixture: ComponentFixture<FiltersComponent>;
    const dialogRef = new DialogRef();
    dialogRef.data = {
        columns: [],
        filterBy: [],
        viewSettingsFilters: []
    };

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [PlatformTableModule, NoopAnimationsModule],
                providers: [{ provide: DialogRef, useValue: dialogRef }, DialogService, DialogConfig]
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
