import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { LinkHeaderComponent } from './link-header/link-header.component';
import { LinkDocsComponent } from './link-docs.component';
import { LinkExampleComponent } from './examples/link-example.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { LinkModule } from '@fundamental-ngx/core/link';
import { ShellbarModule } from '@fundamental-ngx/core/shellbar';

const routes: Routes = [
    {
        path: '',
        component: LinkHeaderComponent,
        children: [
            { path: '', component: LinkDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.link } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, LinkModule, ShellbarModule],
    exports: [RouterModule],
    declarations: [LinkDocsComponent, LinkHeaderComponent, LinkExampleComponent]
})
export class LinkDocsModule {}
