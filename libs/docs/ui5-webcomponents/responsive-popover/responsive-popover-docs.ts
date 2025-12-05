import { Component, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { BasicSample } from './examples/basic-sample';
import { EventsSample } from './examples/events-sample';
import { HeaderFooterSample } from './examples/header-footer-sample';
import { ModalSample } from './examples/modal-sample';
import { PlacementSample } from './examples/placement-sample';

const basicSampleTs = 'basic-sample.ts';
const basicSampleHtml = 'basic-sample.html';
const placementSampleTs = 'placement-sample.ts';
const placementSampleHtml = 'placement-sample.html';
const modalSampleTs = 'modal-sample.ts';
const modalSampleHtml = 'modal-sample.html';
const headerFooterSampleTs = 'header-footer-sample.ts';
const headerFooterSampleHtml = 'header-footer-sample.html';
const eventsSampleTs = 'events-sample.ts';
const eventsSampleHtml = 'events-sample.html';

@Component({
    selector: 'ui5-doc-responsive-popover',
    templateUrl: './responsive-popover-docs.html',
    standalone: true,
    imports: [
        CodeExampleComponent,
        ComponentExampleComponent,
        DescriptionComponent,
        DocsSectionTitleComponent,
        SeparatorComponent,
        BasicSample,
        PlacementSample,
        ModalSample,
        HeaderFooterSample,
        EventsSample
    ]
})
export class ResponsivePopoverDocs {
    basicExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'basic-sample',
            component: 'BasicSample',
            typescriptFileCode: getAssetFromModuleAssets(basicSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'basic-sample'
        }
    ]);

    placementExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(placementSampleTs),
            originalFileName: 'placement-sample',
            component: 'PlacementSample',
            typescriptFileCode: getAssetFromModuleAssets(placementSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(placementSampleHtml),
            originalFileName: 'placement-sample'
        }
    ]);

    modalExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(modalSampleTs),
            originalFileName: 'modal-sample',
            component: 'ModalSample',
            typescriptFileCode: getAssetFromModuleAssets(modalSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(modalSampleHtml),
            originalFileName: 'modal-sample'
        }
    ]);

    headerFooterExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(headerFooterSampleTs),
            originalFileName: 'header-footer-sample',
            component: 'HeaderFooterSample',
            typescriptFileCode: getAssetFromModuleAssets(headerFooterSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(headerFooterSampleHtml),
            originalFileName: 'header-footer-sample'
        }
    ]);

    eventsExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(eventsSampleTs),
            originalFileName: 'events-sample',
            component: 'EventsSample',
            typescriptFileCode: getAssetFromModuleAssets(eventsSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(eventsSampleHtml),
            originalFileName: 'events-sample'
        }
    ]);
}
