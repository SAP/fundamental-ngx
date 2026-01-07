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

const basicExampleHtml = 'basic-sample.html';
const basicExampleTs = 'basic-sample.ts';
const designExampleHtml = 'design-switch.html';
const designExampleTs = 'design-switch.ts';

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
        DesignSwitchExample
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

    readonly basicExamples = computed(() => this.basicExampleFiles());
    readonly designExamples = computed(() => this.designExampleFiles());
}
