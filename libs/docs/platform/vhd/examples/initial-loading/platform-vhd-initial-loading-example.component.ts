import { Component } from '@angular/core';

import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { TokenComponent, TokenizerComponent, TokenizerInputDirective } from '@fundamental-ngx/core/token';
import {
    PlatformValueHelpDialogModule,
    ValueHelpDialogDataSource,
    VhdDataProvider,
    VhdDefineExcludeStrategy,
    VhdDefineIncludeStrategy,
    VhdExcludedEntity,
    VhdIncludedEntity,
    VhdValue,
    VhdValueChangeEvent
} from '@fundamental-ngx/platform/value-help-dialog';
import { Observable } from 'rxjs';

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
    selector: 'fdp-platform-vhd-initial-loading-example',
    templateUrl: './platform-vhd-initial-loading-example.component.html',
    imports: [
        ButtonComponent,
        TokenComponent,
        TokenizerComponent,
        TokenizerInputDirective,
        ContentDensityDirective,
        PlatformValueHelpDialogModule
    ]
})
export class PlatformVhdInitialLoadingExampleComponent {
    filters = data.filters;
    dataSource = new ValueHelpDialogDataSource(new DelayedVhdDataProvider(data.dataSource));

    actualValue: Partial<VhdValue<ExampleTestModel>> = {};

    actualItems: string[] = [];
    formatTokenFn = (value: VhdValueChangeEvent<ExampleTestModel>): void => {
        this.actualItems = [
            ...(value.selected || []).map((item) => item.name),
            ...(value.conditions || []).map((item) => this.conditionDisplayFn(item))
        ].filter((v): v is string => !!v);
    };
    conditionDisplayFn = (item: VhdIncludedEntity | VhdExcludedEntity): string | null => {
        let value = (() => {
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
        if (value && item.type === 'exclude') {
            value = `!(${value})`;
        }

        return value;
    };

    valueChange($event: VhdValueChangeEvent<ExampleTestModel>): void {
        this.actualValue = { ...$event };
    }
}

// Simulating real http request by adding 300ms delay to the DataProvider's "fetch" method
class DelayedVhdDataProvider extends VhdDataProvider<any> {
    fetch(params: Map<string, string>): Observable<any> {
        return new Observable();
    }
}
