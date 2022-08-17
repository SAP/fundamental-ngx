import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartFilterBarSettingsDialogComponent } from './smart-filter-bar-settings-dialog.component';
import {
    PlatformSmartFilterBarModule,
    SmartFilterSettingsDialogConfig
} from '@fundamental-ngx/platform/smart-filter-bar';
import { DialogConfig, DialogRef } from '@fundamental-ngx/core/dialog';
import { FilterableColumnDataType, FilterType } from '@fundamental-ngx/platform/table';
import { FdpSelectionChangeEvent } from '@fundamental-ngx/platform/form';
import { whenStable } from '@fundamental-ngx/core/tests';
import { SmartFilterBarVisibilityCategory } from '../../interfaces/smart-filter-bar-visibility-category';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

const mockData: SmartFilterSettingsDialogConfig = {
    fields: [
        {
            name: 'test',
            dataType: FilterableColumnDataType.STRING,
            filterType: FilterType.INPUT,
            key: 'test',
            label: 'test',
            filterable: true,
            required: true,
            defaultSelected: false,
            hasOptions: false,
            conditionStrategy: 'or'
        }
    ],
    filterBy: [],
    selectedFilters: []
};

describe('SmartFilterBarSettingsDialogComponent', () => {
    let component: SmartFilterBarSettingsDialogComponent;
    let fixture: ComponentFixture<SmartFilterBarSettingsDialogComponent>;

    const dialogConfig = new DialogConfig();

    const dialogRefMock: DialogRef<SmartFilterSettingsDialogConfig> = new DialogRef<SmartFilterSettingsDialogConfig>();
    dialogRefMock.data = mockData;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, PlatformSmartFilterBarModule],
            declarations: [SmartFilterBarSettingsDialogComponent],
            providers: [
                {
                    provide: DialogRef,
                    useValue: dialogRefMock
                },
                {
                    provide: DialogConfig,
                    useValue: dialogConfig
                }
            ]
        }).compileComponents();
    });

    beforeEach(async () => {
        fixture = TestBed.createComponent(SmartFilterBarSettingsDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await whenStable(fixture);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should apply filtering', () => {
        const filterTypes: SmartFilterBarVisibilityCategory[] = [
            'visibleAndActive',
            'visible',
            'active',
            'mandatory',
            'all'
        ];

        const source = component.source.dataProvider as any;

        fixture.detectChanges();

        const allFiltersSpy = spyOn(source, '_getAllItems').and.callThrough();
        const mandatoryFiltersSpy = spyOn(source, '_getMandatoryItems').and.callThrough();
        const visibleFiltersSpy = spyOn(source, '_getVisibleItems').and.callThrough();
        const activeFiltersSpy = spyOn(source, '_getActiveItems').and.callThrough();
        const visibleActiveFiltersSpy = spyOn(source, '_getVisibleAndActiveItems').and.callThrough();

        filterTypes.forEach((f) => {
            const evt: FdpSelectionChangeEvent = {
                payload: f
            };

            component._onFilterVisibilityChange(evt);
        });

        expect(allFiltersSpy).toHaveBeenCalled();
        expect(mandatoryFiltersSpy).toHaveBeenCalled();
        expect(visibleFiltersSpy).toHaveBeenCalled();
        expect(activeFiltersSpy).toHaveBeenCalled();
        expect(visibleActiveFiltersSpy).toHaveBeenCalled();
    });
});
