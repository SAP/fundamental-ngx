import { Component, computed, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { DialogBasicSample } from './examples/basic-sample';
import { DialogDraggableResizableSample } from './examples/draggable-resizable-sample';
import { DialogEventsSample } from './examples/events-sample';
import { DialogHeaderFooterSample } from './examples/header-footer-sample';
import { DialogStretchSample } from './examples/stretch-sample';
import { DialogValueStateSample } from './examples/value-state-sample';

const basicSampleHtml = 'basic-sample.html';
const basicSampleTs = 'basic-sample.ts';
const headerFooterSampleHtml = 'header-footer-sample.html';
const headerFooterSampleTs = 'header-footer-sample.ts';
const draggableResizableSampleHtml = 'draggable-resizable-sample.html';
const draggableResizableSampleTs = 'draggable-resizable-sample.ts';
const valueStateSampleHtml = 'value-state-sample.html';
const valueStateSampleTs = 'value-state-sample.ts';
const stretchSampleHtml = 'stretch-sample.html';
const stretchSampleTs = 'stretch-sample.ts';
const eventsSampleHtml = 'events-sample.html';
const eventsSampleTs = 'events-sample.ts';

@Component({
    selector: 'ui5-dialog-docs',
    templateUrl: './dialog-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        DialogBasicSample,
        DialogHeaderFooterSample,
        DialogDraggableResizableSample,
        DialogValueStateSample,
        DialogStretchSample,
        DialogEventsSample
    ]
})
export class DialogDocs {
    private readonly basicExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'basic-sample'
        },
        {
            language: 'typescript',
            component: 'DialogBasicSample',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'basic-sample'
        }
    ]);

    private readonly headerFooterExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(headerFooterSampleHtml),
            originalFileName: 'header-footer-sample'
        },
        {
            language: 'typescript',
            component: 'DialogHeaderFooterSample',
            code: getAssetFromModuleAssets(headerFooterSampleTs),
            originalFileName: 'header-footer-sample'
        }
    ]);

    private readonly draggableResizableExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(draggableResizableSampleHtml),
            originalFileName: 'draggable-resizable-sample'
        },
        {
            language: 'typescript',
            component: 'DialogDraggableResizableSample',
            code: getAssetFromModuleAssets(draggableResizableSampleTs),
            originalFileName: 'draggable-resizable-sample'
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
            component: 'DialogValueStateSample',
            code: getAssetFromModuleAssets(valueStateSampleTs),
            originalFileName: 'value-state-sample'
        }
    ]);

    private readonly stretchExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(stretchSampleHtml),
            originalFileName: 'stretch-sample'
        },
        {
            language: 'typescript',
            component: 'DialogStretchSample',
            code: getAssetFromModuleAssets(stretchSampleTs),
            originalFileName: 'stretch-sample'
        }
    ]);

    private readonly eventsExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(eventsSampleHtml),
            originalFileName: 'events-sample'
        },
        {
            language: 'typescript',
            component: 'DialogEventsSample',
            code: getAssetFromModuleAssets(eventsSampleTs),
            originalFileName: 'events-sample'
        }
    ]);

    readonly basicExamples = computed(() => this.basicExampleFiles());
    readonly headerFooterExamples = computed(() => this.headerFooterExampleFiles());
    readonly draggableResizableExamples = computed(() => this.draggableResizableExampleFiles());
    readonly valueStateExamples = computed(() => this.valueStateExampleFiles());
    readonly stretchExamples = computed(() => this.stretchExampleFiles());
    readonly eventsExamples = computed(() => this.eventsExampleFiles());
}
