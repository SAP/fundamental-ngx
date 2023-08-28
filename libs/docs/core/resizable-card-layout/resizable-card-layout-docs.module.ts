import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';

import { BreadcrumbModule } from '@fundamental-ngx/core/breadcrumb';
import { CardModule } from '@fundamental-ngx/core/card';
import { DynamicPageModule } from '@fundamental-ngx/core/dynamic-page';
import { IconModule } from '@fundamental-ngx/core/icon';
import { InfoLabelModule } from '@fundamental-ngx/core/info-label';
import { ListModule } from '@fundamental-ngx/core/list';
import { ResizableCardLayoutModule } from '@fundamental-ngx/core/resizable-card-layout';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { TableModule } from '@fundamental-ngx/core/table';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';

import { ResizableCardLayoutExampleItemConfigComponent } from './examples/resizable-card-layout-example-itemconfig.component';
import { ResizableCardLayoutExampleLayoutConfigComponent } from './examples/resizable-card-layout-example-layoutconfig.component';
import { ResizableCardLayoutExampleComponent } from './examples/resizable-card-layout-example.component';
import { ResizableCardLayoutDocsHeaderComponent } from './resizable-card-layout-docs-header/resizable-card-layout-docs-header.component';
import { ResizableCardLayoutDocsComponent } from './resizable-card-layout-docs.component';

const routes: Routes = [
    {
        path: '',
        component: ResizableCardLayoutDocsHeaderComponent,
        children: [
            { path: '', component: ResizableCardLayoutDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.resizableCardLayout } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        ResizableCardLayoutModule,
        BreadcrumbModule,
        CardModule,
        IconModule,
        DynamicPageModule,
        InfoLabelModule,
        ListModule,
        SegmentedButtonModule,
        TableModule,
        ToolbarModule,
        ResizableCardLayoutDocsComponent,
        ResizableCardLayoutDocsHeaderComponent,
        ResizableCardLayoutExampleComponent,
        ResizableCardLayoutExampleLayoutConfigComponent,
        ResizableCardLayoutExampleItemConfigComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('resizable-card-layout')]
})
export class ResizableCardLayoutDocsModule {}
