import { NgModule } from '@angular/core';

import { ButtonComponent } from './button.component';

/**
 * @deprecated
 * Use `ButtonComponent` import instead
 */
@NgModule({
    imports: [ButtonComponent],
    exports: [ButtonComponent]
})
export class ButtonModule {}
