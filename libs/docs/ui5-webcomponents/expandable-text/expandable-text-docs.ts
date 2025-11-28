import { Component, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { ExpandableTextBasicExample } from './examples/basic-sample';
import { ExpandableTextOverflowModePopoverExample } from './examples/overflow-mode-popover';

const basicSampleHtml = 'basic-sample.html';
const basicSampleTs = 'basic-sample.ts';
const overflowModePopoverHtml = 'overflow-mode-popover.html';
const overflowModesPopoverTs = 'overflow-modes.ts';

@Component({
    selector: 'ui5-expandable-text-docs',
    templateUrl: './expandable-text-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        ExpandableTextBasicExample,
        ExpandableTextOverflowModePopoverExample
    ]
})
export class ExpandableTextDocs {
    readonly basicSamples = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'expandable-text-basic-example'
        },
        {
            language: 'typescript',
            component: 'ExpandableTextBasicExample',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'expandable-text-basic-example'
        }
    ]);

    readonly overflowModePopoverSamples = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(overflowModePopoverHtml),
            originalFileName: 'expandable-text-overflow-mode-popover-example'
        },
        {
            language: 'typescript',
            component: 'ExpandableTextOverflowModesExample',
            code: getAssetFromModuleAssets(overflowModesPopoverTs),
            originalFileName: 'expandable-text-overflow-mode-popover-example'
        }
    ]);
}
