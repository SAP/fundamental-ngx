import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

import { PlatformColorPalettePopoverHeaderComponent } from './platform-color-palette-popover-header/platform-color-palette-popover-header.component';
import { PlatformColorPalettePopoverDocsComponent } from './platform-color-palette-popover-docs.component';
import { PlatformColorPalettePopoverExamplesComponent } from './platform-color-palette-popover-examples/platform-color-palette-popover-simple-example.component';

import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { PlatformMenuModule } from '@fundamental-ngx/platform/menu';
import { PlatformColorPalettePopoverModule } from '@fundamental-ngx/platform/color-palette-popover';
import { PlatformActionButtonGroupModule } from '@fundamental-ngx/platform/action-button-group';

const routes: Routes = [
    {
        path: '',
        component: PlatformColorPalettePopoverHeaderComponent,
        children: [
            { path: '', component: PlatformColorPalettePopoverDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.colorPalettePopover } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        PlatformColorPalettePopoverModule,
        PlatformButtonModule,
        PlatformMenuModule,
        PlatformActionButtonGroupModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformColorPalettePopoverDocsComponent,
        PlatformColorPalettePopoverHeaderComponent,
        PlatformColorPalettePopoverExamplesComponent
    ]
})
export class PlatformColorPalettePopoverDocsModule {}
