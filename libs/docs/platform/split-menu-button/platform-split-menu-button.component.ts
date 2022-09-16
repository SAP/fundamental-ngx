import { Component } from '@angular/core';
const splitMenuButtonTypesHtml = 'platform-split-button-types-example.component.html';
const splitMenuButtonTypesCode = 'platform-split-button-types-example.component.ts';
const splitMenuButtonIconsHtml = 'platform-split-button-icons-example.component.html';
const splitMenuButtonIconsCode = 'platform-split-button-icons-example.component.ts';
const splitMenuButtonBehaviorHtml = 'platform-split-button-behaviors-example.component.html';
const splitMenuButtonBehaviorCode = 'platform-split-button-behaviors-example.component.ts';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-split-menu-button',
    templateUrl: './platform-split-menu-button.component.html'
})
export class PlatformDocsSplitMenuButtonComponent {
    splitMenuButtonBehavior: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(splitMenuButtonBehaviorHtml),
            fileName: 'platform-split-button-behaviors-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(splitMenuButtonBehaviorCode),
            fileName: 'platform-split-button-behaviors-example',
            component: 'PlatformDocsSplitMenuButtonBehaviorComponent'
        }
    ];

    splitMenuButtonTypes: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(splitMenuButtonTypesHtml),
            fileName: 'platform-split-button-types-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(splitMenuButtonTypesCode),
            fileName: 'platform-split-button-types-example',
            component: 'PlatformDocsSplitMenuButtonTypesComponent'
        }
    ];

    splitMenuButtonIcons: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(splitMenuButtonIconsHtml),
            fileName: 'platform-split-button-icons-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(splitMenuButtonIconsCode),
            fileName: 'platform-split-button-icons-example',
            component: 'PlatformDocsSplitMenuButtonIconsComponent'
        }
    ];
}
