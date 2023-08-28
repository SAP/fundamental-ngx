import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import {
    FdpFormGroupModule,
    PlatformCheckboxGroupModule,
    PlatformCheckboxModule
} from '@fundamental-ngx/platform/form';
import { PlatformCheckboxGroupContentCheckboxComponent } from './examples/platform-checkbox-group-content-checkbox.component';
import { PlatformCheckboxGroupExampleComponent } from './examples/platform-checkbox-group-examples.component';
import { PlatformCheckboxGroupListObjectComponent } from './examples/platform-checkbox-group-list-object.component';
import { PlatformCheckboxGroupListComponent } from './examples/platform-checkbox-group-list.component';
import { PlatformCheckboxGroupDocsComponent } from './platform-checkbox-group-docs.component';
import { PlatformCheckboxGroupHeaderComponent } from './platform-checkbox-group-header/platform-checkbox-group-header.component';

const routes: Routes = [
    {
        path: '',
        component: PlatformCheckboxGroupHeaderComponent,
        children: [
            { path: '', component: PlatformCheckboxGroupDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.checkboxGroup } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        PlatformCheckboxModule,
        PlatformCheckboxGroupModule,
        FdpFormGroupModule,
        PlatformButtonModule,
        PlatformCheckboxGroupDocsComponent,
        PlatformCheckboxGroupHeaderComponent,
        PlatformCheckboxGroupExampleComponent,
        PlatformCheckboxGroupListComponent,
        PlatformCheckboxGroupListObjectComponent,
        PlatformCheckboxGroupContentCheckboxComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('checkbox-group')]
})
export class PlatformCheckboxGroupDocsModule {}
