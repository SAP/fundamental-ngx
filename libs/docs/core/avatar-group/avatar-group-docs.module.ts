import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';

import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { AvatarGroupModule } from '@fundamental-ngx/core/avatar-group';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { LinkModule } from '@fundamental-ngx/core/link';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { QuickViewModule } from '@fundamental-ngx/core/quick-view';
import { TitleModule } from '@fundamental-ngx/core/title';
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
        LinkModule,
        TitleModule,
        AvatarGroupDocsComponent,
        AvatarGroupHeaderComponent,
        AvatarGroupGroupTypeExampleComponent,
        AvatarGroupIndividualTypeExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('avatar-group')]
})
export class AvatarGroupDocsModule {}
