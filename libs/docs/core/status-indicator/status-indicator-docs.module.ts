import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StatusIndicatorModule } from '@fundamental-ngx/core/status-indicator';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { StatusIndicatorAngeledFillingComponent } from './examples/status-indicator-angled-filling.component';
import { StatusIndicatorCircularFillAntiClockComponent } from './examples/status-indicator-cirular-fill-anti-clockwise.component';
import { StatusIndicatorCircularFillClockComponent } from './examples/status-indicator-cirular-fill-clockwise.component';
import { StatusIndicatorClickableTypeComponent } from './examples/status-indicator-clickable-type.component';
import { StatusIndicatorDefaultComponent } from './examples/status-indicator-default.component';
import { StatusIndicatorFillTypeComponent } from './examples/status-indicator-fill-type.component';
import { StatusIndicatorLabelComponent } from './examples/status-indicator-label.component';
import { StatusIndicatorLinearFillTypeComponent } from './examples/status-indicator-linear-fill-type.component';
import { StatusIndicatorSizeComponent } from './examples/status-indicator-size.component';
import { StatusIndicatorDocsComponent } from './status-indicator-docs.component';
import { StatusIndicatorHeaderComponent } from './status-indicator-header/status-indicator-header.component';

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
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        StatusIndicatorModule,
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
    exports: [RouterModule],
    providers: [currentComponentProvider('status-indicator')]
})
export class StatusIndicatorDocsModule {}
