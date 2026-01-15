import { NgModule } from '@angular/core';

import { IconComponent } from './icon.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [IconComponent],
    exports: [IconComponent]
})
export class IconModule {}
