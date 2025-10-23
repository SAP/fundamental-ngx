import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';

import { BasicPopoverExample } from './examples/basic-popover';

const basicSampleHtml = 'basic-popover.html';
const basicSampleTs = 'basic-popover.ts';

@Component({
    selector: 'ui5-popover-docs',
    templateUrl: './popover-docs.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        BasicPopoverExample
    ]
})
export class PopoverDocs {
    basicPopoverSamples: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            fileName: 'basic-popover'
        },
        {
            language: 'typescript',
            component: 'BasicPopoverExample',
            code: getAssetFromModuleAssets(basicSampleTs),
            fileName: 'basic-popover'
        }
    ];
}
