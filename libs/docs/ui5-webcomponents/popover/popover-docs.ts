import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';

import { BasicPopoverExample } from './examples/basic-popover';
import { MinWidthPopoverExample } from './examples/min-width-popover';

const basicSampleHtml = 'basic-popover.html';
const basicSampleTs = 'basic-popover.ts';
const minWidthSampleHtml = 'min-width-popover.html';
const minWidthSampleTs = 'min-width-popover.ts';

@Component({
    selector: 'ui5-popover-docs',
    templateUrl: './popover-docs.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        SeparatorComponent,
        BasicPopoverExample,
        MinWidthPopoverExample
    ]
})
export class PopoverDocs {
    basicPopoverSamples: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'basic-popover'
        },
        {
            language: 'typescript',
            component: 'BasicPopoverExample',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'basic-popover'
        }
    ];

    minWidthPopoverSamples: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(minWidthSampleHtml),
            originalFileName: 'min-width-popover'
        },
        {
            language: 'typescript',
            component: 'MinWidthPopoverExample',
            code: getAssetFromModuleAssets(minWidthSampleTs),
            originalFileName: 'min-width-popover'
        }
    ];
}
