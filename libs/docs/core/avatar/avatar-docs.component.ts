import { Component } from '@angular/core';

import { ExampleFile, getExampleFile } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-avatar',
    templateUrl: './avatar-docs.component.html'
})
export class AvatarDocsComponent {
    avatarIcon: ExampleFile[] = [
        getExampleFile('avatar-icon-example.component.html'),
        getExampleFile('avatar-icon-example.component.ts', { component: 'AvatarIconExampleComponent' })
    ];

    avatarInitials: ExampleFile[] = [
        getExampleFile('avatar-initials-example.component.html'),
        getExampleFile('avatar-initials-example.component.ts', {
            component: 'AvatarInitialsExampleComponent'
        })
    ];

    avatarCircle: ExampleFile[] = [
        getExampleFile('avatar-circle-example.component.html'),
        getExampleFile('avatar-circle-example.component.ts', {
            component: 'AvatarCircleExampleComponent'
        })
    ];

    avatarBackgroundImage: ExampleFile[] = [
        getExampleFile('avatar-background-image-example.component.html'),
        getExampleFile('avatar-background-image-example.component.ts', {
            component: 'AvatarBackgroundImageExampleComponent'
        })
    ];

    avatarTransparent: ExampleFile[] = [
        getExampleFile('avatar-transparent-example.component.html'),
        getExampleFile('avatar-transparent-example.component.ts', {
            component: 'AvatarTransparentExampleComponent'
        })
    ];

    avatarPlaceholder: ExampleFile[] = [
        getExampleFile('avatar-placeholder-example.component.html'),
        getExampleFile('avatar-placeholder-example.component.ts', {
            component: 'AvatarPlaceholderExampleComponent'
        })
    ];

    avatarTile: ExampleFile[] = [
        getExampleFile('avatar-tile-example.component.html'),
        getExampleFile('avatar-tile-example.component.ts', { component: 'AvatarTileExampleComponent' })
    ];

    avatarAccentColors: ExampleFile[] = [
        getExampleFile('avatar-accent-colors-example.component.html'),
        getExampleFile('avatar-accent-colors-example.component.ts', {
            component: 'AvatarAccentColorsExampleComponent'
        })
    ];

    avatarZoomIcon: ExampleFile[] = [
        getExampleFile('avatar-zoom-icon-example.component.html'),
        getExampleFile('avatar-zoom-icon-example.component.ts', {
            component: 'AvatarZoomIconExampleComponent'
        })
    ];

    avatarBorders: ExampleFile[] = [
        getExampleFile('avatar-borders-example.component.html'),
        getExampleFile('avatar-borders-example.component.ts', {
            component: 'AvatarBordersExampleComponent'
        })
    ];

    avatarBackgroundImageWithAlterOptions: ExampleFile[] = [
        getExampleFile('avatar-default-image-with-alternative-options-example.component.html'),
        getExampleFile('avatar-default-image-with-alternative-options-example.component.ts', {
            component: 'AvatarDefaultImageWithAlternativeOptionsExampleComponent'
        })
    ];
}
