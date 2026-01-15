import { NgModule } from '@angular/core';

import { ConvertBytesPipe } from './convert-bytes/convert-bytes.pipe';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [ConvertBytesPipe],
    exports: [ConvertBytesPipe]
})
export class PlatformPipeModule {}
