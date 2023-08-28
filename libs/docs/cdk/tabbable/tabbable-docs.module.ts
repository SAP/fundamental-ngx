import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UtilsModule } from '@fundamental-ngx/cdk/utils';
import { API_FILES } from '@fundamental-ngx/docs/cdk/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { examples } from './examples';
import { TabbableDocsComponent } from './tabbable-docs.component';
import { TabbableHeaderComponent } from './tabbable-header/tabbable-header.component';

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
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        UtilsModule,
        examples,
        TabbableDocsComponent,
        TabbableHeaderComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('tabbable')]
})
export class TabbableDocsModule {}
