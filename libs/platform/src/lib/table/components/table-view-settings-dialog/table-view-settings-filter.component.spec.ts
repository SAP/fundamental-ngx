import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
    FdpViewSettingsFilterCustomDef,
    FilterType,
    TableFilterSelectOption
} from '@fundamental-ngx/platform/table-helpers';

import { TableViewSettingsFilterComponent } from './table-view-settings-filter.component';

@Component({
    template: `
        <fdp-table-view-settings-filter [column]="column" [label]="label" [type]="type" [values]="values">
            <ng-container *fdpViewSettingsFilterCustomDef> Custom filter template </ng-container>
        </fdp-table-view-settings-filter>
    `,
    standalone: true,
    imports: [TableViewSettingsFilterComponent, FdpViewSettingsFilterCustomDef]
})
class HostTableViewSettingsFilterComponent {
    @ViewChild(TableViewSettingsFilterComponent) filter: TableViewSettingsFilterComponent;

    column = 'table_column_name';
    label = 'Filter label';
    type: FilterType = FilterType.CUSTOM;
    values: TableFilterSelectOption[] = [
        { label: 'Option 1', value: 'option_1' },
        { label: 'Option 2', value: 'option_2' }
    ];
}

describe('TableViewSettingsFilterComponent', () => {
    let hostComponent: HostTableViewSettingsFilterComponent;
    let fixture: ComponentFixture<HostTableViewSettingsFilterComponent>;
    let component: TableViewSettingsFilterComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [HostTableViewSettingsFilterComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HostTableViewSettingsFilterComponent);
        fixture.detectChanges();
        hostComponent = fixture.componentInstance;
        component = hostComponent.filter;
    });

    it('should create', () => {
        expect(hostComponent).toBeTruthy();
    });

    it('Should have "column" binding', () => {
        const column = 'someColumnName';
        hostComponent.column = column;
        fixture.detectChanges();

        expect(component.column).toBe(column);
    });

    it('Should have "label" binding', () => {
        const label = 'filterLabel';
        hostComponent.label = label;
        fixture.detectChanges();

        expect(component.label).toBe(label);
    });

    it('Should have "type" binding', () => {
        const type = FilterType.SINGLE;
        hostComponent.type = type;
        fixture.detectChanges();

        expect(component.type).toBe(type);
    });

    it('Should have "values" binding', () => {
        const values: TableFilterSelectOption[] = [{ label: 'test', value: 'test' }];
        hostComponent.values = values;
        fixture.detectChanges();

        expect(component.values).toBe(values);
    });

    it('Should have reference to projected custom template', () => {
        const values: TableFilterSelectOption[] = [{ label: 'test', value: 'test' }];
        hostComponent.values = values;
        fixture.detectChanges();

        expect(component.customFilterTemplate).toBeInstanceOf(TemplateRef);
    });
});
