import { Component } from '@angular/core';

import avatarDefaultExampleHtml from '!./examples/avatar-default-example.component.html?raw';
import avatarDefaultExampleTs from '!./examples/avatar-default-example.component.ts?raw';

import avatarCircleExampleHtml from '!./examples/avatar-circle-example.component.html?raw';
import avatarCircleExampleTs from '!./examples/avatar-circle-example.component.ts?raw';

import avatarIconExampleHtml from '!./examples/avatar-icon-example.component.html?raw';
import avatarIconExampleTs from '!./examples/avatar-icon-example.component.ts?raw';

import avatarInteractiveExampleHtml from '!./examples/avatar-interactive-example.component.html?raw';
import avatarInteractiveExampleTs from '!./examples/avatar-interactive-example.component.ts?raw';

import avatarImageExampleHtml from '!./examples/avatar-image-example.component.html?raw';
import avatarImageExampleTs from '!./examples/avatar-image-example.component.ts?raw';

import avatarFallbackExampleHtml from '!./examples/avatar-fallback-example.component.html?raw';
import avatarFallbackExampleTs from '!./examples/avatar-fallback-example.component.ts?raw';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-avatar',
    templateUrl: './avatar-docs.component.html'
})
export class AvatarDocsComponent {
    avatarDefaultExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'avatar-default-example',
            code: avatarDefaultExampleHtml
        },
        {
            language: 'typescript',
            code: avatarDefaultExampleTs,
            fileName: 'avatar-default-example',
            component: 'AvatarDefaultExampleComponent'
        }
    ];

    avatarCircleExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'avatar-circle-example',
            code: avatarCircleExampleHtml
        },
        {
            language: 'typescript',
            code: avatarCircleExampleTs,
            fileName: 'avatar-circle-example',
            component: 'AvatarCircleExampleComponent'
        }
    ];

    avatarIconExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'avatar-icon-example',
            code: avatarIconExampleHtml
        },
        {
            language: 'typescript',
            code: avatarIconExampleTs,
            fileName: 'avatar-icon-example',
            component: 'AvatarIconExampleComponent'
        }
    ];

    avatarImageExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'avatar-image-example',
            code: avatarImageExampleHtml
        },
        {
            language: 'typescript',
            code: avatarImageExampleTs,
            fileName: 'avatar-image-example',
            component: 'AvatarImageExampleComponent'
        }
    ];

    avatarInteractiveExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'avatar-interactive-example',
            code: avatarInteractiveExampleHtml
        },
        {
            language: 'typescript',
            code: avatarInteractiveExampleTs,
            fileName: 'avatar-interactive-example',
            component: 'AvatarInteractiveExampleComponent'
        }
    ];

    avatarFallbackExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'avatar-fallback-example',
            code: avatarFallbackExampleHtml
        },
        {
            language: 'typescript',
            code: avatarFallbackExampleTs,
            fileName: 'avatar-fallback-example',
            component: 'AvatarFallbackExampleComponent'
        }
    ];
}
