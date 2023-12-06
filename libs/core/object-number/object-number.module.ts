import { NgModule } from '@angular/core';

import { ObjectNumberComponent } from './object-number.component';

/**
 * @deprecated
 * Use direct import of `ObjectNumberComponent`
 */
@NgModule({
    imports: [ObjectNumberComponent],
    exports: [ObjectNumberComponent]
})
export class ObjectNumberModule {}
