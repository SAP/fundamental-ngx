import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';
import { AvatarDocsComponent } from './avatar-docs.component';
import { AvatarExampleComponent } from './examples/avatar-example.component';


import { AvatarHeaderComponent } from './avatar-header/avatar-header.component';
import { AvatarModule } from '@fundamental-ngx/core';

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
    imports: [RouterModule.forChild(routes), SharedDocumentationModule, AvatarModule],
    exports: [RouterModule],
    declarations: [
        AvatarHeaderComponent,
        AvatarDocsComponent,
        AvatarExampleComponent
    ]
})
export class AvatarDocsModule {}
