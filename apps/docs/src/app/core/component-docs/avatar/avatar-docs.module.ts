import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { AvatarModule } from '@fundamental-ngx/core';
import { AvatarAccentColorsExampleComponent } from './examples/avatar-examples.component';
import { AvatarBackgroundImageExampleComponent } from './examples/avatar-examples.component';
import { AvatarBordersExampleComponent } from './examples/avatar-examples.component';
import { AvatarCircleExampleComponent } from './examples/avatar-examples.component';
import { AvatarDocsComponent } from './avatar-docs.component';
import { AvatarHeaderComponent } from './avatar-header/avatar-header.component';
import { AvatarIconExampleComponent } from './examples/avatar-examples.component';
import { AvatarInitialsExampleComponent } from './examples/avatar-examples.component';
import { AvatarPlaceholderExampleComponent } from './examples/avatar-examples.component';
import { AvatarTransparentExampleComponent } from './examples/avatar-examples.component';
import { AvatarTileExampleComponent } from './examples/avatar-examples.component';
import { AvatarZoomIconExampleComponent } from './examples/avatar-examples.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

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
        AvatarZoomIconExampleComponent
    ]
})
export class AvatarDocsModule {}
