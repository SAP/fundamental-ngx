import { NgModule } from '@angular/core';

import { SearchFieldMobileComponent } from './search-field/search-field-mobile.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [SearchFieldMobileComponent],
    exports: [SearchFieldMobileComponent]
})
export class PlatformSearchFieldMobileModule {}
