import { Component, OnInit } from '@angular/core';

import {
    VhdDataProvider,
    VhdValue,
    VhdValueChangeEvent,
    ValueHelpDialogDataSource,
    VhdIncludedEntity,
    VhdExcludedEntity,
    VhdDefineIncludeStrategy,
    VhdDefineExcludeStrategy
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
    selector: 'fdp-platform-vhd-strategy-labels-example',
    templateUrl: './platform-vhd-strategy-labels-example.component.html'
})
export class PlatformVhdStrategyLabelExampleComponent implements OnInit {
    filters: FilterData[];
    dataSource: ValueHelpDialogDataSource<ExampleTestModel>;

    actualValue: Partial<VhdValue<ExampleTestModel>> = {};
    actualItems = [];

    customStrategyLabels: {
        [key in keyof (typeof VhdDefineIncludeStrategy | typeof VhdDefineExcludeStrategy)]?: string;
    } = {
        equalTo: 'ilingana ne-',
        between: 'FROM...TO'
    };
    formatTokenFn = ((value: Partial<VhdValue<ExampleTestModel>>) => {
        this.actualItems = [
            ...(value.selected || []).map((item) => item.name),
            ...(value.conditions || []).map((item) => this.conditionDisplayFn(item))
        ];
    }).bind(this);

    conditionDisplayFn = (item: VhdIncludedEntity | VhdExcludedEntity): string => {
        const value = (() => {
            switch (item.strategy) {
                case VhdDefineIncludeStrategy.empty:
                case VhdDefineExcludeStrategy.not_empty:
                    return null;
                case VhdDefineIncludeStrategy.between:
                    return `${item.value}...${item.valueTo}`;
                case VhdDefineIncludeStrategy.contains:
                    return `*${item.value}*`;
                case VhdDefineIncludeStrategy.equalTo:
                    return `=${item.value}`;
                case VhdDefineIncludeStrategy.startsWith:
                    return `${item.value}*`;
                case VhdDefineIncludeStrategy.endsWith:
                    return `*${item.value}`;
                case VhdDefineIncludeStrategy.greaterThan:
                    return `>${item.value}`;
                case VhdDefineIncludeStrategy.greaterThanEqual:
                    return `>=${item.value}`;
                case VhdDefineIncludeStrategy.lessThan:
                    return `<${item.value}`;
                case VhdDefineIncludeStrategy.lessThanEqual:
                    return `<=${item.value}`;
                case VhdDefineExcludeStrategy.not_equalTo:
                    return `!(=${item.value})`;
            }
        })();

        return value;
    };

    ngOnInit(): void {
        const data = exampleDataSource();
        this.filters = data.filters;
        this.dataSource = new ValueHelpDialogDataSource(new VhdDataProvider(data.dataSource));
    }

    valueChange($event: VhdValueChangeEvent<ExampleTestModel>): void {
        this.actualValue = { ...$event };
    }
}
