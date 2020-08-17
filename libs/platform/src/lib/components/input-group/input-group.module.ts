import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputGroupComponent } from './input-group.component';
import { InputGroupAddonComponent } from './addon/addon.component';

@NgModule({
    declarations: [InputGroupComponent, InputGroupAddonComponent],
    imports: [CommonModule],
    exports: [InputGroupComponent, InputGroupAddonComponent]
})
export class PlatformInputGroupModule {}
