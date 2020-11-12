import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    FixedCardLayoutModule,
    CardModule,
    ListModule,
    ObjectStatusModule,
    SegmentedButtonModule,
    TableModule,
    ToolbarModule
} from '@fundamental-ngx/core';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';

import { DialogModule } from '@fundamental-ngx/core';
import { FixedCardLayoutDocsComponent } from './fixed-card-layout-docs.component';
import { FixedCardLayoutDocsHeaderComponent } from './fixed-card-layout-docs-header/fixed-card-layout-docs-header.component';
import { FixedCardLayoutDisabledDragExampleComponent } from './examples/disabled-drag-drop/fixed-card-layout-disabled-drag.component';
import { FixedCardLayoutExampleComponent } from './examples/default/fixed-card-layout-examples.component';
import { FixedCardLayoutMobileExampleComponent } from './examples/mobile/fixed-card-layout-mobile-examples.component';

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
        FixedCardLayoutDocsHeaderComponent
    ]
})
export class FixedCardLayoutDocsModule {}
