import { Component } from '@angular/core';
const menuButtonSrc = 'platform-menu-button-example.component.html';
const cozyMenuButtonSrc = 'platform-menu-button-cozy-example.component.html';
const compactMenuButtonSrc = 'platform-menu-button-compact-example.component.html';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-link',
    templateUrl: './platform-menu-button-docs.component.html'
})
export class PlatformMenuButtonDocsComponent {
    cozyMenuButton: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(cozyMenuButtonSrc),
            fileName: 'platform-menu-button-cozy-example'
        }
    ];

    compactMenuButton: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(compactMenuButtonSrc),
            fileName: 'platform-menu-button-compact-example'
        }
    ];

    menuButton: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(menuButtonSrc),
            fileName: 'platform-menu-button-example'
        }
    ];
}
