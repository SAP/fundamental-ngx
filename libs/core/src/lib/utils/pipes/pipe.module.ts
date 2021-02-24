import { NgModule } from '@angular/core';

import { DisplayFnPipe } from './displayFn.pipe';
import { SearchHighlightPipe } from './search-highlight.pipe';
import { TwoDigitsPipe } from './two-digits.pipe';
import { ListGroupPipe } from './list-group.pipe';
import { SafePipe } from './safe.pipe';
import { FilterByPipe } from './filter-by.pipe';

@NgModule({
    declarations: [DisplayFnPipe, SearchHighlightPipe, TwoDigitsPipe, ListGroupPipe, SafePipe, FilterByPipe],
    exports: [DisplayFnPipe, SearchHighlightPipe, TwoDigitsPipe, ListGroupPipe, SafePipe, FilterByPipe]
})
export class PipeModule { }
