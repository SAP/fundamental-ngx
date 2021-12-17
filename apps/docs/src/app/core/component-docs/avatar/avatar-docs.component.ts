import { Component } from '@angular/core';

import avatarIconTs from '!./examples/avatar-icon-example.component.ts?raw';
import avatarIconHtml from '!./examples/avatar-icon-example.component.html?raw';
import avatarInitialsTs from '!./examples/avatar-initials-example.component.ts?raw';
import avatarInitialsHtml from '!./examples/avatar-initials-example.component.html?raw';
import avatarCircleTs from '!./examples/avatar-circle-example.component.ts?raw';
import avatarCircleHtml from '!./examples/avatar-circle-example.component.html?raw';
import avatarBackgroundImageTs from '!./examples/avatar-background-image-example.component.ts?raw';
import avatarBackgroundImageHtml from '!./examples/avatar-background-image-example.component.html?raw';
import avatarTransparentTs from '!./examples/avatar-transparent-example.component.ts?raw';
import avatarTransparentHtml from '!./examples/avatar-transparent-example.component.html?raw';
import avatarPlaceholderTs from '!./examples/avatar-placeholder-example.component.ts?raw';
import avatarPlaceholderHtml from '!./examples/avatar-placeholder-example.component.html?raw';
import avatarTileTs from '!./examples/avatar-tile-example.component.ts?raw';
import avatarTileHtml from '!./examples/avatar-tile-example.component.html?raw';
import avatarAccentColorsTs from '!./examples/avatar-accent-colors-example.component.ts?raw';
import avatarAccentColorsHtml from '!./examples/avatar-accent-colors-example.component.html?raw';
import avatarZoomIconTs from '!./examples/avatar-zoom-icon-example.component.ts?raw';
import avatarZoomIconHtml from '!./examples/avatar-zoom-icon-example.component.html?raw';
import avatarBordersTs from '!./examples/avatar-borders-example.component.ts?raw';
import avatarBordersHtml from '!./examples/avatar-borders-example.component.html?raw';
import avatarBackgroundWithAlterOptionsImageTs from '!./examples/avatar-default-image-with-alternative-options-example.component.ts?raw';
import avatarBackgroundImageWithAlterOptionsHtml from '!./examples/avatar-default-image-with-alternative-options-example.component.html?raw';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-avatar',
    templateUrl: './avatar-docs.component.html'
})
export class AvatarDocsComponent {
    avatarIcon: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'avatar-icon-example',
            code: avatarIconHtml
        },
        {
            language: 'typescript',
            code: avatarIconTs,
            fileName: 'avatar-icon-example',
            component: 'AvatarIconExampleComponent'
        }
    ];

    avatarInitials: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'avatar-initials-example',
            code: avatarInitialsHtml
        },
        {
            language: 'typescript',
            code: avatarInitialsTs,
            fileName: 'avatar-initials-example',
            component: 'AvatarInitialsExampleComponent'
        }
    ];

    avatarCircle: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'avatar-circle-example',
            code: avatarCircleHtml
        },
        {
            language: 'typescript',
            code: avatarCircleTs,
            fileName: 'avatar-circle-example',
            component: 'AvatarCircleExampleComponent'
        }
    ];

    avatarBackgroundImage: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'avatar-background-image-example',
            code: avatarBackgroundImageHtml
        },
        {
            language: 'typescript',
            code: avatarBackgroundImageTs,
            fileName: 'avatar-background-image-example',
            component: 'AvatarBackgroundImageExampleComponent'
        }
    ];

    avatarTransparent: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'avatar-transparent-example',
            code: avatarTransparentHtml
        },
        {
            language: 'typescript',
            code: avatarTransparentTs,
            fileName: 'avatar-transparent-example',
            component: 'AvatarTransparentExampleComponent'
        }
    ];

    avatarPlaceholder: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'avatar-placeholder-example',
            code: avatarPlaceholderHtml
        },
        {
            language: 'typescript',
            code: avatarPlaceholderTs,
            fileName: 'avatar-placeholder-example',
            component: 'AvatarPlaceholderExampleComponent'
        }
    ];

    avatarTile: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'avatar-tile-example',
            code: avatarTileHtml
        },
        {
            language: 'typescript',
            code: avatarTileTs,
            fileName: 'avatar-tile-example',
            component: 'AvatarTileExampleComponent'
        }
    ];

    avatarAccentColors: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'avatar-accent-colors-example',
            code: avatarAccentColorsHtml
        },
        {
            language: 'typescript',
            code: avatarAccentColorsTs,
            fileName: 'avatar-accent-colors-example',
            component: 'AvatarAccentColorsExampleComponent'
        }
    ];

    avatarZoomIcon: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'avatar-zoom-icon-example',
            code: avatarZoomIconHtml
        },
        {
            language: 'typescript',
            code: avatarZoomIconTs,
            fileName: 'avatar-zoom-icon-example',
            component: 'AvatarZoomIconExampleComponent'
        }
    ];

    avatarBorders: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'avatar-borders-example',
            code: avatarBordersHtml
        },
        {
            language: 'typescript',
            code: avatarBordersTs,
            fileName: 'avatar-borders-example',
            component: 'AvatarBordersExampleComponent'
        }
    ];

    avatarBackgroundImageWithALterOptions: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'avatar-background-image-with-alter-options-example',
            code: avatarBackgroundImageWithAlterOptionsHtml
        },
        {
            language: 'typescript',
            code: avatarBackgroundWithAlterOptionsImageTs,
            fileName: 'avatar-background-image-with-alter-options-example',
            component: 'AvatarBackgroundImageExampleComponent'
        }
    ];
}
