import { NgModule } from '@angular/core';

import { ConvertBytesPipe } from './convert-bytes';

@NgModule({
    declarations: [ConvertBytesPipe],
    exports: [ConvertBytesPipe]
})
export class PlatformPipeModule {}
