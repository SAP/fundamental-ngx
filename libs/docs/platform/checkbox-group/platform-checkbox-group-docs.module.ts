import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    FdpFormGroupModule,
    PlatformCheckboxGroupModule,
    PlatformCheckboxModule
} from '@fundamental-ngx/platform/form';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { PlatformCheckboxGroupDocsComponent } from './platform-checkbox-group-docs.component';
import { PlatformCheckboxGroupHeaderComponent } from './platform-checkbox-group-header/platform-checkbox-group-header.component';
import { PlatformCheckboxGroupExampleComponent } from './examples/platform-checkbox-group-examples.component';
import { PlatformCheckboxGroupListComponent } from './examples/platform-checkbox-group-list.component';
import { PlatformCheckboxGroupContentCheckboxComponent } from './examples/platform-checkbox-group-content-checkbox.component';
import { PlatformCheckboxGroupListObjectComponent } from './examples/platform-checkbox-group-list-object.component';

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
        PlatformButtonModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformCheckboxGroupDocsComponent,
        PlatformCheckboxGroupHeaderComponent,
        PlatformCheckboxGroupExampleComponent,
        PlatformCheckboxGroupListComponent,
        PlatformCheckboxGroupListObjectComponent,
        PlatformCheckboxGroupContentCheckboxComponent
    ],
    providers: [currentComponentProvider('checkbox-group')]
})
export class PlatformCheckboxGroupDocsModule {}
