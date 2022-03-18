import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

import { PlatformColorPalettePopoverHeaderComponent } from './platform-color-palette-popover-header/platform-color-palette-popover-header.component';
import { PlatformColorPalettePopoverDocsComponent } from './platform-color-palette-popover-docs.component';
import { PlatformColorPalettePopoverSimpleExampleComponent } from './platform-color-palette-popover-examples/platform-color-palette-popover-simple-example.component';
import { PlatformColorPalettePopoverComplexExampleComponent } from './platform-color-palette-popover-examples/platform-color-palette-popover-complex-example.component';

import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { PlatformColorPalettePopoverModule } from '@fundamental-ngx/platform/color-palette-popover';
import { PlatformColorPalettePopoverReactiveFormExampleComponent } from './platform-color-palette-popover-examples/platform-color-palette-popover-reactive-form-example.component';

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
        PlatformButtonModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformColorPalettePopoverDocsComponent,
        PlatformColorPalettePopoverHeaderComponent,
        PlatformColorPalettePopoverSimpleExampleComponent,
        PlatformColorPalettePopoverComplexExampleComponent,
        PlatformColorPalettePopoverReactiveFormExampleComponent
    ]
})
export class PlatformColorPalettePopoverDocsModule {}
