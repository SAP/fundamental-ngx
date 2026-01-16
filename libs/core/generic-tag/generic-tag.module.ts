import { NgModule } from '@angular/core';

import { GenericTagComponent } from './generic-tag.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [GenericTagComponent],
    exports: [GenericTagComponent]
})
export class GenericTagModule {}
