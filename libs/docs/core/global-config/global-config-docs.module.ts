import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { GlobalConfigHeaderComponent } from './global-config-header/global-config-header.component';
import { GlobalConfigDocsComponent } from './global-config-docs.component';

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
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule],
    exports: [RouterModule],
    declarations: [GlobalConfigDocsComponent, GlobalConfigHeaderComponent],
    providers: [currentComponentProvider('global-config')]
})
export class GlobalConfigDocsModule {}
