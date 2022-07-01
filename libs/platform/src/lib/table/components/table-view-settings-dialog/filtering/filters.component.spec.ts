import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ContentDensityEnum } from '@fundamental-ngx/core/utils';

import { DialogConfig, DialogRef, DialogService } from '@fundamental-ngx/core/dialog';
import { FiltersComponent, FiltersDialogData } from './filters.component';
import { PlatformTableModule } from '../../../table.module';

describe('PlatformTableFiltersDialogComponent', () => {
    let component: FiltersComponent;
    let fixture: ComponentFixture<FiltersComponent>;
    const dialogRef = new DialogRef();
    const dialogData: FiltersDialogData = {
        columns: [],
        filterBy: [],
        viewSettingsFilters: [],
        tableContentDensity: ContentDensityEnum.COZY
    };
    dialogRef.data = dialogData;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PlatformTableModule, NoopAnimationsModule],
            providers: [{ provide: DialogRef, useValue: dialogRef }, DialogService, DialogConfig]
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
});
