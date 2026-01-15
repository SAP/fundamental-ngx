import { NgModule } from '@angular/core';

import { InputGroupAddonBodyComponent } from './addon-body.component';
import { InputGroupAddonComponent } from './addon.component';
import { InputGroupComponent } from './input-group.component';
import { InputGroupInputComponent } from './input.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [InputGroupComponent, InputGroupAddonComponent, InputGroupAddonBodyComponent, InputGroupInputComponent],
    exports: [InputGroupComponent, InputGroupAddonComponent, InputGroupInputComponent]
})
export class PlatformInputGroupModule {}
