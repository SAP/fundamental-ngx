import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const platformFooterExampleHtml = 'platform-page-footer-example.component.html';
const platformFooterWithIconHtml = 'platform-page-footer-with-icon-example.component.html';
const platformFooterWithMultipleLineHtml = 'platform-page-footer-multiple-line-example.component.html';

@Component({
    selector: 'fdp-platform-page-footer-docs',
    templateUrl: './platform-page-footer-docs.component.html'
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
