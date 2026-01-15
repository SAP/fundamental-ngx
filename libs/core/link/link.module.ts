import { NgModule } from '@angular/core';

import { LinkComponent } from './link.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [LinkComponent],
    exports: [LinkComponent]
})
export class LinkModule {}
