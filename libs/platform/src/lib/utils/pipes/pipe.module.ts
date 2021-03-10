import { NgModule } from '@angular/core';

import { ConvertBytesPipe } from './convert-bytes/convert-bytes.pipe';

@NgModule({
    declarations: [ConvertBytesPipe],
    exports: [ConvertBytesPipe]
})
export class PlatformPipeModule {}
