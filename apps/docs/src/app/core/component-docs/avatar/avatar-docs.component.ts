import { Component } from '@angular/core';
import * as avatarIconHtml from '!raw-loader!./examples/avatar-icon-example.component.html';
import * as avatarInitialsHtml from '!raw-loader!./examples/avatar-initials-example.component.html';
import * as avatarCircleHtml from '!raw-loader!./examples/avatar-circle-example.component.html';
import * as avatarBackgroundImageHtml from '!raw-loader!./examples/avatar-background-image-example.component.html';
import * as avatarTransparentHtml from '!raw-loader!./examples/avatar-transparent-example.component.html';
import * as avatarPlaceholderHtml from '!raw-loader!./examples/avatar-placeholder-example.component.html';
import * as avatarTileHtml from '!raw-loader!./examples/avatar-tile-example.component.html';
import * as avatarAccentColorsHtml from '!raw-loader!./examples/avatar-accent-colors-example.component.html';
import * as avatarZoomIconHtml from '!raw-loader!./examples/avatar-zoom-icon-example.component.html';
import * as avatarBordersHtml from '!raw-loader!./examples/avatar-borders-example.component.html';

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
        }
    ];

    avatarInitials: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'avatar-initials-example',
            code: avatarInitialsHtml
        }
    ];

    avatarCircle: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'avatar-circle-example',
            code: avatarCircleHtml
        }
    ];

    avatarBackgroundImage: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'avatar-background-image-example',
            code: avatarBackgroundImageHtml
        }
    ];

    avatarTransparent: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'avatar-transparent-example',
            code: avatarTransparentHtml
        }
    ];

    avatarPlaceholder: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'avatar-placeholder-example',
            code: avatarPlaceholderHtml
        }
    ];

    avatarTile: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'avatar-tile-example',
            code: avatarTileHtml
        }
    ];

    avatarAccentColors: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'avatar-accent-colors-example',
            code: avatarAccentColorsHtml
        }
    ];

    avatarZoomIcon: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'avatar-zoom-icon-example',
            code: avatarZoomIconHtml
        }
    ];

    avatarBorders: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'avatar-border-example',
            code: avatarBordersHtml
        }
    ];
}
