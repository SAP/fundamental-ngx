import { Component } from '@angular/core';

import {
    VhdDataProvider,
    VhdValue,
    VhdValueChangeEvent,
    ValueHelpDialogDataSource
} from '@fundamental-ngx/platform/value-help-dialog';

interface ExampleTestModel {
    id: number;
    name: string;
    code: string;
    city: string;
    zipcode: string;
    address: string;
    nickname: string;
}

interface FilterData {
    key: string;
    name: string;
    label: string;
    advanced: boolean;
}

const exampleDataSource = (): { dataSource: ExampleTestModel[]; filters: FilterData[] } => {
    const dataSource = Array(137)
        .fill(null)
        .map((_value, index) => ({
            id: index + 1,
            name: `Name ${index + 1}`,
            code: `${Math.floor(Math.random() * 99999)}`,
            city: `City ${Math.floor(Math.random() * index)}`,
            zipcode: `zipcode ${Math.floor(Math.random() * index)}`,
            address: `Address ${Math.floor(Math.random() * index)}`,
            nickname: `Nickname ${Math.floor(Math.random() * index)}`
        }));
    return {
        dataSource,
        filters: Object.keys(dataSource[0]).map((value, index) => ({
            key: value,
            name: `${value}`,
            label: `Product ${value}`,
            advanced: index > 0
        }))
    };
};

const data = exampleDataSource();

@Component({
    selector: 'fdp-platform-vhd-loading-example',
    templateUrl: './platform-vhd-loading-example.component.html'
})
export class PlatformVhdLoadingExampleComponent {
    filters = data.filters;
    dataSource = new ValueHelpDialogDataSource(new VhdDataProvider(data.dataSource));

    value: Partial<VhdValue<ExampleTestModel[]>> = {};
    loading = false;

    valueChange($event: VhdValueChangeEvent<ExampleTestModel[]>): void {
        this.value = { ...$event };
    }

    onDataRequested(): void {
        // apply some custom logic here if needed
        this.loading = true;
    }

    onDataReceived(): void {
        // since working with syncronous data, "onDataReceived" is invoked instantly
        // just for demo purpose increasing the time before loading overlay is dismissed
        setTimeout(() => {
            this.loading = false;
        }, 300);
    }
}
