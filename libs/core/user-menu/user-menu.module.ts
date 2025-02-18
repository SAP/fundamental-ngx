import { NgModule } from '@angular/core';

import { UserMenuComponent } from './user-menu.component';

const components = [UserMenuComponent];

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [...components],
    exports: [...components]
})
export class UserMenuModule {}
