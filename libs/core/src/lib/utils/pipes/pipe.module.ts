import { NgModule } from '@angular/core';

import { DisplayFnPipe } from './displayFn.pipe';
import { SearchHighlightPipe } from './search-highlight.pipe';
import { TwoDigitsPipe } from './two-digits.pipe';
import { ListGroupPipe } from './list-group.pipe';

@NgModule({
    declarations: [DisplayFnPipe, SearchHighlightPipe, TwoDigitsPipe, ListGroupPipe],
    exports: [DisplayFnPipe, SearchHighlightPipe, TwoDigitsPipe, ListGroupPipe]
})
export class PipeModule {}
