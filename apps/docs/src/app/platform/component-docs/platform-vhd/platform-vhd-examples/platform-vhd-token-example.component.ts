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

const exampleDataSource = () => {
    const dataSource = Array(100)
        .fill(null)
        .map((_value, index) => ({
            id: index + 1,
            name: `Name ${index}`,
            code: Math.floor(Math.random() * 99999),
            city: `City ${Math.floor(Math.random() * index)}`
        }));
    return {
        dataSource: dataSource,
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
    filters: any;
    dataSource: ValueHelpDialogDataSource<ExampleTestModel>;
    hasAdvanced = false;
    selectedValue = [];
    currentValue: Partial<VhdValue> = {};

    ngOnInit(): void {
        const data = exampleDataSource();
        this.filters = data.filters;
        this.dataSource = new ValueHelpDialogDataSource(new VhdDataProvider(data.dataSource));
    }

    tokenizerFn = (row: ExampleTestModel) => `${row.name} (Id: ${row.id})`;

    valueChange($event: VhdValueChangeEvent<ExampleTestModel[]>): void {
        console.log($event);
        this.currentValue = $event;
        this.selectedValue = [...($event.selected || [])];
    }
}
