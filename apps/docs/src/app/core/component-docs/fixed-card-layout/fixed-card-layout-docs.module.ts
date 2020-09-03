import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule, FixedCardLayoutModule } from '@fundamental-ngx/core';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';

import { FixedCardLayoutDocsComponent } from './fixed-card-layout-docs.component';
import { FixedCardLayoutDocsHeaderComponent } from './fixed-card-layout-docs-header/fixed-card-layout-docs-header.component';
import { FixedCardLayoutDisabledDragExampleComponent } from './examples/disabledDragDrop/fixed-card-layout-disabled-drag.component';
import { FixedCardLayoutExampleComponent } from './examples/default/fixed-card-layout-examples.component';
import { FixedCardLayoutMobileExampleComponent } from './examples/mobile/fixed-card-layout-mobile-examples.component';

import { CardComponent } from './DummyCardComponent/card.component';

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
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, FixedCardLayoutModule, ButtonModule],
    exports: [RouterModule],
    declarations: [
        CardComponent,
        FixedCardLayoutDocsComponent,
        FixedCardLayoutExampleComponent,
        FixedCardLayoutDisabledDragExampleComponent,
        FixedCardLayoutMobileExampleComponent,
        FixedCardLayoutDocsHeaderComponent
    ]
})
export class FixedCardLayoutDocsModule {}
