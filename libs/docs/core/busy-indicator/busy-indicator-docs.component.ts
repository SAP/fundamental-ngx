import { Component, ViewEncapsulation } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { BusyIndicatorWrapperExampleComponent } from './examples/busy-indicator-wrapper-example.component';
import { BusyIndicatorExtendedExampleComponent } from './examples/busy-indicator-extended-example.component';
import { BusyIndicatorLabelExampleComponent } from './examples/busy-indicator-label-example.component';
import { BusyIndicatorSizeExampleComponent } from './examples/busy-indicator-size-example.component';
import { SeparatorComponent } from '../../shared/src/lib/core-helpers/seperator/seperator.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { BusyIndicatorBasicExampleComponent } from './examples/busy-indicator-basic-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

const BusyIndicatorHtml = 'busy-indicator-basic-example.component.html';
const BusyIndicatorSizeHtml = 'busy-indicator-size-example.component.html';
const BusyIndicatorSizeTs = 'busy-indicator-size-example.component.ts';
const BusyIndicatorLabelHtml = 'busy-indicator-label-example.component.html';
const BusyIndicatorExtendedHtml = 'busy-indicator-extended-example.component.html';
const BusyIndicatorExtendedTs = 'busy-indicator-extended-example.component.ts';
const BusyIndicatorWrapperTs = 'busy-indicator-wrapper-example.component.ts';
const BusyIndicatorWrapperHtml = 'busy-indicator-wrapper-example.component.html';

@Component({
    selector: 'app-busy-indicator-docs',
    templateUrl: './busy-indicator-docs.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        BusyIndicatorBasicExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        BusyIndicatorSizeExampleComponent,
        BusyIndicatorLabelExampleComponent,
        BusyIndicatorExtendedExampleComponent,
        BusyIndicatorWrapperExampleComponent
    ]
})
export class BusyIndicatorDocsComponent {
    busyIndicatorBasicExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(BusyIndicatorHtml),
            fileName: 'busy-indicator-basic-example'
        }
    ];
    busyIndicatorSizeExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(BusyIndicatorSizeHtml),
            fileName: 'busy-indicator-size-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(BusyIndicatorSizeTs),
            fileName: 'busy-indicator-size-example',
            component: 'BusyIndicatorSizeExampleComponent'
        }
    ];
    busyIndicatorLabelExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(BusyIndicatorLabelHtml),
            fileName: 'busy-indicator-label-example'
        }
    ];
    busyIndicatorExtendedExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(BusyIndicatorExtendedHtml),
            fileName: 'busy-indicator-extended-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(BusyIndicatorExtendedTs),
            fileName: 'busy-indicator-extended-example',
            component: 'BusyIndicatorExtendedExampleComponent'
        }
    ];
    busyIndicatorWrapperExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(BusyIndicatorWrapperHtml),
            fileName: 'busy-indicator-wrapper-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(BusyIndicatorWrapperTs),
            fileName: 'busy-indicator-wrapper-example',
            component: 'BusyIndicatorWrapperExampleComponent'
        }
    ];
}
