import { Component, OnInit } from '@angular/core';

import {
    VhdDataProvider,
    VhdValue,
    VhdValueChangeEvent,
    ValueHelpDialogDataSource
} from '@fundamental-ngx/platform/value-help-dialog';

interface ExampleTestModel {
    id: number;
    name: string;
    code: number;
    city: string;
}

interface FilterData {
    key: string;
    // name: string,
    label: string;
    advanced: boolean;
}

const exampleDataSource = (): { dataSource: ExampleTestModel[]; filters: FilterData[] } => {
    const dataSource = Array(100)
        .fill(null)
        .map((_value, index) => ({
            id: index + 1,
            name: `Name ${index}`,
            code: Math.floor(Math.random() * 99999),
            city: `City ${Math.floor(Math.random() * index)}`
        }));
    return {
        dataSource,
        filters: Object.keys(dataSource[0]).map((value, index) => ({
            key: value,
            label: `Product ${value}`,
            advanced: index > 0
        }))
    };
};

@Component({
    selector: 'fdp-platform-vhd-token-example',
    templateUrl: './platform-vhd-token-example.component.html'
})
export class PlatformVhdTokenExampleComponent implements OnInit {
    filters: FilterData[];
    dataSource: ValueHelpDialogDataSource<ExampleTestModel>;
    hasAdvanced = false;
    selectedValue: ExampleTestModel[] = [];
    currentValue: Partial<VhdValue> = {};

    ngOnInit(): void {
        const data = exampleDataSource();
        this.filters = data.filters;
        this.dataSource = new ValueHelpDialogDataSource(new VhdDataProvider(data.dataSource));
    }

    tokenizerFn = (row: ExampleTestModel): string => `${row.name} (Id: ${row.id})`;

    valueChange(event: VhdValueChangeEvent<ExampleTestModel>): void {
        this.currentValue = event;
        this.selectedValue = [...(event.selected || [])];
    }
}
