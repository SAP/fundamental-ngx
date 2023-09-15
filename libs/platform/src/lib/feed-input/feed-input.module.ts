import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { FormControlComponent } from '@fundamental-ngx/core/form';
import { I18nModule } from '@fundamental-ngx/i18n';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { FeedInputComponent } from './feed-input.component';

@NgModule({
    declarations: [FeedInputComponent],
    imports: [CommonModule, AvatarComponent, FormControlComponent, FormsModule, PlatformButtonModule, I18nModule],
    exports: [FeedInputComponent]
})
export class PlatformFeedInputModule {}
