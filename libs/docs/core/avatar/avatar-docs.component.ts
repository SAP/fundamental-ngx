import { Component } from '@angular/core';

import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getExampleFile
} from '@fundamental-ngx/docs/shared';
import { AvatarAccentColorsExampleComponent } from './examples/avatar-accent-colors-example.component';
import { AvatarBackgroundImageExampleComponent } from './examples/avatar-background-image-example.component';
import { AvatarBordersExampleComponent } from './examples/avatar-borders-example.component';
import { AvatarCircleExampleComponent } from './examples/avatar-circle-example.component';
import { AvatarDefaultImageWithAlternativeOptionsExampleComponent } from './examples/avatar-default-image-with-alternative-options-example.component';
import { AvatarIconExampleComponent } from './examples/avatar-icon-example.component';
import { AvatarInitialsExampleComponent } from './examples/avatar-initials-example.component';
import { AvatarPlaceholderExampleComponent } from './examples/avatar-placeholder-example.component';
import { AvatarTileExampleComponent } from './examples/avatar-tile-example.component';
import { AvatarTransparentExampleComponent } from './examples/avatar-transparent-example.component';
import { AvatarValueStateExampleComponent } from './examples/avatar-value-state-example.component';
import { AvatarZoomIconExampleComponent } from './examples/avatar-zoom-icon-example.component';

@Component({
    selector: 'app-avatar',
    templateUrl: './avatar-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        AvatarIconExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        AvatarInitialsExampleComponent,
        AvatarCircleExampleComponent,
        AvatarBackgroundImageExampleComponent,
        AvatarTransparentExampleComponent,
        AvatarPlaceholderExampleComponent,
        AvatarTileExampleComponent,
        AvatarAccentColorsExampleComponent,
        AvatarZoomIconExampleComponent,
        AvatarBordersExampleComponent,
        AvatarDefaultImageWithAlternativeOptionsExampleComponent,
        AvatarValueStateExampleComponent
    ]
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

    avatarValueStates: ExampleFile[] = [
        getExampleFile('avatar-value-state-example.component.html'),
        getExampleFile('avatar-value-state-example.component.ts', {
            component: 'AvatarValueStateExampleComponent'
        })
    ];
}
