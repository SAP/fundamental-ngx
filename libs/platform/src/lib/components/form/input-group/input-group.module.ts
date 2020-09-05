import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PlatformButtonModule } from '../../button/button.module';
import { PlatformInputModule } from '../input/fdp-input.module';

import { InputGroupComponent } from './input-group.component';
import { InputGroupAddonComponent, InputGroupAddonBodyComponent, InputGroupInputComponent } from './addon';

@NgModule({
    declarations: [
        InputGroupComponent,
        InputGroupAddonComponent,
        InputGroupAddonBodyComponent,
        InputGroupInputComponent
    ],
    imports: [CommonModule, FormsModule, PlatformInputModule],
    exports: [
        PlatformInputModule,
        PlatformButtonModule,
        InputGroupComponent,
        InputGroupAddonComponent,
        InputGroupInputComponent
    ]
})
export class PlatformInputGroupModule {}
