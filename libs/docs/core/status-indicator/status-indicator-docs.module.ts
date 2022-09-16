import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { StatusIndicatorDocsComponent } from './status-indicator-docs.component';
import { StatusIndicatorHeaderComponent } from './status-indicator-header/status-indicator-header.component';
import { StatusIndicatorDefaultComponent } from './examples/status-indicator-default.component';
import { StatusIndicatorSizeComponent } from './examples/status-indicator-size.component';
import { StatusIndicatorFillTypeComponent } from './examples/status-indicator-fill-type.component';
import { StatusIndicatorLabelComponent } from './examples/status-indicator-label.component';
import { StatusIndicatorAngeledFillingComponent } from './examples/status-indicator-angled-filling.component';
import { StatusIndicatorCircularFillClockComponent } from './examples/status-indicator-cirular-fill-clockwise.component';
import { StatusIndicatorCircularFillAntiClockComponent } from './examples/status-indicator-cirular-fill-anti-clockwise.component';
import { StatusIndicatorLinearFillTypeComponent } from './examples/status-indicator-linear-fill-type.component';
import { StatusIndicatorClickableTypeComponent } from './examples/status-indicator-clickable-type.component';
import { StatusIndicatorModule } from '@fundamental-ngx/core/status-indicator';

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
        StatusIndicatorLinearFillTypeComponent,
        StatusIndicatorClickableTypeComponent
    ],
    providers: [currentComponentProvider('status-indicator')]
})
export class StatusIndicatorDocsModule {}
