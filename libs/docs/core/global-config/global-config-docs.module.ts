import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { GlobalConfigDocsComponent } from './global-config-docs.component';
import { GlobalConfigHeaderComponent } from './global-config-header/global-config-header.component';

const routes: Routes = [
    {
        path: '',
        component: GlobalConfigHeaderComponent,
        children: [
            { path: '', component: GlobalConfigDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.globalConfig } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        GlobalConfigDocsComponent,
        GlobalConfigHeaderComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('global-config')]
})
export class GlobalConfigDocsModule {}
