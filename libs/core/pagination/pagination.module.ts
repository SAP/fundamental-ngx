import { NgModule } from '@angular/core';

import { PaginationComponent } from './pagination.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [PaginationComponent],
    exports: [PaginationComponent]
})
export class PaginationModule {}
