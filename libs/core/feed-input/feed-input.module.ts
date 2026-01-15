import { NgModule } from '@angular/core';
import { FeedInputAvatarDirective } from './directives/feed-input-avatar.directive';
import { FeedInputButtonDirective } from './directives/feed-input-button.directive';
import { FeedInputTextareaDirective } from './directives/feed-input-textarea.directive';
import { FeedInputComponent } from './feed-input.component';

const components = [FeedInputComponent, FeedInputTextareaDirective, FeedInputButtonDirective, FeedInputAvatarDirective];

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [...components],
    exports: [...components]
})
export class FeedInputModule {}
