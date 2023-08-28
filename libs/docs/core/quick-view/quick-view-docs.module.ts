import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';

import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { IconModule } from '@fundamental-ngx/core/icon';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { QuickViewModule } from '@fundamental-ngx/core/quick-view';
import { TitleModule } from '@fundamental-ngx/core/title';
import { QuickViewBaseExampleComponent } from './examples/quick-view-base-example.component';
import { QuickViewDialogExampleComponent } from './examples/quick-view-dialog-example.component';
import { QuickViewPopoverExampleComponent } from './examples/quick-view-popover-example.component';
import { QuickViewDocsHeaderComponent } from './quick-view-docs-header/quick-view-docs-header.component';
import { QuickViewDocsComponent } from './quick-view-docs.component';

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
        TitleModule,
        QuickViewDocsComponent,
        QuickViewDocsHeaderComponent,
        QuickViewBaseExampleComponent,
        QuickViewPopoverExampleComponent,
        QuickViewDialogExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('quick-view')]
})
export class QuickViewDocsModule {}
