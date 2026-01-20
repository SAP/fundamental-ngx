import { NgModule } from '@angular/core';

import { PlatformFooterComponent } from './page-footer.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [PlatformFooterComponent],
    exports: [PlatformFooterComponent]
})
export class PlatformPageFooterModule {}
