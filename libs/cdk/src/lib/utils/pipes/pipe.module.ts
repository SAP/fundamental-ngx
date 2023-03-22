import { NgModule } from '@angular/core';
import { AsyncOrSyncPipe } from './async-or-sync.pipe';

import { DisplayFnPipe } from './displayFn.pipe';
import { FilterStringsPipe } from './filter-strings.pipe';
import { SearchHighlightPipe } from './search-highlight.pipe';
import { TwoDigitsPipe } from './two-digits.pipe';
import { SafePipe } from './safe.pipe';
import { ValueByPathPipe } from './value-by-path.pipe';
import { IsCompactDensityPipe } from './is-compact.pipe';
import { TruncatePipe } from './truncate.pipe';
import { MakeAsyncPipe } from './make-async.pipe';

@NgModule({
    imports: [
        DisplayFnPipe,
        SearchHighlightPipe,
        TwoDigitsPipe,
        SafePipe,
        ValueByPathPipe,
        IsCompactDensityPipe,
        TruncatePipe,
        FilterStringsPipe,
        MakeAsyncPipe,
        AsyncOrSyncPipe
    ],
    exports: [
        DisplayFnPipe,
        SearchHighlightPipe,
        TwoDigitsPipe,
        SafePipe,
        ValueByPathPipe,
        IsCompactDensityPipe,
        TruncatePipe,
        FilterStringsPipe,
        MakeAsyncPipe,
        AsyncOrSyncPipe
    ]
})
export class PipeModule {}
