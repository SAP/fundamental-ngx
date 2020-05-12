import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';
import { BusyIndicatorHeaderComponent } from './busy-indicator-header/busy-indicator-header.component';
import { BusyIndicatorDocsComponent } from './busy-indicator-docs.component';
import { BusyIndicatorBasicExampleComponent } from './examples/busy-indicator-basic-example.component';
import { BusyIndicatorWrapperExampleComponent } from './examples/busy-indicator-wrapper-example.component';
import { BusyIndicatorModule } from '@fundamental-ngx/core';
import { BusyIndicatorSizeExampleComponent } from './examples/busy-indicator-size-example.component';

const routes: Routes = [
    {
        path: '',
        component: BusyIndicatorHeaderComponent,
        children: [
            { path: '', component: BusyIndicatorDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.busyIndicator } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationModule, BusyIndicatorModule],
    exports: [RouterModule],
    declarations: [
        BusyIndicatorDocsComponent,
        BusyIndicatorHeaderComponent,
        BusyIndicatorSizeExampleComponent,
        BusyIndicatorBasicExampleComponent,
        BusyIndicatorWrapperExampleComponent
    ]
})
export class BusyIndicatorDocsModule {}
