import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { examples } from './examples';
import { ThemingDocsComponent } from './theming-docs.component';
import { ThemingHeaderComponent } from './theming-header/theming-header.component';

const routes: Routes = [
    {
        path: '',
        component: ThemingHeaderComponent,
        children: [
            { path: '', component: ThemingDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.theming } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        ObjectStatusModule,
        ThemingDocsComponent,
        ThemingHeaderComponent,
        examples
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('theming')]
})
export class ThemingDocsModule {}
