import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfig, DialogRef, FD_DIALOG_FOCUS_TRAP_ERROR } from '@fundamental-ngx/core/dialog';
import { whenStable } from '@fundamental-ngx/core/tests';
import { FdpSelectionChangeEvent } from '@fundamental-ngx/platform/form';
import { FilterType, FilterableColumnDataType, TableRowSelectionChangeEvent } from '@fundamental-ngx/platform/table';
import { FieldFilterItem } from '../../interfaces/smart-filter-bar-field-filter-item';
import { SmartFilterSettingsDialogConfig } from '../../interfaces/smart-filter-bar-settings-dialog-config';
import { SmartFilterBarVisibilityCategory } from '../../interfaces/smart-filter-bar-visibility-category';
import { SmartFilterBarSettingsDialogComponent } from './smart-filter-bar-settings-dialog.component';

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

const mockDataMultipleFields: SmartFilterSettingsDialogConfig = {
    fields: [
        {
            name: 'field1',
            dataType: FilterableColumnDataType.STRING,
            filterType: FilterType.INPUT,
            key: 'field1',
            label: 'Field 1',
            filterable: true,
            required: true, // mandatory
            defaultSelected: false,
            hasOptions: false,
            conditionStrategy: 'or'
        },
        {
            name: 'field2',
            dataType: FilterableColumnDataType.STRING,
            filterType: FilterType.INPUT,
            key: 'field2',
            label: 'Field 2',
            filterable: true,
            required: false,
            defaultSelected: false,
            hasOptions: false,
            conditionStrategy: 'or'
        },
        {
            name: 'field3',
            dataType: FilterableColumnDataType.STRING,
            filterType: FilterType.INPUT,
            key: 'field3',
            label: 'Field 3',
            filterable: true,
            required: false,
            defaultSelected: false,
            hasOptions: false,
            conditionStrategy: 'or'
        }
    ],
    filterBy: [],
    selectedFilters: ['field2', 'field3'] // field2 and field3 pre-selected as visible
};

function makeSelectionEvent(selection: FieldFilterItem[]): TableRowSelectionChangeEvent<FieldFilterItem> {
    return { selection, added: [], removed: [], index: [] } as unknown as TableRowSelectionChangeEvent<FieldFilterItem>;
}

describe('SmartFilterBarSettingsDialogComponent', () => {
    let component: SmartFilterBarSettingsDialogComponent;
    let fixture: ComponentFixture<SmartFilterBarSettingsDialogComponent>;

    const dialogConfig = new DialogConfig();

    const dialogRefMock: DialogRef<SmartFilterSettingsDialogConfig> = new DialogRef<SmartFilterSettingsDialogConfig>();
    dialogRefMock.data = mockData;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SmartFilterBarSettingsDialogComponent],
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

describe('SmartFilterBarSettingsDialogComponent - selection preservation', () => {
    let component: SmartFilterBarSettingsDialogComponent;
    let fixture: ComponentFixture<SmartFilterBarSettingsDialogComponent>;

    const multiFieldDialogRef = new DialogRef<SmartFilterSettingsDialogConfig>();
    multiFieldDialogRef.data = mockDataMultipleFields;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SmartFilterBarSettingsDialogComponent],
            providers: [
                { provide: DialogRef, useValue: multiFieldDialogRef },
                { provide: DialogConfig, useValue: new DialogConfig() },
                { provide: FD_DIALOG_FOCUS_TRAP_ERROR, useValue: true }
            ]
        }).compileComponents();
    });

    beforeEach(async () => {
        fixture = TestBed.createComponent(SmartFilterBarSettingsDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await whenStable(fixture);
    });

    it('should initialise _selectedFilters from dialog data', () => {
        expect((component as any)._selectedFilters).toEqual(['field2', 'field3']);
    });

    it('should add newly selected item while preserving selections from other categories', () => {
        const comp = component as any;
        // Simulate being in "Mandatory" view — only field1 is shown (required: true)
        comp._currentViewItems = [
            { name: 'field1', label: 'Field 1', visible: false, active: false, mandatory: true, key: 'field1' }
        ];
        comp._selectedFilters = ['field2', 'field3'];

        // User selects field1 in the Mandatory view
        component._onRowSelectionChange(
            makeSelectionEvent([
                { name: 'field1', label: 'Field 1', visible: false, active: false, mandatory: true, key: 'field1' }
            ])
        );

        const selected: string[] = comp._selectedFilters;
        expect(selected).toContain('field1'); // newly selected in this view
        expect(selected).toContain('field2'); // preserved from another category
        expect(selected).toContain('field3'); // preserved from another category
    });

    it('should remove deselected item while keeping selections outside the current view', () => {
        const comp = component as any;
        // Simulate being in "Visible" view — field2 and field3 are visible
        comp._currentViewItems = [
            { name: 'field2', label: 'Field 2', visible: true, active: false, mandatory: false, key: 'field2' },
            { name: 'field3', label: 'Field 3', visible: true, active: false, mandatory: false, key: 'field3' }
        ];
        comp._selectedFilters = ['field1', 'field2', 'field3'];

        // User deselects field3 in the Visible view
        component._onRowSelectionChange(
            makeSelectionEvent([
                { name: 'field2', label: 'Field 2', visible: true, active: false, mandatory: false, key: 'field2' }
            ])
        );

        const selected: string[] = comp._selectedFilters;
        expect(selected).toContain('field1'); // not in this view — must be preserved
        expect(selected).toContain('field2'); // still selected
        expect(selected).not.toContain('field3'); // deselected by the user
    });

    it('should confirm with the full merged selection', () => {
        const comp = component as any;
        comp._selectedFilters = ['field1', 'field3'];
        const closeSpy = jest.spyOn(multiFieldDialogRef, 'close').mockImplementation(() => {});

        component._confirm();

        expect(closeSpy).toHaveBeenCalledWith(['field1', 'field3']);
    });
});
