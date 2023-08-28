import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { CardModule } from '@fundamental-ngx/core/card';
import { ListModule } from '@fundamental-ngx/core/list';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';
import { TableModule } from '@fundamental-ngx/core/table';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import {
    ApiComponent,
    SharedDocumentationModule,
    SharedDocumentationPageModule,
    currentComponentProvider
} from '@fundamental-ngx/docs/shared';

import { SkeletonComplexExampleComponent } from './examples/complex/skeleton-complex-example.component';
import { SkeletonComponentExampleComponent } from './examples/component/skeleton-component-example.component';
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
        AvatarModule,
        CardModule,
        ButtonModule,
        ListModule,
        TableModule,
        SkeletonModule,
        SkeletonHeaderComponent,
        SkeletonDocsComponent,
        SkeletonComponentExampleComponent,
        SkeletonComplexExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('skeleton')]
})
export class SkeletonDocsModule {}
