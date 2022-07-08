import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { ToolbarDocsComponent } from './toolbar-docs.component';
import { ToolbarHeaderComponent } from './toolbar-header/toolbar-header.component';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import {
    ToolbarTypeExampleComponent,
    ToolbarTitleExampleComponent,
    ToolbarSpacerExampleComponent,
    ToolbarSeparatorExampleComponent,
    ToolbarOverflowPriorityExampleComponent,
    ToolbarOverflowGroupingExampleComponent,
    ToolbarSizeExampleComponent
} from './examples/toolbar-example.component';
import { DeprecatedToolbarSizeDirective, ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { SplitButtonModule } from '@fundamental-ngx/core/split-button';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { SelectModule } from '@fundamental-ngx/core/select';
import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { FormModule } from '@fundamental-ngx/core/form';
import { FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { DatetimePickerModule } from '@fundamental-ngx/core/datetime-picker';
import { ToolbarOverflowExampleComponent } from './examples/toolbar-overflow-example.component';
import { TitleModule } from '@fundamental-ngx/core/title';
import { moduleDeprecationsProvider } from '@fundamental-ngx/core/utils';

const examples = [
    ToolbarTypeExampleComponent,
    ToolbarTitleExampleComponent,
    ToolbarSpacerExampleComponent,
    ToolbarSeparatorExampleComponent,
    ToolbarOverflowExampleComponent,
    ToolbarOverflowPriorityExampleComponent,
    ToolbarOverflowGroupingExampleComponent,
    ToolbarSizeExampleComponent
];

const routes: Routes = [
    {
        path: '',
        component: ToolbarHeaderComponent,
        children: [
            { path: '', component: ToolbarDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.toolbar } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        ToolbarModule,
        ButtonModule,
        SegmentedButtonModule,
        SplitButtonModule,
        MenuModule,
        SelectModule,
        CheckboxModule,
        FormModule,
        FdDatetimeModule,
        DatetimePickerModule,
        TitleModule
    ],
    exports: [RouterModule],
    declarations: [ToolbarDocsComponent, ToolbarHeaderComponent, ...examples],
    providers: [moduleDeprecationsProvider(DeprecatedToolbarSizeDirective)]
})
export class ToolbarDocsModule {}
