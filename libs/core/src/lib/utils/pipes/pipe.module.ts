import { NgModule } from '@angular/core';

import { DisplayFnPipe } from './displayFn.pipe';
import { SearchHighlightPipe } from './search-highlight.pipe';
import { TwoDigitsPipe } from './two-digits.pipe';
import { ListGroupPipe } from './list-group.pipe';
import { SafePipe } from './safe.pipe';
import { ValueByPathPipe } from './value-by-path.pipe';
import { IsCompactDensityPipe } from './is-compact.pipe';

@NgModule({
    declarations: [
        DisplayFnPipe,
        SearchHighlightPipe,
        TwoDigitsPipe,
        ListGroupPipe,
        SafePipe,
        ValueByPathPipe,
        IsCompactDensityPipe
    ],
    exports: [
        DisplayFnPipe,
        SearchHighlightPipe,
        TwoDigitsPipe,
        ListGroupPipe,
        SafePipe,
        ValueByPathPipe,
        IsCompactDensityPipe
    ]
})
export class PipeModule {}
