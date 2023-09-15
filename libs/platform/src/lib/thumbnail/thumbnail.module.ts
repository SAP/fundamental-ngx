import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RtlService } from '@fundamental-ngx/cdk/utils';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { CarouselModule } from '@fundamental-ngx/core/carousel';
import { DialogModule, DialogRef } from '@fundamental-ngx/core/dialog';
import { I18nModule } from '@fundamental-ngx/i18n';
import { ThumbnailDetailsComponent } from './thumbnail-details/thumbnail-details.component';
import { ThumbnailImageComponent } from './thumbnail-image/thumbnail-image.component';
import { ThumbnailComponent } from './thumbnail.component';

@NgModule({
    declarations: [ThumbnailComponent, ThumbnailImageComponent, ThumbnailDetailsComponent],
    providers: [RtlService, DialogRef],
    imports: [CommonModule, AvatarComponent, DialogModule, CarouselModule, ButtonModule, I18nModule],
    exports: [ThumbnailComponent, ThumbnailImageComponent, ThumbnailDetailsComponent]
})
export class PlatformThumbnailModule {}
