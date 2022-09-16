import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const standardlinkSrc = 'platform-link-standard-example.component.html';
const emphasizedlinkSrc = 'platform-link-emphasized-example.component.html';
const disabledlinkSrc = 'platform-link-disabled-example.component.html';
const disabledEmphasizedlinkSrc = 'platform-link-disabled-emphasized-example.component.html';
const invertedlinkSrc = 'platform-link-inverted-example.component.html';
const truncatedlinkSrc = 'platform-link-truncated-example.component.html';
const iconlinkSrc = 'platform-link-icon-example.component.html';

@Component({
    selector: 'app-link',
    templateUrl: './platform-link-docs.component.html'
})
export class PlatformLinkDocsComponent {
    standardLink: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(standardlinkSrc),
            fileName: 'platform-link-standard-example'
        }
    ];

    emphasizedLink: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(emphasizedlinkSrc),
            fileName: 'platform-link-emphasized-example'
        }
    ];

    disabledLink: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(disabledlinkSrc),
            fileName: 'platform-link-disabled-example'
        }
    ];

    disabledEmphasizedLink: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(disabledEmphasizedlinkSrc),
            fileName: 'platform-link-disabled-emphasized-example'
        }
    ];

    invertedLink: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(invertedlinkSrc),
            fileName: 'platform-link-inverted-example'
        }
    ];

    truncatedLink: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(truncatedlinkSrc),
            fileName: 'platform-link-truncated-example'
        }
    ];

    iconLink: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(iconlinkSrc),
            fileName: 'platform-link-icon-example'
        }
    ];
}
