import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { PopoverHeaderComponent } from './popover-header/popover-header.component';
import { PopoverDocsComponent } from './popover-docs.component';
import { PopoverCFillComponent } from './examples/popover-c-fill/popover-c-fill.component';
import { PopoverDropdownExampleComponent } from './examples/popover-dropdown/popover-dropdown-example.component';
import { PopoverDynamicExampleComponent } from './examples/popover-dynamic/popover-dynamic-example.component';
import { PopoverDialogExampleComponent } from './examples/popover-dialog/popover-dialog-example.component';
import { PopoverPlacementExampleComponent } from './examples/popover-placement/popover-placement-example.component';
import { PopoverProgrammaticOpenExampleComponent } from './examples/popover-programmatic/popover-programmatic-open-example.component';
import { PopoverExampleComponent } from './examples/popover-simple/popover-example.component';
import {
    DialogModule,
    MultiInputModule,
    PopoverModule,
    SideNavigationModule,
    BarModule,
    AvatarModule,
    ListModule,
    SelectModule,
    SegmentedButtonModule
} from '@fundamental-ngx/core';
import { PopoverComplexExampleComponent } from './examples/popover-complex-example/popover-complex-example.component';

const routes: Routes = [
    {
        path: '',
        component: PopoverHeaderComponent,
        children: [
            { path: '', component: PopoverDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.popover } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        PopoverModule,
        SideNavigationModule,
        MultiInputModule,
        DialogModule,
        ListModule,
        AvatarModule,
        BarModule,
        SelectModule,
        SegmentedButtonModule
    ],
    exports: [RouterModule],
    declarations: [
        PopoverDocsComponent,
        PopoverCFillComponent,
        PopoverHeaderComponent,
        PopoverExampleComponent,
        PopoverDialogExampleComponent,
        PopoverDynamicExampleComponent,
        PopoverDropdownExampleComponent,
        PopoverPlacementExampleComponent,
        PopoverProgrammaticOpenExampleComponent,
        PopoverComplexExampleComponent
    ]
})
export class PopoverDocsModule {}
