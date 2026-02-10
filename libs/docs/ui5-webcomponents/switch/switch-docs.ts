import { Component, computed, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { BasicSwitchExample } from './examples/basic-sample';
import { DesignSwitchExample } from './examples/design-switch';
import { ReactiveFormSwitchExample } from './examples/reactive-forms-sample';

const basicExampleHtml = 'basic-sample.html';
const basicExampleTs = 'basic-sample.ts';
const designExampleHtml = 'design-switch.html';
const designExampleTs = 'design-switch.ts';
const reactiveFormsExampleHtml = 'reactive-forms-sample.html';
const reactiveFormsExampleTs = 'reactive-forms-sample.ts';

@Component({
    selector: 'ui5-switch-docs',
    templateUrl: './switch-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        BasicSwitchExample,
        DesignSwitchExample,
        ReactiveFormSwitchExample
    ]
})
export class SwitchDocs {
    private readonly basicExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicExampleHtml),
            originalFileName: 'basic-sample'
        },
        {
            language: 'typescript',
            component: 'BasicSwitchExample',
            code: getAssetFromModuleAssets(basicExampleTs),
            originalFileName: 'basic-sample'
        }
    ]);

    private readonly designExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(designExampleHtml),
            originalFileName: 'design-switch'
        },
        {
            language: 'typescript',
            component: 'DesignSwitchExample',
            code: getAssetFromModuleAssets(designExampleTs),
            originalFileName: 'design-switch'
        }
    ]);

    private readonly reactiveFormsExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(reactiveFormsExampleHtml),
            originalFileName: 'reactive-forms-sample'
        },
        {
            language: 'typescript',
            component: 'ReactiveFormSwitchExample',
            code: getAssetFromModuleAssets(reactiveFormsExampleTs),
            originalFileName: 'reactive-forms-sample'
        }
    ]);

    readonly basicExamples = computed(() => this.basicExampleFiles());
    readonly designExamples = computed(() => this.designExampleFiles());
    readonly reactiveFormsExamples = computed(() => this.reactiveFormsExampleFiles());
}
