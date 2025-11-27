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
import { ComboBoxFilterSample } from './examples/filter';
import { ComboBoxItemsGroupingSample } from './examples/items-grouping';
import { ComboBoxStatesSample } from './examples/states';
import { ComboBoxValueStateSample } from './examples/value-state';

const basicSampleHtml = 'basic-sample.html';
const basicSampleTs = 'basic-sample.ts';
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
            fileName: 'basic-sample'
        },
        {
            language: 'typescript',
            component: 'ComboBoxBasicSample',
            code: getAssetFromModuleAssets(basicSampleTs),
            fileName: 'basic-sample'
        }
    ]);

    private readonly valueStateExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(valueStateHtml),
            fileName: 'value-state'
        },
        {
            language: 'typescript',
            component: 'ComboBoxValueStateSample',
            code: getAssetFromModuleAssets(valueStateTs),
            fileName: 'value-state'
        }
    ]);

    private readonly filterExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(filterHtml),
            fileName: 'filter'
        },
        {
            language: 'typescript',
            component: 'ComboBoxFilterSample',
            code: getAssetFromModuleAssets(filterTs),
            fileName: 'filter'
        }
    ]);

    private readonly statesExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(statesHtml),
            fileName: 'states'
        },
        {
            language: 'typescript',
            component: 'ComboBoxStatesSample',
            code: getAssetFromModuleAssets(statesTs),
            fileName: 'states'
        }
    ]);

    private readonly additionalTextExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(additionalTextHtml),
            fileName: 'additional-text'
        },
        {
            language: 'typescript',
            component: 'ComboBoxAdditionalTextSample',
            code: getAssetFromModuleAssets(additionalTextTs),
            fileName: 'additional-text'
        }
    ]);

    private readonly clearIconExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(clearIconHtml),
            fileName: 'clear-icon'
        },
        {
            language: 'typescript',
            component: 'ComboBoxClearIconSample',
            code: getAssetFromModuleAssets(clearIconTs),
            fileName: 'clear-icon'
        }
    ]);

    private readonly itemsGroupingExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(itemsGroupingHtml),
            fileName: 'items-grouping'
        },
        {
            language: 'typescript',
            component: 'ComboBoxItemsGroupingSample',
            code: getAssetFromModuleAssets(itemsGroupingTs),
            fileName: 'items-grouping'
        }
    ]);

    basicExamples = computed(() => this.basicExampleFiles());
    valueStateExamples = computed(() => this.valueStateExampleFiles());
    filterExamples = computed(() => this.filterExampleFiles());
    statesExamples = computed(() => this.statesExampleFiles());
    additionalTextExamples = computed(() => this.additionalTextExampleFiles());
    clearIconExamples = computed(() => this.clearIconExampleFiles());
    itemsGroupingExamples = computed(() => this.itemsGroupingExampleFiles());
}
