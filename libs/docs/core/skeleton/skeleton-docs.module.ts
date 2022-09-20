import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListModule } from '@fundamental-ngx/core/list';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { CardModule } from '@fundamental-ngx/core/card';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { TableModule } from '@fundamental-ngx/core/table';
import {
    ApiComponent,
    SharedDocumentationModule,
    SharedDocumentationPageModule,
    currentComponentProvider
} from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';

import { SkeletonDocsComponent } from './skeleton-docs.component';
import { SkeletonHeaderComponent } from './skeleton-header/skeleton-header.component';
import { SkeletonTemplateDirectiveExampleComponent } from './examples/directive/skeleton-template-directive-example.component';
import { SkeletonComponentExampleComponent } from './examples/component/skeleton-component-example.component';
import { SkeletonConsumerExampleComponent } from './examples/directive/skeleton-consumer-example.component';

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
        TableModule
    ],
    exports: [RouterModule],
    declarations: [
        SkeletonHeaderComponent,
        SkeletonDocsComponent,
        SkeletonTemplateDirectiveExampleComponent,
        SkeletonComponentExampleComponent,
        SkeletonConsumerExampleComponent
    ],
    providers: [currentComponentProvider('skeleton')]
})
export class SkeletonDocsModule {}
