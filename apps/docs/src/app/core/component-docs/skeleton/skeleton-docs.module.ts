import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListModule } from '@fundamental-ngx/core/list';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { CardModule } from '@fundamental-ngx/core/card';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';
import { TableModule } from '@fundamental-ngx/core/table';

import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';

import { API_FILES } from '../../api-files';
import { COMPONENTS } from './examples';
import { SkeletonDocsComponent } from './skeleton-docs.component';
import { SkeletonHeaderComponent } from './skeleton-header/skeleton-header.component';

const routes: Routes = [
    {
        path: '',
        component: SkeletonHeaderComponent,
        children: [
            { path: '', component: SkeletonDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.skeleton } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationModule,
        SharedDocumentationPageModule,
        SkeletonModule,
        AvatarModule,
        CardModule,
        ButtonModule,
        ListModule,
        TableModule
    ],
    exports: [RouterModule],
    declarations: [SkeletonHeaderComponent, SkeletonDocsComponent, ...COMPONENTS]
})
export class SkeletonDocsModule {}
