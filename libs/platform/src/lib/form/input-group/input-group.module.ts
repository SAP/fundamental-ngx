import { NgModule } from '@angular/core';

import { InputGroupComponent } from './input-group.component';
import { InputGroupAddonComponent } from './addon.component';
import { InputGroupAddonBodyComponent } from './addon-body.component';
import { InputGroupInputComponent } from './input.component';

@NgModule({
    imports: [InputGroupComponent, InputGroupAddonComponent, InputGroupAddonBodyComponent, InputGroupInputComponent],
    exports: [InputGroupComponent, InputGroupAddonComponent, InputGroupInputComponent]
})
export class PlatformInputGroupModule {}
