import { NgModule } from '@angular/core';

import { ObjectAttributeComponent } from './object-attribute.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [ObjectAttributeComponent],
    exports: [ObjectAttributeComponent]
})
export class ObjectAttributeModule {}
