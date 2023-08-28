import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { moduleDeprecationsProvider } from '@fundamental-ngx/cdk/utils';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { DatetimePickerModule } from '@fundamental-ngx/core/datetime-picker';
import { FormModule } from '@fundamental-ngx/core/form';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { SelectModule } from '@fundamental-ngx/core/select';
import { SplitButtonModule } from '@fundamental-ngx/core/split-button';
import { TitleModule } from '@fundamental-ngx/core/title';
import { DeprecatedToolbarSizeDirective, ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import {
    ToolbarOverflowGroupingExampleComponent,
    ToolbarOverflowPriorityExampleComponent,
    ToolbarSeparatorExampleComponent,
    ToolbarSizeExampleComponent,
    ToolbarSpacerExampleComponent,
    ToolbarTitleExampleComponent,
    ToolbarTypeExampleComponent
} from './examples/toolbar-example.component';
import { ToolbarOverflowExampleComponent } from './examples/toolbar-overflow-example.component';
import { ToolbarDocsComponent } from './toolbar-docs.component';
import { ToolbarHeaderComponent } from './toolbar-header/toolbar-header.component';

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
        TitleModule,
        ToolbarDocsComponent,
        ToolbarHeaderComponent,
        ...examples
    ],
    exports: [RouterModule],
    providers: [moduleDeprecationsProvider(DeprecatedToolbarSizeDirective), currentComponentProvider('toolbar')]
})
export class ToolbarDocsModule {}
