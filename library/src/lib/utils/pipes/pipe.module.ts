import { NgModule } from '@angular/core';

import { DisplayFnPipe } from './displayFn.pipe';
import { SearchHighlightPipe } from './search-highlight.pipe';

@NgModule({
    declarations: [
        DisplayFnPipe,
        SearchHighlightPipe
    ],
    exports: [
        DisplayFnPipe,
        SearchHighlightPipe
    ]
})
export class PipeModule {}
