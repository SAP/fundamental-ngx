import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const fliSimpleH = 'fli-simple/fli-simple-example.component.html';
const fliSimpleT = 'fli-simple/fli-simple-example.component.ts';

const fliAvatarH = 'fli-avatar/fli-avatar-example.component.html';
const fliAvatarT = 'fli-avatar/fli-avatar-example.component.ts';

const fliActionH = 'fli-action/fli-action-example.component.html';
const fliActionT = 'fli-action/fli-action-example.component.ts';

const fliFooterH = 'fli-footer/fli-footer-example.component.html';
const fliFooterT = 'fli-footer/fli-footer-example.component.ts';

const fliMobileH = 'fli-mobile/fli-mobile-example.component.html';
const fliMobileT = 'fli-mobile/fli-mobile-example.component.ts';

@Component({
    selector: 'app-feed-list-item-doc',
    templateUrl: './feed-list-item-docs.component.html'
})
export class FeedListItemDocsComponent {
    fliSimpleExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(fliSimpleH),
            fileName: 'fli-simple-example'
        },
        {
            language: 'typescript',
            component: 'FliSimpleExampleComponent',
            code: getAssetFromModuleAssets(fliSimpleT),
            fileName: 'fli-simple-example'
        }
    ];

    fliAvatarExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(fliAvatarH),
            fileName: 'fli-avatar-example'
        },
        {
            language: 'typescript',
            component: 'FliAvatarExampleComponent',
            code: getAssetFromModuleAssets(fliAvatarT),
            fileName: 'fli-avatar-example'
        }
    ];

    fliActionExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(fliActionH),
            fileName: 'fli-action-example'
        },
        {
            language: 'typescript',
            component: 'FliActionExampleComponent',
            code: getAssetFromModuleAssets(fliActionT),
            fileName: 'fli-action-example'
        }
    ];

    fliFooterExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(fliFooterH),
            fileName: 'fli-footer-example'
        },
        {
            language: 'typescript',
            component: 'FliFooterExampleComponent',
            code: getAssetFromModuleAssets(fliFooterT),
            fileName: 'fli-footer-example'
        }
    ];

    fliMobileExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(fliMobileH),
            fileName: 'fli-mobile-example'
        },
        {
            language: 'typescript',
            component: 'FliMobileExampleComponent',
            code: getAssetFromModuleAssets(fliMobileT),
            fileName: 'fli-mobile-example'
        }
    ];
}
