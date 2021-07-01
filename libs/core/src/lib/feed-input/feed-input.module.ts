import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedInputComponent } from './feed-input.component';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { FormControlModule } from '@fundamental-ngx/core/form';
import { FeedInputTextareaDirective } from './directives/feed-input-textarea.directive';
import { FeedInputButtonDirective } from './directives/feed-input-button.directive';
import { FeedInputAvatarDirective } from './directives/feed-input-avatar.directive';

@NgModule({
    declarations: [
        FeedInputComponent,
        FeedInputTextareaDirective,
        FeedInputButtonDirective,
        FeedInputAvatarDirective
    ],
    imports: [CommonModule, AvatarModule, ButtonModule, FormControlModule],
    exports: [
        FeedInputComponent,
        FeedInputTextareaDirective,
        FeedInputButtonDirective,
        FeedInputAvatarDirective
    ]
})
export class FeedInputModule { }
