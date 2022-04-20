import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

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

@Component({
    selector: 'fdp-platform-vhd-multi-input-example',
    templateUrl: './platform-vhd-multi-input-example.component.html'
})
export class PlatformVhdMultiInputExampleComponent implements OnInit {
    filters: FilterData[];
    originalData: ExampleTestModel[];
    dataSource: ValueHelpDialogDataSource<ExampleTestModel>;
    currentValue: Partial<VhdValue> = {};
    selected: ExampleTestModel[] = [];

    constructor(private readonly _changeDetectorRef: ChangeDetectorRef) {}

    ngOnInit(): void {
        const data = exampleDataSource();
        this.filters = data.filters;
        this.originalData = data.dataSource;
        this.dataSource = new ValueHelpDialogDataSource(new VhdDataProvider(data.dataSource));
    }

    valueChange($event: VhdValueChangeEvent<ExampleTestModel>): void {
        this.selected = [...$event.selected];
        this._changeDetectorRef.detectChanges();
    }

    displayFunc(obj: any): string {
        return obj.name.toLocaleUpperCase();
    }

    multiSelectChange(): void {
        this.currentValue.selected = this.selected;
        this._changeDetectorRef.detectChanges();
    }

    parseFunc(value: string): Record<string, any> {
        if (value && value.length) {
            return { name: value, id: Date.now() };
        }
    }
}
