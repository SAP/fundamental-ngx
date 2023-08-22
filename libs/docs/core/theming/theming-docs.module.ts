import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ThemingHeaderComponent } from './theming-header/theming-header.component';
import { ThemingDocsComponent } from './theming-docs.component';
import { examples } from './examples';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';

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
