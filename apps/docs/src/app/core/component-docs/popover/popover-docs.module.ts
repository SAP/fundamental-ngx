import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PopoverModule } from '@fundamental-ngx/core/popover';
import { SideNavigationModule } from '@fundamental-ngx/core/side-navigation';
import { MultiInputModule } from '@fundamental-ngx/core/multi-input';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { BarModule } from '@fundamental-ngx/core/bar';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { FormModule } from '@fundamental-ngx/core/form';
import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { LinkModule } from '@fundamental-ngx/core/link';

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

import { PopoverComplexExampleComponent } from './examples/popover-complex-example/popover-complex-example.component';
import { PopoverContainerExampleComponent } from './examples/popover-container-example/popover-container-example.component';
import { PopoverScrollExampleComponent } from './examples/popover-scroll-example/popover-scroll-example.component';
import { PopoverCdkPlacementExampleComponent } from './examples/popover-new-placement/popover-cdk-placement-example.component';
import { PopoverFocusExampleComponent } from './examples/popover-focus-example/popover-focus-example.component';
import { PopoverMobileExampleComponent } from './examples/popover-mobile/popover-mobile-example.component';
import { PopoverTriggerExampleComponent } from './examples/popover-trigger-example/popover-trigger-example.component';
import { PopoverDynamicContainerHeightExampleComponent } from './examples/popover-dynamic-container-height/popover-dynamic-container-height-example.component';

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
        AvatarModule,
        BarModule,
        SegmentedButtonModule,
        FormModule,
        CheckboxModule,
        LinkModule
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
        PopoverComplexExampleComponent,
        PopoverContainerExampleComponent,
        PopoverScrollExampleComponent,
        PopoverCdkPlacementExampleComponent,
        PopoverFocusExampleComponent,
        PopoverTriggerExampleComponent,
        PopoverMobileExampleComponent,
        PopoverDynamicContainerHeightExampleComponent
    ]
})
export class PopoverDocsModule {}
