import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedInputComponent } from './feed-input.component';
import { AvatarModule, ButtonModule, FormControlModule } from '@fundamental-ngx/core';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [FeedInputComponent],
    imports: [
        CommonModule,
        AvatarModule,
        ButtonModule,
        FormControlModule,
        FormsModule
    ],
    exports: [FeedInputComponent]
})
export class PlatformFeedInputModule { }
