import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { PopoverDirectiveHeaderComponent } from './popover-directive-header/popover-directive-header.component';
import { PopoverDirectiveDocsComponent } from './popover-directive-docs.component';
import { PopoverDirectiveExampleComponent } from './examples/popover-directive-example/popover-directive-example.component';
import { PopoverFillComponent } from './examples/popover-fill/popover-fill.component';
import { PopoverProgrammaticComponent } from './examples/popover-programmatic/popover-programmatic.component';
import { PopoverTriggersComponent } from './examples/popover-triggers/popover-triggers.component';
import { PopoverModule } from '@fundamental-ngx/core';

const routes: Routes = [
    {
        path: '',
        component: PopoverDirectiveHeaderComponent,
        children: [
            { path: '', component: PopoverDirectiveDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.popoverDirective } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, PopoverModule],
    exports: [RouterModule],
    declarations: [
        PopoverFillComponent,
        PopoverTriggersComponent,
        PopoverProgrammaticComponent,
        PopoverDirectiveDocsComponent,
        PopoverDirectiveHeaderComponent,
        PopoverDirectiveExampleComponent
    ]
})
export class PopoverDirectiveDocsModule {}
