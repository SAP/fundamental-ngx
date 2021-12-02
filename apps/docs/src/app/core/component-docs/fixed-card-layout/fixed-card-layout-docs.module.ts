import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';

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
import { FixedCardLayoutCustomWidthExampleComponent } from './examples/custom-width/fixed-card-layout-custom-width-example.component';

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
        ToolbarModule
    ],
    exports: [RouterModule],
    declarations: [
        FixedCardLayoutDocsComponent,
        FixedCardLayoutExampleComponent,
        FixedCardLayoutDisabledDragExampleComponent,
        FixedCardLayoutMobileExampleComponent,
        FixedCardLayoutDocsHeaderComponent,
        FixedCardLayoutCustomWidthExampleComponent
    ]
})
export class FixedCardLayoutDocsModule {}
