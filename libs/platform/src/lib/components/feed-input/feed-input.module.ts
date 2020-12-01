import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AvatarModule, FormControlModule } from '@fundamental-ngx/core';
import { FeedInputComponent } from './feed-input.component';
import { PlatformButtonModule } from '../button/public_api';

@NgModule({
    declarations: [FeedInputComponent],
    imports: [
        CommonModule,
        AvatarModule,
        FormControlModule,
        FormsModule,
        PlatformButtonModule
    ],
    exports: [FeedInputComponent]
})
export class PlatformFeedInputModule { }
