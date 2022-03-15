import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

import { PlatformColorPaletteHeaderComponent } from './platform-color-palette-header/platform-color-palette-header.component';
import { PlatformColorPaletteDocsComponent } from './platform-color-palette-docs.component';
import {
    PlatformColorPaletteSimpleExampleComponent,
    PlatformColorPaletteComplexExampleComponent
} from './platform-color-palette-examples/platform-color-palette-examples.component';

import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { PlatformMenuModule } from '@fundamental-ngx/platform/menu';
import { PlatformColorPaletteModule } from '@fundamental-ngx/platform/color-palette';
import { PlatformActionButtonGroupModule } from '@fundamental-ngx/platform/action-button-group';

const routes: Routes = [
    {
        path: '',
        component: PlatformColorPaletteHeaderComponent,
        children: [
            { path: '', component: PlatformColorPaletteDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.colorPalette } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        PlatformColorPaletteModule,
        PlatformButtonModule,
        PlatformMenuModule,
        PlatformActionButtonGroupModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformColorPaletteDocsComponent,
        PlatformColorPaletteHeaderComponent,
        PlatformColorPaletteSimpleExampleComponent,
        PlatformColorPaletteComplexExampleComponent
    ]
})
export class PlatformColorPaletteDocsModule {}
