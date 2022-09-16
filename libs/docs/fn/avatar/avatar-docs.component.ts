import { Component } from '@angular/core';

const avatarDefaultExampleHtml = 'avatar-default-example.component.html';
const avatarDefaultExampleTs = 'avatar-default-example.component.ts';

const avatarCircleExampleHtml = 'avatar-circle-example.component.html';
const avatarCircleExampleTs = 'avatar-circle-example.component.ts';

const avatarIconExampleHtml = 'avatar-icon-example.component.html';
const avatarIconExampleTs = 'avatar-icon-example.component.ts';

const avatarInteractiveExampleHtml = 'avatar-interactive-example.component.html';
const avatarInteractiveExampleTs = 'avatar-interactive-example.component.ts';

const avatarImageExampleHtml = 'avatar-image-example.component.html';
const avatarImageExampleTs = 'avatar-image-example.component.ts';

const avatarFallbackExampleHtml = 'avatar-fallback-example.component.html';
const avatarFallbackExampleTs = 'avatar-fallback-example.component.ts';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-avatar',
    templateUrl: './avatar-docs.component.html'
})
export class AvatarDocsComponent {
    avatarDefaultExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'avatar-default-example',
            code: getAssetFromModuleAssets(avatarDefaultExampleHtml)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(avatarDefaultExampleTs),
            fileName: 'avatar-default-example',
            component: 'AvatarDefaultExampleComponent'
        }
    ];

    avatarCircleExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'avatar-circle-example',
            code: getAssetFromModuleAssets(avatarCircleExampleHtml)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(avatarCircleExampleTs),
            fileName: 'avatar-circle-example',
            component: 'AvatarCircleExampleComponent'
        }
    ];

    avatarIconExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'avatar-icon-example',
            code: getAssetFromModuleAssets(avatarIconExampleHtml)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(avatarIconExampleTs),
            fileName: 'avatar-icon-example',
            component: 'AvatarIconExampleComponent'
        }
    ];

    avatarImageExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'avatar-image-example',
            code: getAssetFromModuleAssets(avatarImageExampleHtml)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(avatarImageExampleTs),
            fileName: 'avatar-image-example',
            component: 'AvatarImageExampleComponent'
        }
    ];

    avatarInteractiveExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'avatar-interactive-example',
            code: getAssetFromModuleAssets(avatarInteractiveExampleHtml)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(avatarInteractiveExampleTs),
            fileName: 'avatar-interactive-example',
            component: 'AvatarInteractiveExampleComponent'
        }
    ];

    avatarFallbackExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'avatar-fallback-example',
            code: getAssetFromModuleAssets(avatarFallbackExampleHtml)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(avatarFallbackExampleTs),
            fileName: 'avatar-fallback-example',
            component: 'AvatarFallbackExampleComponent'
        }
    ];
}
