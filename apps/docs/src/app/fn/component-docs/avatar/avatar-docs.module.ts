import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { AvatarHeaderComponent } from './avatar-header/avatar-header.component';
import { AvatarDocsComponent } from './avatar-docs.component';
import { examples } from './examples';
import { AvatarModule } from '@fundamental-ngx/fn/avatar';

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
    declarations: [AvatarDocsComponent, AvatarHeaderComponent, ...examples]
})
export class AvatarDocsModule {}
