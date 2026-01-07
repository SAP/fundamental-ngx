import { Component, computed, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { BasicStepInputExample } from './examples/basic-step-input';
import { PrecisionStepInputExample } from './examples/precision-step-input';
import { RangeStepInputExample } from './examples/range-step-input';
import { ValueStateStepInputExample } from './examples/value-state-step-input';

const basicExampleHtml = 'basic-step-input.html';
const basicExampleTs = 'basic-step-input.ts';
const rangeExampleHtml = 'range-step-input.html';
const rangeExampleTs = 'range-step-input.ts';
const precisionExampleHtml = 'precision-step-input.html';
const precisionExampleTs = 'precision-step-input.ts';
const valueStateExampleHtml = 'value-state-step-input.html';
const valueStateExampleTs = 'value-state-step-input.ts';

@Component({
    selector: 'ui5-step-input-docs',
    templateUrl: './step-input-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        BasicStepInputExample,
        RangeStepInputExample,
        PrecisionStepInputExample,
        ValueStateStepInputExample
    ]
})
export class StepInputDocs {
    private readonly basicExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicExampleHtml),
            originalFileName: 'basic-step-input'
        },
        {
            language: 'typescript',
            component: 'BasicStepInputExample',
            code: getAssetFromModuleAssets(basicExampleTs),
            originalFileName: 'basic-step-input'
        }
    ]);

    private readonly rangeExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(rangeExampleHtml),
            originalFileName: 'range-step-input'
        },
        {
            language: 'typescript',
            component: 'RangeStepInputExample',
            code: getAssetFromModuleAssets(rangeExampleTs),
            originalFileName: 'range-step-input'
        }
    ]);

    private readonly precisionExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(precisionExampleHtml),
            originalFileName: 'precision-step-input'
        },
        {
            language: 'typescript',
            component: 'PrecisionStepInputExample',
            code: getAssetFromModuleAssets(precisionExampleTs),
            originalFileName: 'precision-step-input'
        }
    ]);

    private readonly valueStateExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(valueStateExampleHtml),
            originalFileName: 'value-state-step-input'
        },
        {
            language: 'typescript',
            component: 'ValueStateStepInputExample',
            code: getAssetFromModuleAssets(valueStateExampleTs),
            originalFileName: 'value-state-step-input'
        }
    ]);

    readonly basicExamples = computed(() => this.basicExampleFiles());
    readonly rangeExamples = computed(() => this.rangeExampleFiles());
    readonly precisionExamples = computed(() => this.precisionExampleFiles());
    readonly valueStateExamples = computed(() => this.valueStateExampleFiles());
}
