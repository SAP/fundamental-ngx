import { NgModule } from '@angular/core';

import { PlatformObjectMarkerComponent } from './object-marker.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [PlatformObjectMarkerComponent],
    exports: [PlatformObjectMarkerComponent]
})
export class PlatformObjectMarkerModule {}
