import { NgModule } from '@angular/core';

import { ConvertBytesPipe } from './convert-bytes/convert-bytes.pipe';

@NgModule({
    imports: [ConvertBytesPipe],
    exports: [ConvertBytesPipe]
})
export class PlatformPipeModule {}
