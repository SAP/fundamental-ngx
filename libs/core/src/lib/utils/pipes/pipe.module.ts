import { NgModule } from '@angular/core';

import { DisplayFnPipe } from './displayFn.pipe';
import { SearchHighlightPipe } from './search-highlight.pipe';
import { TwoDigitsPipe } from './two-digits.pipe';
import { ListGroupPipe } from './list-group.pipe';
import { SafePipe } from './safe.pipe';
import { DateFormatPipe, DateFromNowPipe, DateTimeFormatPipe } from './dateFormat.pipes';

@NgModule({
    declarations: [
        DisplayFnPipe,
        SearchHighlightPipe,
        TwoDigitsPipe,
        ListGroupPipe,
        SafePipe,
        DateFormatPipe,
        DateTimeFormatPipe,
        DateFromNowPipe
    ],
    exports: [
        DisplayFnPipe,
        SearchHighlightPipe,
        TwoDigitsPipe,
        ListGroupPipe,
        SafePipe,
        DateFormatPipe,
        DateTimeFormatPipe,
        DateFromNowPipe
    ]
})
export class PipeModule {}
