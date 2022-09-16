import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';

import { AvatarGroupDocsComponent } from './avatar-group-docs.component';
import { AvatarGroupHeaderComponent } from './avatar-group-header/avatar-group-header.component';
import { AvatarGroupGroupTypeExampleComponent } from './examples/avatar-group-group-type-example.component';
import { AvatarGroupIndividualTypeExampleComponent } from './examples/avatar-group-individual-type-example.component';
import { AvatarGroupModule } from '@fundamental-ngx/core/avatar-group';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { QuickViewModule } from '@fundamental-ngx/core/quick-view';
import { BarModule } from '@fundamental-ngx/core/bar';
import { TitleModule } from '@fundamental-ngx/core/title';
import { LinkModule } from '@fundamental-ngx/core/link';

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
        TitleModule
    ],
    exports: [RouterModule],
    declarations: [
        AvatarGroupDocsComponent,
        AvatarGroupHeaderComponent,
        AvatarGroupGroupTypeExampleComponent,
        AvatarGroupIndividualTypeExampleComponent
    ],
    providers: [currentComponentProvider('avatar-group')]
})
export class AvatarGroupDocsModule {}
