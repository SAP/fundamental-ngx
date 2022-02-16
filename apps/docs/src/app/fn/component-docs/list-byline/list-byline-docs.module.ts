import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListModule } from '@fundamental-ngx/fn/list';
import { ButtonModule } from '@fundamental-ngx/fn/button';
import { CheckboxModule } from '@fundamental-ngx/fn/checkbox';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { ListBylineHeaderComponent } from './list-byline-header/list-byline-header.component';
import { ListBylineDocsComponent } from './list-byline-docs.component';
import { examples } from './examples';
import { AvatarModule } from '@fundamental-ngx/fn/avatar';
import { ObjectStatusModule } from '@fundamental-ngx/fn/object-status';

const routes: Routes = [
    {
        path: '',
        component: ListBylineHeaderComponent,
        children: [
            { path: '', component: ListBylineDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.list } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        ListModule,
        ButtonModule,
        CheckboxModule,
        AvatarModule,
        ObjectStatusModule
    ],
    exports: [RouterModule],
    declarations: [examples, ListBylineDocsComponent, ListBylineHeaderComponent]
})
export class ListBylineDocsModule {}
