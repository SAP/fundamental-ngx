import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { FormControlComponent } from '@fundamental-ngx/core/form';
import { FeedInputAvatarDirective } from './directives/feed-input-avatar.directive';
import { FeedInputButtonDirective } from './directives/feed-input-button.directive';
import { FeedInputTextareaDirective } from './directives/feed-input-textarea.directive';
import { FeedInputComponent } from './feed-input.component';

@NgModule({
    declarations: [FeedInputComponent, FeedInputTextareaDirective, FeedInputButtonDirective, FeedInputAvatarDirective],
    imports: [CommonModule, AvatarComponent, ButtonModule, FormControlComponent],
    exports: [FeedInputComponent, FeedInputTextareaDirective, FeedInputButtonDirective, FeedInputAvatarDirective]
})
export class FeedInputModule {}
