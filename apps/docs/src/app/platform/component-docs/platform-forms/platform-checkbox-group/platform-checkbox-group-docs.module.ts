import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlatformCheckboxModule, PlatformCheckboxGroupModule, FdpFormGroupModule } from '@fundamental-ngx/platform';
import { ApiComponent } from '../../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../../api-files';
import { SharedDocumentationModule } from '../../../../documentation/shared-documentation.module';
import { PlatformCheckboxGroupDocsComponent } from './platform-checkbox-group-docs.component';
import { PlatformCheckboxGroupHeaderComponent } from './platform-checkbox-group-header/platform-checkbox-group-header.component';
import { PlatformCheckboxGroupExampleComponent } from './platform-checkbox-group-examples/platform-checkbox-group-examples.component';
import { PlatformCheckboxGroupListComponent } from './platform-checkbox-group-examples/platform-checkbox-group-list.component';
import { PlatformCheckboxGroupContentCheckboxComponent } from './platform-checkbox-group-examples/platform-checkbox-group-content-checkbox.component';
import { PlatformCheckboxGroupListObjectComponent } from './platform-checkbox-group-examples/platform-checkbox-group-list-object.component';

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
        SharedDocumentationModule,
        PlatformCheckboxModule,
        PlatformCheckboxGroupModule,
        FdpFormGroupModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformCheckboxGroupDocsComponent,
        PlatformCheckboxGroupHeaderComponent,
        PlatformCheckboxGroupExampleComponent,
        PlatformCheckboxGroupListComponent,
        PlatformCheckboxGroupListObjectComponent,
        PlatformCheckboxGroupContentCheckboxComponent
    ]
})
export class PlatformCheckboxGroupDocsModule {}
