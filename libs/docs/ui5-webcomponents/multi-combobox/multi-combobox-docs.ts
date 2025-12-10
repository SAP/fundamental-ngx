import { Component, computed, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { MultiComboBoxBasicExample } from './examples/basic-sample';
import { MultiComboBoxClearIconExample } from './examples/clear-icon-sample';
import { MultiComboBoxDisabledAndReadonlyExample } from './examples/disabled-and-readonly-sample';
import { MultiComboBoxGroupedItemsExample } from './examples/grouped-items-sample';
import { MultiComboBoxSelectAllItemsExample } from './examples/select-all-items';
import { MultiComboBoxTextWrappingExample } from './examples/text-wrapping-sample';
import { MultiComboBoxValueStateExample } from './examples/value-state-sample';

const basicSampleHtml = 'multi-combobox-sample.html';
const basicSampleTs = 'multi-combobox-sample.ts';
const valueStateSampleHtml = 'value-state-sample.html';
const valueStateSampleTs = 'value-state-sample.ts';
const disabledAndReadonlySampleHtml = 'disabled-and-readonly-sample.html';
const disabledAndReadonlySampleTs = 'disabled-and-readonly-sample.ts';
const groupedItemsSampleHtml = 'grouped-items-sample.html';
const groupedItemsSampleTs = 'grouped-items-sample.ts';
const clearIconSampleHtml = 'clear-icon-sample.html';
const clearIconSampleTs = 'clear-icon-sample.ts';
const selectAllItemsSampleHtml = 'select-all-items.html';
const selectAllItemsSampleTs = 'select-all-items.ts';
const textWrappingSampleHtml = 'text-wrapping-sample.html';
const textWrappingSampleTs = 'text-wrapping-sample.ts';

@Component({
    selector: 'ui5-multi-combobox-docs',
    templateUrl: './multi-combobox-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        MultiComboBoxBasicExample,
        MultiComboBoxValueStateExample,
        MultiComboBoxDisabledAndReadonlyExample,
        MultiComboBoxGroupedItemsExample,
        MultiComboBoxClearIconExample,
        MultiComboBoxSelectAllItemsExample,
        MultiComboBoxTextWrappingExample
    ]
})
export class MultiComboBoxDocs {
    private readonly basicExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'basic-sample'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(basicSampleTs),
            component: 'MultiComboBoxBasicExample',
            originalFileName: 'basic-sample'
        }
    ]);

    private readonly valueStateExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(valueStateSampleHtml),
            originalFileName: 'value-state-sample'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(valueStateSampleTs),
            component: 'MultiComboBoxValueStateExample',
            originalFileName: 'value-state-sample'
        }
    ]);

    private readonly disabledAndReadonlyExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(disabledAndReadonlySampleHtml),
            originalFileName: 'disabled-and-readonly-sample'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(disabledAndReadonlySampleTs),
            component: 'MultiComboBoxDisabledAndReadonlyExample',
            originalFileName: 'disabled-and-readonly-sample'
        }
    ]);

    private readonly groupedItemsExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(groupedItemsSampleHtml),
            originalFileName: 'grouped-items-sample'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(groupedItemsSampleTs),
            component: 'MultiComboBoxGroupedItemsExample',
            originalFileName: 'grouped-items-sample'
        }
    ]);

    private readonly clearIconExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(clearIconSampleHtml),
            originalFileName: 'clear-icon-sample'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(clearIconSampleTs),
            component: 'MultiComboBoxClearIconExample',
            originalFileName: 'clear-icon-sample'
        }
    ]);

    private readonly selectAllItemsExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(selectAllItemsSampleHtml),
            originalFileName: 'select-all-items'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(selectAllItemsSampleTs),
            component: 'MultiComboBoxSelectAllItemsExample',
            originalFileName: 'select-all-items'
        }
    ]);

    private readonly textWrappingExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(textWrappingSampleHtml),
            originalFileName: 'text-wrapping-sample'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(textWrappingSampleTs),
            component: 'MultiComboBoxTextWrappingExample',
            originalFileName: 'text-wrapping-sample'
        }
    ]);

    readonly basicExamples = computed(() => this.basicExampleFiles());
    readonly valueStateExamples = computed(() => this.valueStateExampleFiles());
    readonly disabledAndReadonlyExamples = computed(() => this.disabledAndReadonlyExampleFiles());
    readonly groupedItemsExamples = computed(() => this.groupedItemsExampleFiles());
    readonly clearIconExamples = computed(() => this.clearIconExampleFiles());
    readonly selectAllItemsExamples = computed(() => this.selectAllItemsExampleFiles());
    readonly textWrappingExamples = computed(() => this.textWrappingExampleFiles());
}
