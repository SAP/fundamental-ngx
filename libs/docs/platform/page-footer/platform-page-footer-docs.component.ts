import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import {
    PlatformPageFooterExampleComponent,
    PlatformPageFooterMultipleLineExampleComponent,
    PlatformPageFooterWithIconExampleComponent
} from './examples/platform-page-footer-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

const platformFooterExampleHtml = 'platform-page-footer-example.component.html';
const platformFooterWithIconHtml = 'platform-page-footer-with-icon-example.component.html';
const platformFooterWithMultipleLineHtml = 'platform-page-footer-multiple-line-example.component.html';

@Component({
    selector: 'fdp-platform-page-footer-docs',
    templateUrl: './platform-page-footer-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        PlatformPageFooterExampleComponent,
        CodeExampleComponent,
        PlatformPageFooterMultipleLineExampleComponent,
        PlatformPageFooterWithIconExampleComponent
    ]
})
export class PlatformPageFooterDocsComponent {
    PlatformDefaultFooter: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformFooterExampleHtml),
            fileName: 'platform-footer-example'
        }
    ];
    PlatformMultiLineFooter: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformFooterWithMultipleLineHtml),
            fileName: 'platform-footer-multiple-line-example'
        }
    ];
    PlatformWithIconFooter: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformFooterWithIconHtml),
            fileName: 'platform-footer-with-icon-example'
        }
    ];
}
