import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { PlatformContentDensityDeprecationsModule } from '@fundamental-ngx/platform/shared';

import { PlatformInputModule } from '../input/fdp-input.module';
import { InputGroupComponent } from './input-group.component';
import { InputGroupAddonComponent } from './addon.component';
import { InputGroupAddonBodyComponent } from './addon-body.component';
import { InputGroupInputComponent } from './input.component';

@NgModule({
    declarations: [
        InputGroupComponent,
        InputGroupAddonComponent,
        InputGroupAddonBodyComponent,
        InputGroupInputComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        PlatformInputModule,
        PlatformContentDensityDeprecationsModule,
        ContentDensityModule
    ],
    exports: [
        PlatformInputModule,
        InputGroupComponent,
        InputGroupAddonComponent,
        InputGroupInputComponent,
        PlatformContentDensityDeprecationsModule,
        ContentDensityModule
    ]
})
export class PlatformInputGroupModule {}
