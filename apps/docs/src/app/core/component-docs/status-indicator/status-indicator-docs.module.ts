import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StatusIndicatorModule } from '@fundamental-ngx/core';

import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { StatusIndicatorDocsComponent } from './status-indicator-docs.component';
import { StatusIndicatorHeaderComponent } from './status-indicator-header/status-indicator-header.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { StatusIndicatorDefaultComponent } from './example/status-indicator-default.component';
import { StatusIndicatorSizeComponent } from './example/status-indicator-size.component';
import { StatusIndicatorFillTypeComponent } from './example/status-indicator-fill-type.component';
import { StatusIndicatorLabelComponent } from './example/status-indicator-label.component';
import { StatusIndicatorAngeledFillingComponent } from './example/status-indicator-angled-filling.component';
import { StatusIndicatorCircularFillClockComponent } from './example/status-indicator-cirular-fill-clockwise.component';
import { StatusIndicatorCircularFillAntiClockComponent } from './example/status-indicator-cirular-fill-anti-clockwise.component';
import { StatusIndicatorLinearFillTypeComponent } from './example/status-indicator-linear-fill-type.component';

const routes: Routes = [
    {
        path: '',
        component: StatusIndicatorHeaderComponent,
        children: [
            { path: '', component: StatusIndicatorDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.statusIndicator } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, StatusIndicatorModule],
    exports: [RouterModule],
    declarations: [
        StatusIndicatorDocsComponent,
        StatusIndicatorHeaderComponent,
        StatusIndicatorDefaultComponent,
        StatusIndicatorSizeComponent,
        StatusIndicatorFillTypeComponent,
        StatusIndicatorLabelComponent,
        StatusIndicatorAngeledFillingComponent,
        StatusIndicatorCircularFillClockComponent,
        StatusIndicatorCircularFillAntiClockComponent,
        StatusIndicatorLinearFillTypeComponent
    ]
})
export class StatusIndicatorDocsModule {}
