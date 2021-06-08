import { NgModule } from '@angular/core';

import { DisplayFnPipe } from './displayFn.pipe';
import { SearchHighlightPipe } from './search-highlight.pipe';
import { TwoDigitsPipe } from './two-digits.pipe';
import { ListGroupPipe } from './list-group.pipe';
import { SafePipe } from './safe.pipe';

@NgModule({
    declarations: [
        DisplayFnPipe,
        SearchHighlightPipe,
        TwoDigitsPipe,
        ListGroupPipe,
        SafePipe,
    ],
    exports: [
        DisplayFnPipe,
        SearchHighlightPipe,
        TwoDigitsPipe,
        ListGroupPipe,
        SafePipe
    ]
})
export class PipeModule {}
