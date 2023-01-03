import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { ToolbarDocsComponent } from './toolbar-docs.component';
import { ToolbarHeaderComponent } from './toolbar-header/toolbar-header.component';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import {
    ToolbarOverflowGroupingExampleComponent,
    ToolbarOverflowPriorityExampleComponent,
    ToolbarSeparatorExampleComponent,
    ToolbarSizeExampleComponent,
    ToolbarSpacerExampleComponent,
    ToolbarTitleExampleComponent,
    ToolbarTypeExampleComponent
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
import { moduleDeprecationsProvider } from '@fundamental-ngx/cdk/utils';

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
    providers: [moduleDeprecationsProvider(DeprecatedToolbarSizeDirective), currentComponentProvider('toolbar')]
})
export class ToolbarDocsModule {}
