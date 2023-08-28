import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LinkModule } from '@fundamental-ngx/core/link';
import { ShellbarModule } from '@fundamental-ngx/core/shellbar';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { LinkExampleComponent } from './examples/link-example.component';
import { LinkDocsComponent } from './link-docs.component';
import { LinkHeaderComponent } from './link-header/link-header.component';

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
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        LinkModule,
        ShellbarModule,
        LinkDocsComponent,
        LinkHeaderComponent,
        LinkExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('link')]
})
export class LinkDocsModule {}
