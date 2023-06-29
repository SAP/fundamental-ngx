import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartFilterBarSettingsDialogComponent } from './smart-filter-bar-settings-dialog.component';
import { DialogConfig, DialogRef, FD_DIALOG_FOCUS_TRAP_ERROR } from '@fundamental-ngx/core/dialog';
import { FilterableColumnDataType, FilterType } from '@fundamental-ngx/platform/table';
import { FdpSelectionChangeEvent } from '@fundamental-ngx/platform/form';
import { whenStable } from '@fundamental-ngx/core/tests';
import { SmartFilterBarVisibilityCategory } from '../../interfaces/smart-filter-bar-visibility-category';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SmartFilterSettingsDialogConfig } from '../../interfaces/smart-filter-bar-settings-dialog-config';
import { PlatformSmartFilterBarModule } from '../../smart-filter-bar.module';

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
                },
                {
                    provide: FD_DIALOG_FOCUS_TRAP_ERROR,
                    useValue: true
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

        const allFiltersSpy = jest.spyOn(source, '_getAllItems');
        const mandatoryFiltersSpy = jest.spyOn(source, '_getMandatoryItems');
        const visibleFiltersSpy = jest.spyOn(source, '_getVisibleItems');
        const activeFiltersSpy = jest.spyOn(source, '_getActiveItems');
        const visibleActiveFiltersSpy = jest.spyOn(source, '_getVisibleAndActiveItems');

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
