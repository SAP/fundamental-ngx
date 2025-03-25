import { Component, ViewEncapsulation } from '@angular/core';
import { ComboboxComponent, ComboboxItemDirective } from '@fundamental-ngx/core/combobox';

import { FormsModule } from '@angular/forms';
import { SearchHighlightPipe } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FormControlComponent } from '@fundamental-ngx/core/form';
import { ListTitleDirective } from '@fundamental-ngx/core/list';
import { OptionComponent, SelectComponent } from '@fundamental-ngx/core/select';
import { TokenComponent, TokenizerComponent, TokenizerInputDirective } from '@fundamental-ngx/core/token';
import {
    PlatformValueHelpDialogModule,
    ValueHelpColumnDefDirective,
    ValueHelpDialogDataSource,
    ValueHelpFilterDefDirective,
    VhdDataProvider,
    VhdDefineExcludeStrategy,
    VhdDefineIncludeStrategy,
    VhdExcludedEntity,
    VhdIncludedEntity,
    VhdValue,
    VhdValueChangeEvent
} from '@fundamental-ngx/platform/value-help-dialog';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

interface ExampleTestModel {
    id: number;
    name: string;
    code: string;
    city: string;
    zipcode: string;
    address: string;
    nickname: string;
    verified: boolean;
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
            nickname: `Nickname ${Math.floor(Math.random() * index)}`,
            verified: Math.random() < 0.5
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
    selector: 'fdp-vhd-column-template-example',
    imports: [
        ButtonComponent,
        TokenComponent,
        TokenizerComponent,
        TokenizerInputDirective,
        ContentDensityDirective,
        PlatformValueHelpDialogModule,
        ComboboxComponent,
        ValueHelpFilterDefDirective,
        FormsModule,
        FormControlComponent,
        ValueHelpColumnDefDirective,
        ComboboxItemDirective,
        SearchHighlightPipe,
        ListTitleDirective,
        SelectComponent,
        OptionComponent
    ],
    styles: [
        `
            .vhd-custom-select {
                display: block !important;
            }
        `
    ],
    templateUrl: './platform-vhd-column-template-example.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PlatformVhdColumnTemplateExampleComponent {
    filters = data.filters;
    dataSource = new ValueHelpDialogDataSource(new DelayedVhdDataProvider(data.dataSource));

    actualValue: Partial<VhdValue<ExampleTestModel>> = {};

    booleanDropdownValues = [
        { value: true, displayValue: 'Yes' },
        { value: false, displayValue: 'No' }
    ];

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
class DelayedVhdDataProvider<R extends object> extends VhdDataProvider<R> {
    // Override default fetch method to be able to deal with booleans.
    // Developers should implement own logic of filtering the data. E.g. sending http request to the backend.
    fetch(params: Map<string, string>): Observable<R[]> {
        let values = this.values;
        const arrayParams = Array.from(params);
        const filterFn = (row: R): boolean => {
            const rowEntries = Object.entries(row) as string[][];
            return arrayParams.every(([key, value]) => {
                if (key === '*') {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    return rowEntries.some(([_rowEntryKey, rowEntryValue]) => this._search(rowEntryValue, value));
                } else {
                    return this._search(row[key], value);
                }
            });
        };
        if (params.size) {
            values = this.values.filter(filterFn);
        }
        return of(values).pipe(delay(300));
    }

    private _search(rowEntryValue: any, value: any): boolean {
        if (typeof value === 'boolean') {
            return rowEntryValue === value;
        } else {
            return String(rowEntryValue).toLowerCase().includes(value.toLowerCase());
        }
    }
}
