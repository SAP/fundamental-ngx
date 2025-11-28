import { Component, computed, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { BasicPanelExample } from './examples/basic-sample';
import { CustomHeaderPanelExample } from './examples/custom-header';
import { FixedPanelExample } from './examples/fixed-panel';
import { StickyHeaderPanelExample } from './examples/sticky-header-panel';

const basicSampleHtml = 'basic-sample.html';
const basicSampleTs = 'basic-sample.ts';
const fixedPanelHtml = 'fixed-panel.html';
const fixedPanelTs = 'fixed-panel.ts';
const customHeaderHtml = 'custom-header.html';
const customHeaderTs = 'custom-header.ts';
const stickyHeaderHtml = 'sticky-header-panel.html';
const stickyHeaderTs = 'sticky-header-panel.ts';

@Component({
    selector: 'ui5-panel-docs',
    templateUrl: './panel-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        BasicPanelExample,
        FixedPanelExample,
        StickyHeaderPanelExample,
        CustomHeaderPanelExample
    ]
})
export class PanelDocs {
    private readonly basicExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'basic-sample'
        },
        {
            language: 'typescript',
            component: 'BasicPanelExample',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'basic-sample'
        }
    ]);

    private readonly fixedExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(fixedPanelHtml),
            originalFileName: 'fixed-panel'
        },
        {
            language: 'typescript',
            component: 'FixedPanelExample',
            code: getAssetFromModuleAssets(fixedPanelTs),
            originalFileName: 'fixed-panel'
        }
    ]);

    private readonly stickyHeaderExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(stickyHeaderHtml),
            originalFileName: 'sticky-header-panel'
        },
        {
            language: 'typescript',
            component: 'StickyHeaderPanelExample',
            code: getAssetFromModuleAssets(stickyHeaderTs),
            originalFileName: 'sticky-header-panel'
        }
    ]);

    private readonly customHeaderExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(customHeaderHtml),
            originalFileName: 'custom-header'
        },
        {
            language: 'typescript',
            component: 'CustomHeaderPanelExample',
            code: getAssetFromModuleAssets(customHeaderTs),
            originalFileName: 'custom-header'
        }
    ]);

    readonly basicExamples = computed(() => this.basicExampleFiles());
    readonly fixedExamples = computed(() => this.fixedExampleFiles());
    readonly stickyHeaderExamples = computed(() => this.stickyHeaderExampleFiles());
    readonly customHeaderExamples = computed(() => this.customHeaderExampleFiles());
}
