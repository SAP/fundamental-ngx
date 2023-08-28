import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FocusableItemModule } from '@fundamental-ngx/cdk/utils';
import { API_FILES } from '@fundamental-ngx/docs/cdk/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { examples } from './examples';
import { FocusableItemDocsComponent } from './focusable-item-docs.component';
import { FocusableItemHeaderComponent } from './focusable-item-header/focusable-item-header.component';

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
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        FocusableItemModule,
        examples,
        FocusableItemDocsComponent,
        FocusableItemHeaderComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('focusable-item')]
})
export class FocusableItemDocsModule {}
