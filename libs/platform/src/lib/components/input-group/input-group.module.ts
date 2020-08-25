import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatformInputModule } from '../form/input/fdp-input.module';
import { PlatformButtonModule } from '../button/button.module';

import { InputGroupComponent } from './input-group.component';
import { InputGroupAddonComponent } from './addon/addon.component';

@NgModule({
    declarations: [InputGroupComponent, InputGroupAddonComponent],
    imports: [CommonModule],
    exports: [PlatformInputModule, PlatformButtonModule, InputGroupComponent, InputGroupAddonComponent]
})
export class PlatformInputGroupModule {}
