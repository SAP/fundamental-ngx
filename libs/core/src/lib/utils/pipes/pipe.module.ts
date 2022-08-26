import { NgModule } from '@angular/core';

import { DisplayFnPipe } from './displayFn.pipe';
import { SearchHighlightPipe } from './search-highlight.pipe';
import { TwoDigitsPipe } from './two-digits.pipe';
import { SafePipe } from './safe.pipe';
import { ValueByPathPipe } from './value-by-path.pipe';
import { IsCompactDensityPipe } from './is-compact.pipe';
import { TruncatePipe } from './truncate.pipe';

@NgModule({
    declarations: [
        DisplayFnPipe,
        SearchHighlightPipe,
        TwoDigitsPipe,
        SafePipe,
        ValueByPathPipe,
        IsCompactDensityPipe,
        TruncatePipe
    ],
    exports: [
        DisplayFnPipe,
        SearchHighlightPipe,
        TwoDigitsPipe,
        SafePipe,
        ValueByPathPipe,
        IsCompactDensityPipe,
        TruncatePipe
    ]
})
export class PipeModule {}
