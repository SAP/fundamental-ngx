import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { AvatarDocsComponent } from './avatar-docs.component';
import { AvatarHeaderComponent } from './avatar-header/avatar-header.component';
import { AvatarAccentColorsExampleComponent } from './examples/avatar-accent-colors-example.component';
import { AvatarBordersExampleComponent } from './examples/avatar-borders-example.component';
import { AvatarBackgroundImageExampleComponent } from './examples/avatar-background-image-example.component';
import { AvatarCircleExampleComponent } from './examples/avatar-circle-example.component';
import { AvatarIconExampleComponent } from './examples/avatar-icon-example.component';
import { AvatarTileExampleComponent } from './examples/avatar-tile-example.component';
import { AvatarPlaceholderExampleComponent } from './examples/avatar-placeholder-example.component';
import { AvatarTransparentExampleComponent } from './examples/avatar-transparent-example.component';
import { AvatarInitialsExampleComponent } from './examples/avatar-initials-example.component';
import { AvatarZoomIconExampleComponent } from './examples/avatar-zoom-icon-example.component';
import { AvatarDefaultImageWithAlternativeOptionsExampleComponent } from './examples/avatar-default-image-with-alternative-options-example.component';

const routes: Routes = [
    {
        path: '',
        component: AvatarHeaderComponent,
        children: [
            { path: '', component: AvatarDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.avatar } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, AvatarModule],
    exports: [RouterModule],
    declarations: [
        AvatarAccentColorsExampleComponent,
        AvatarBackgroundImageExampleComponent,
        AvatarBordersExampleComponent,
        AvatarCircleExampleComponent,
        AvatarDocsComponent,
        AvatarHeaderComponent,
        AvatarIconExampleComponent,
        AvatarInitialsExampleComponent,
        AvatarPlaceholderExampleComponent,
        AvatarTileExampleComponent,
        AvatarTransparentExampleComponent,
        AvatarZoomIconExampleComponent,
        AvatarDefaultImageWithAlternativeOptionsExampleComponent
    ],
    providers: [currentComponentProvider('avatar')]
})
export class AvatarDocsModule {}
