import { NgModule } from '@angular/core';

import { ActionListItemComponent } from './action-list-item.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [ActionListItemComponent],
    exports: [ActionListItemComponent]
})
export class ActionListItemModule {}
