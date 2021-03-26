import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

import {
    AvatarGroupModule,
    AvatarModule,
    BarModule,
    ButtonModule,
    PopoverModule,
    QuickViewModule,
    TitleModule
} from '@fundamental-ngx/core';
import { AvatarGroupDocsComponent } from './avatar-group-docs.component';
import { AvatarGroupHeaderComponent } from './avatar-group-header/avatar-group-header.component';
import { AvatarGroupGroupTypeExampleComponent } from './examples/avatar-group-group-type-example.component';
import { AvatarGroupIndividualTypeExampleComponent } from './examples/avatar-group-individual-type-example.component';

const routes: Routes = [
    {
        path: '',
        component: AvatarGroupHeaderComponent,
        children: [
            { path: '', component: AvatarGroupDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.avatarGroup } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        AvatarGroupModule,
        AvatarModule,
        ButtonModule,
        PopoverModule,
        QuickViewModule,
        BarModule,
        TitleModule
    ],
    exports: [RouterModule],
    declarations: [
        AvatarGroupDocsComponent,
        AvatarGroupHeaderComponent,
        AvatarGroupGroupTypeExampleComponent,
        AvatarGroupIndividualTypeExampleComponent
    ]
})
export class AvatarGroupDocsModule {}
