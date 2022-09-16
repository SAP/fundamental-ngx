import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/fn/shared';
import { ButtonHeaderComponent } from './button-header/button-header.component';
import { ButtonDocsComponent } from './button-docs.component';
import { examples } from './examples';
import { ButtonModule } from '@fundamental-ngx/fn/button';

const routes: Routes = [
    {
        path: '',
        component: ButtonHeaderComponent,
        children: [
            {
                path: '',
                component: ButtonDocsComponent
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.button } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, ButtonModule],
    exports: [RouterModule],
    declarations: [examples, ButtonHeaderComponent, ButtonDocsComponent],
    providers: [currentComponentProvider('button')]
})
export class ButtonDocsModule {}
