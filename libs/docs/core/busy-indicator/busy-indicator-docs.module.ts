import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { BusyIndicatorHeaderComponent } from './busy-indicator-header/busy-indicator-header.component';
import { BusyIndicatorDocsComponent } from './busy-indicator-docs.component';
import { examples } from './examples';
import { BusyIndicatorModule } from '@fundamental-ngx/core/busy-indicator';
import { FormModule } from '@fundamental-ngx/core/form';

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
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, BusyIndicatorModule, FormModule],
    exports: [RouterModule],
    declarations: [examples, BusyIndicatorDocsComponent, BusyIndicatorHeaderComponent],
    providers: [currentComponentProvider('busy-indicator')]
})
export class BusyIndicatorDocsModule {}
