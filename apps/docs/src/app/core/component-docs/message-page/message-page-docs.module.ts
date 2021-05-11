import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';

import { MessagePageDocsComponent } from './message-page-docs.component';
import { MessagePageHeaderComponent } from './message-page-header/message-page-header.component';
import { MessagePageFilterExampleComponent } from './examples/message-page-filter-example.component';
import { MessagePageSearchExampleComponent } from './examples/message-page-search-example.component';
import { MessagePageNoItemsExampleComponent } from './examples/message-page-no-items-example.component';
import { MessagePageErrorExampleComponent } from './examples/message-page-error-example.component';

import { MessagePageModule, LinkModule } from '@fundamental-ngx/core';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';



const routes: Routes = [
    {
        path: '',
        component: MessagePageHeaderComponent,
        children: [
            { path: '', component: MessagePageDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.messagePage } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, MessagePageModule, LinkModule],
    exports: [RouterModule],
    declarations: [
        MessagePageHeaderComponent,
        MessagePageDocsComponent,
        MessagePageFilterExampleComponent,
        MessagePageSearchExampleComponent,
        MessagePageNoItemsExampleComponent,
        MessagePageErrorExampleComponent
    ]
})
export class MessagePageDocsModule {}
