import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';

import { QuickViewDocsComponent } from './quick-view-docs.component';
import { QuickViewDocsHeaderComponent } from './quick-view-docs-header/quick-view-docs-header.component';
import { QuickViewBaseExampleComponent } from './examples/quick-view-base-example.component';
import { QuickViewPopoverExampleComponent } from './examples/quick-view-popover-example.component';
import { QuickViewDialogExampleComponent } from './examples/quick-view-dialog-example.component';
import { QuickViewModule } from '@fundamental-ngx/core/quick-view';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { IconModule } from '@fundamental-ngx/core/icon';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { TitleModule } from '@fundamental-ngx/core/title';

const routes: Routes = [
    {
        path: '',
        component: QuickViewDocsHeaderComponent,
        children: [
            { path: '', component: QuickViewDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.quickView } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        QuickViewModule,
        AvatarModule,
        IconModule,
        PopoverModule,
        DialogModule,
        TitleModule
    ],
    exports: [RouterModule],
    declarations: [
        QuickViewDocsComponent,
        QuickViewDocsHeaderComponent,
        QuickViewBaseExampleComponent,
        QuickViewPopoverExampleComponent,
        QuickViewDialogExampleComponent
    ]
})
export class QuickViewDocsModule {}
