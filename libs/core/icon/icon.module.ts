import { NgModule } from '@angular/core';

import { IconComponent } from './icon.component';

/**
 * @deprecated
 * Use direct import of `IconComponent`
 */
@NgModule({
    imports: [IconComponent],
    exports: [IconComponent]
})
export class IconModule {}
