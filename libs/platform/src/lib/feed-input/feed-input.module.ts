import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { FormControlModule } from '@fundamental-ngx/core/form';
import { I18nModule } from '@fundamental-ngx/i18n';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { FeedInputComponent } from './feed-input.component';

@NgModule({
    declarations: [FeedInputComponent],
    imports: [CommonModule, AvatarModule, FormControlModule, FormsModule, PlatformButtonModule, I18nModule],
    exports: [FeedInputComponent]
})
export class PlatformFeedInputModule {}
