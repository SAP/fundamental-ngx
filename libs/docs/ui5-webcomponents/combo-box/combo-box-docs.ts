import { Component, computed, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { ComboBoxAdditionalTextSample } from './examples/additional-text';
import { ComboBoxBasicSample } from './examples/basic-sample';
import { ComboBoxClearIconSample } from './examples/clear-icon';
import { ComboBoxCustomItemsSample } from './examples/custom-items-sample';
import { ComboBoxFilterSample } from './examples/filter';
import { ComboBoxItemsGroupingSample } from './examples/items-grouping';
import { ComboBoxSelectionTriggerSample } from './examples/selection-trigger-sample';
import { ComboBoxStatesSample } from './examples/states';
import { ComboBoxValueStateSample } from './examples/value-state';

const basicSampleHtml = 'basic-sample.html';
const basicSampleTs = 'basic-sample.ts';
const selectionTriggerHtml = 'selection-trigger-sample.html';
const selectionTriggerTs = 'selection-trigger-sample.ts';
const customItemsHtml = 'custom-items-sample.html';
const customItemsTs = 'custom-items-sample.ts';
const valueStateHtml = 'value-state.html';
const valueStateTs = 'value-state.ts';
const filterHtml = 'filter.html';
const filterTs = 'filter.ts';
const statesHtml = 'states.html';
const statesTs = 'states.ts';
const additionalTextHtml = 'additional-text.html';
const additionalTextTs = 'additional-text.ts';
const clearIconHtml = 'clear-icon.html';
const clearIconTs = 'clear-icon.ts';
const itemsGroupingHtml = 'items-grouping.html';
const itemsGroupingTs = 'items-grouping.ts';

@Component({
    selector: 'ui5-combo-box-docs',
    templateUrl: './combo-box-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        ComboBoxBasicSample,
        ComboBoxSelectionTriggerSample,
        ComboBoxCustomItemsSample,
        ComboBoxValueStateSample,
        ComboBoxFilterSample,
        ComboBoxStatesSample,
        ComboBoxAdditionalTextSample,
        ComboBoxClearIconSample,
        ComboBoxItemsGroupingSample
    ]
})
export class ComboBoxDocs {
    private readonly basicExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'basic-sample'
        },
        {
            language: 'typescript',
            component: 'ComboBoxBasicSample',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'basic-sample'
        }
    ]);

    private readonly selectionTriggerExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(selectionTriggerHtml),
            originalFileName: 'selection-trigger-sample'
        },
        {
            language: 'typescript',
            component: 'ComboBoxSelectionTriggerSample',
            code: getAssetFromModuleAssets(selectionTriggerTs),
            originalFileName: 'selection-trigger-sample'
        }
    ]);

    private readonly valueStateExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(valueStateHtml),
            originalFileName: 'value-state'
        },
        {
            language: 'typescript',
            component: 'ComboBoxValueStateSample',
            code: getAssetFromModuleAssets(valueStateTs),
            originalFileName: 'value-state'
        }
    ]);

    private readonly filterExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(filterHtml),
            originalFileName: 'filter'
        },
        {
            language: 'typescript',
            component: 'ComboBoxFilterSample',
            code: getAssetFromModuleAssets(filterTs),
            originalFileName: 'filter'
        }
    ]);

    private readonly statesExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(statesHtml),
            originalFileName: 'states'
        },
        {
            language: 'typescript',
            component: 'ComboBoxStatesSample',
            code: getAssetFromModuleAssets(statesTs),
            originalFileName: 'states'
        }
    ]);

    private readonly additionalTextExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(additionalTextHtml),
            originalFileName: 'additional-text'
        },
        {
            language: 'typescript',
            component: 'ComboBoxAdditionalTextSample',
            code: getAssetFromModuleAssets(additionalTextTs),
            originalFileName: 'additional-text'
        }
    ]);

    private readonly clearIconExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(clearIconHtml),
            originalFileName: 'clear-icon'
        },
        {
            language: 'typescript',
            component: 'ComboBoxClearIconSample',
            code: getAssetFromModuleAssets(clearIconTs),
            originalFileName: 'clear-icon'
        }
    ]);

    private readonly customItemsExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(customItemsHtml),
            originalFileName: 'custom-items-sample'
        },
        {
            language: 'typescript',
            component: 'ComboBoxCustomItemsSample',
            code: getAssetFromModuleAssets(customItemsTs),
            originalFileName: 'custom-items-sample'
        }
    ]);

    private readonly itemsGroupingExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(itemsGroupingHtml),
            originalFileName: 'items-grouping'
        },
        {
            language: 'typescript',
            component: 'ComboBoxItemsGroupingSample',
            code: getAssetFromModuleAssets(itemsGroupingTs),
            originalFileName: 'items-grouping'
        }
    ]);

    basicExamples = computed(() => this.basicExampleFiles());
    selectionTriggerExamples = computed(() => this.selectionTriggerExampleFiles());
    customItemsExamples = computed(() => this.customItemsExampleFiles());
    valueStateExamples = computed(() => this.valueStateExampleFiles());
    filterExamples = computed(() => this.filterExampleFiles());
    statesExamples = computed(() => this.statesExampleFiles());
    additionalTextExamples = computed(() => this.additionalTextExampleFiles());
    clearIconExamples = computed(() => this.clearIconExampleFiles());
    itemsGroupingExamples = computed(() => this.itemsGroupingExampleFiles());
}
