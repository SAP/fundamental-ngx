import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TitleModule } from '@fundamental-ngx/core/title';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import {
    TitleElisionExampleComponent,
    TitleSemanticExampleComponent,
    TitleVisualExampleComponent,
    TitleWrappingExampleComponent
} from './examples/title-examples.component';
import { TitleDocsComponent } from './title-docs.component';
import { TitleHeaderComponent } from './title-header/title-header.component';

const routes: Routes = [
    {
        path: '',
        component: TitleHeaderComponent,
        children: [
            { path: '', component: TitleDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.title } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        TitleModule,
        TitleDocsComponent,
        TitleHeaderComponent,
        TitleSemanticExampleComponent,
        TitleElisionExampleComponent,
        TitleVisualExampleComponent,
        TitleWrappingExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('title')]
})
export class TitleDocsModule {}
