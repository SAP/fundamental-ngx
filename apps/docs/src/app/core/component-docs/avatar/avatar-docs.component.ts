import { Component } from '@angular/core';

import * as avatarIconTs from '!raw-loader!./examples/avatar-icon-example.component.ts';
import * as avatarIconHtml from '!raw-loader!./examples/avatar-icon-example.component.html';
import * as avatarInitialsTs from '!raw-loader!./examples/avatar-initials-example.component.ts';
import * as avatarInitialsHtml from '!raw-loader!./examples/avatar-initials-example.component.html';
import * as avatarCircleTs from '!raw-loader!./examples/avatar-circle-example.component.ts';
import * as avatarCircleHtml from '!raw-loader!./examples/avatar-circle-example.component.html';
import * as avatarBackgroundImageTs from '!raw-loader!./examples/avatar-background-image-example.component.ts';
import * as avatarBackgroundImageHtml from '!raw-loader!./examples/avatar-background-image-example.component.html';
import * as avatarTransparentTs from '!raw-loader!./examples/avatar-transparent-example.component.ts';
import * as avatarTransparentHtml from '!raw-loader!./examples/avatar-transparent-example.component.html';
import * as avatarPlaceholderTs from '!raw-loader!./examples/avatar-placeholder-example.component.ts';
import * as avatarPlaceholderHtml from '!raw-loader!./examples/avatar-placeholder-example.component.html';
import * as avatarTileTs from '!raw-loader!./examples/avatar-tile-example.component.ts';
import * as avatarTileHtml from '!raw-loader!./examples/avatar-tile-example.component.html';
import * as avatarAccentColorsTs from '!raw-loader!./examples/avatar-accent-colors-example.component.ts';
import * as avatarAccentColorsHtml from '!raw-loader!./examples/avatar-accent-colors-example.component.html';
import * as avatarZoomIconTs from '!raw-loader!./examples/avatar-zoom-icon-example.component.ts';
import * as avatarZoomIconHtml from '!raw-loader!./examples/avatar-zoom-icon-example.component.html';
import * as avatarBordersTs from '!raw-loader!./examples/avatar-borders-example.component.ts';
import * as avatarBordersHtml from '!raw-loader!./examples/avatar-borders-example.component.html';
import * as avatarBackgroundWithAlterOptionsImageTs from '!raw-loader!./examples/avatar-default-image-with-alternative-options-example.component.ts';
import * as avatarBackgroundImageWithAlterOptionsHtml from '!raw-loader!./examples/avatar-default-image-with-alternative-options-example.component.html';

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
