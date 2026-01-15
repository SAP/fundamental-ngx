import { NgModule } from '@angular/core';

import { DisplayListItemComponent } from './display-list-item.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [DisplayListItemComponent],
    exports: [DisplayListItemComponent]
})
export class DisplayListItemModule {}
