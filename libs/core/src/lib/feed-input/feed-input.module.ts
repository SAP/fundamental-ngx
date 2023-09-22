import { NgModule } from '@angular/core';
import { FeedInputAvatarDirective } from './directives/feed-input-avatar.directive';
import { FeedInputButtonDirective } from './directives/feed-input-button.directive';
import { FeedInputTextareaDirective } from './directives/feed-input-textarea.directive';
import { FeedInputComponent } from './feed-input.component';

const components = [FeedInputComponent, FeedInputTextareaDirective, FeedInputButtonDirective, FeedInputAvatarDirective];

@NgModule({
    imports: [...components],
    exports: [...components]
})
export class FeedInputModule {}
