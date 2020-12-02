import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedInputComponent } from './feed-input.component';
import { AvatarModule } from '../avatar/avatar.module';
import { ButtonModule } from '../button/button.module';
import { FormControlModule } from '../form/form-control/form-control.module';
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
