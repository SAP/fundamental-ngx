import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';

import { FixedCardLayoutDocsComponent } from './fixed-card-layout-docs.component';
import { FixedCardLayoutDocsHeaderComponent } from './fixed-card-layout-docs-header/fixed-card-layout-docs-header.component';
import { FixedCardLayoutDisabledDragExampleComponent } from './examples/disabled-drag-drop/fixed-card-layout-disabled-drag.component';
import { FixedCardLayoutExampleComponent } from './examples/default/fixed-card-layout-examples.component';
import { FixedCardLayoutMobileExampleComponent } from './examples/mobile/fixed-card-layout-mobile-examples.component';
import { CardModule } from '@fundamental-ngx/core/card';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { FixedCardLayoutModule } from '@fundamental-ngx/core/fixed-card-layout';
import { ListModule } from '@fundamental-ngx/core/list';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { TableModule } from '@fundamental-ngx/core/table';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { FormModule } from '@fundamental-ngx/core/form';
import { FixedCardLayoutCustomWidthExampleComponent } from './examples/custom-width/fixed-card-layout-custom-width-example.component';
import { FixedCardLayoutCustomColumnWidthExampleComponent } from './examples/custom-column-width/fixed-card-layout-custom-column-width-example.component';
import { FixedCardLayoutMaxColumnsExampleComponent } from './examples/max-columns/fixed-card-layout-max-columns-example.component';

const routes: Routes = [
    {
        path: '',
        component: FixedCardLayoutDocsHeaderComponent,
        children: [
            { path: '', component: FixedCardLayoutDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.fixedCardLayout } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        CardModule,
        DialogModule,
        FixedCardLayoutModule,
        ListModule,
        ObjectStatusModule,
        SegmentedButtonModule,
        TableModule,
        ToolbarModule,
        FormModule
    ],
    exports: [RouterModule],
    declarations: [
        FixedCardLayoutDocsComponent,
        FixedCardLayoutExampleComponent,
        FixedCardLayoutDisabledDragExampleComponent,
        FixedCardLayoutMobileExampleComponent,
        FixedCardLayoutDocsHeaderComponent,
        FixedCardLayoutCustomWidthExampleComponent,
        FixedCardLayoutCustomColumnWidthExampleComponent,
        FixedCardLayoutMaxColumnsExampleComponent
    ],
    providers: [currentComponentProvider('fixed-card-layout')]
})
export class FixedCardLayoutDocsModule {}
