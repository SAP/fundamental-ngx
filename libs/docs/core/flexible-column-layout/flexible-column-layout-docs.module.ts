import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';

import { FlexibleColumnLayoutDocsHeaderComponent } from './flexible-column-layout-docs-header/flexible-column-layout-docs-header.component';
import { FlexibleColumnLayoutDocsComponent } from './flexible-column-layout-docs.component';

import { ButtonModule } from '@fundamental-ngx/core/button';
import { DynamicPageModule } from '@fundamental-ngx/core/dynamic-page';
import { FlexibleColumnLayoutModule } from '@fundamental-ngx/core/flexible-column-layout';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { FlexibleColumnLayoutCustomConfigExampleComponent } from './examples/custom-config/flexible-column-layout-custom-config-example.component';
import { FlexibleColumnLayoutExampleComponent } from './examples/default/flexible-column-layout-example.component';
import { FlexibleColumnLayoutDynamicPageExampleComponent } from './examples/dynamic-page/flexible-column-layout-dynamic-page-example.component';

const routes: Routes = [
    {
        path: '',
        component: FlexibleColumnLayoutDocsHeaderComponent,
        children: [
            { path: '', component: FlexibleColumnLayoutDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.flexibleColumnLayout } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        FlexibleColumnLayoutModule,
        DynamicPageModule,
        ToolbarModule,
        ButtonModule,
        FlexibleColumnLayoutDocsComponent,
        FlexibleColumnLayoutExampleComponent,
        FlexibleColumnLayoutDynamicPageExampleComponent,
        FlexibleColumnLayoutDocsHeaderComponent,
        FlexibleColumnLayoutCustomConfigExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('flexible-column-layout')]
})
export class FlexibleColumnLayoutDocsModule {}
