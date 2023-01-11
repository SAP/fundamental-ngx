import { NgModule } from '@angular/core';

import { DisplayFnPipe } from './displayFn.pipe';
import { FilterStringsPipe } from './filter-strings.pipe';
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
        TruncatePipe,
        FilterStringsPipe
    ],
    exports: [
        DisplayFnPipe,
        SearchHighlightPipe,
        TwoDigitsPipe,
        SafePipe,
        ValueByPathPipe,
        IsCompactDensityPipe,
        TruncatePipe,
        FilterStringsPipe
    ]
})
export class PipeModule {}
