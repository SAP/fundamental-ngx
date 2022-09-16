import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/fn/shared';
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
    declarations: [AvatarDocsComponent, AvatarHeaderComponent, ...examples],
    providers: [currentComponentProvider('avatar')]
})
export class AvatarDocsModule {}
