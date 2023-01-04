import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/cdk/shared';
import { FocusableItemHeaderComponent } from './focusable-item-header/focusable-item-header.component';
import { FocusableItemDocsComponent } from './focusable-item-docs.component';
import { examples } from './examples';
import { FocusableItemModule } from '@fundamental-ngx/cdk/utils';

const routes: Routes = [
    {
        path: '',
        component: FocusableItemHeaderComponent,
        children: [
            { path: '', component: FocusableItemDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.focusableItem } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, FocusableItemModule],
    exports: [RouterModule],
    declarations: [examples, FocusableItemDocsComponent, FocusableItemHeaderComponent],
    providers: [currentComponentProvider('focusable-item')]
})
export class FocusableItemDocsModule {}
