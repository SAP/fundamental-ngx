import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/cdk/shared';
import { TabbableHeaderComponent } from './tabbable-header/tabbable-header.component';
import { TabbableDocsComponent } from './tabbable-docs.component';
import { examples } from './examples';
import { UtilsModule } from '@fundamental-ngx/cdk/utils';

const routes: Routes = [
    {
        path: '',
        component: TabbableHeaderComponent,
        children: [
            { path: '', component: TabbableDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.tabbable } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, UtilsModule],
    exports: [RouterModule],
    declarations: [examples, TabbableDocsComponent, TabbableHeaderComponent],
    providers: [currentComponentProvider('tabbable')]
})
export class TabbableDocsModule {}
