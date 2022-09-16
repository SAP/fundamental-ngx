import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';

import { IconModule } from '@fundamental-ngx/core/icon';
import { CardModule } from '@fundamental-ngx/core/card';
import { ListModule } from '@fundamental-ngx/core/list';
import { TableModule } from '@fundamental-ngx/core/table';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { BreadcrumbModule } from '@fundamental-ngx/core/breadcrumb';
import { DynamicPageModule } from '@fundamental-ngx/core/dynamic-page';
import { InfoLabelModule } from '@fundamental-ngx/core/info-label';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { ResizableCardLayoutModule } from '@fundamental-ngx/core/resizable-card-layout';

import { ResizableCardLayoutDocsHeaderComponent } from './resizable-card-layout-docs-header/resizable-card-layout-docs-header.component';
import { ResizableCardLayoutDocsComponent } from './resizable-card-layout-docs.component';
import { ResizableCardLayoutExampleComponent } from './examples/resizable-card-layout-example.component';
import { ResizableCardLayoutExampleLayoutConfigComponent } from './examples/resizable-card-layout-example-layoutconfig.component';
import { ResizableCardLayoutExampleItemConfigComponent } from './examples/resizable-card-layout-example-itemconfig.component';

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
        ToolbarModule
    ],
    exports: [RouterModule],
    declarations: [
        ResizableCardLayoutDocsComponent,
        ResizableCardLayoutDocsHeaderComponent,
        ResizableCardLayoutExampleComponent,
        ResizableCardLayoutExampleLayoutConfigComponent,
        ResizableCardLayoutExampleItemConfigComponent
    ],
    providers: [currentComponentProvider('resizable-card-layout')]
})
export class ResizableCardLayoutDocsModule {}
