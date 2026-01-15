import { NgModule } from '@angular/core';

import { FeedInputComponent } from './feed-input.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [FeedInputComponent],
    exports: [FeedInputComponent]
})
export class PlatformFeedInputModule {}
