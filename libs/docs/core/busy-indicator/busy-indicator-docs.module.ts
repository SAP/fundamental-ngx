import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusyIndicatorModule } from '@fundamental-ngx/core/busy-indicator';
import { FormModule } from '@fundamental-ngx/core/form';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { BusyIndicatorDocsComponent } from './busy-indicator-docs.component';
import { BusyIndicatorHeaderComponent } from './busy-indicator-header/busy-indicator-header.component';
import { examples } from './examples';

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
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        BusyIndicatorModule,
        FormModule,
        examples,
        BusyIndicatorDocsComponent,
        BusyIndicatorHeaderComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('busy-indicator')]
})
export class BusyIndicatorDocsModule {}
