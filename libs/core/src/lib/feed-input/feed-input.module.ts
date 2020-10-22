import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedInputComponent } from './feed-input.component';
import { AvatarModule, ButtonModule, FormControlModule } from '../..';
import { FeedInputTextareaDirective } from './directives/feed-input-textarea.directive';
import { FeedInputButtonDirective } from './directives/feed-input-button.directive';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        FeedInputComponent,
        FeedInputTextareaDirective,
        FeedInputButtonDirective
    ],
    imports: [CommonModule, AvatarModule, ButtonModule, FormControlModule, FormsModule],
    exports: [
        FeedInputComponent,
        FeedInputTextareaDirective,
        FeedInputButtonDirective
    ]
})
export class FeedInputModule { }
