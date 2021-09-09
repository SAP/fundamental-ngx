import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { CarouselModule } from '@fundamental-ngx/core/carousel';
import { DialogModule, DialogRef } from '@fundamental-ngx/core/dialog';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { RtlService } from '@fundamental-ngx/core/utils';
import { ThumbnailImageComponent } from './thumbnail-image/thumbnail-image.component';
import { ThumbnailDetailsComponent } from './thumbnail-details/thumbnail-details.component';
import { ThumbnailComponent } from './thumbnail.component';

@NgModule({
    declarations: [ThumbnailComponent, ThumbnailImageComponent, ThumbnailDetailsComponent],
    providers: [RtlService, DialogRef],
    imports: [CommonModule, AvatarModule, DialogModule, CarouselModule, ButtonModule],
    exports: [ThumbnailComponent]
})
export class PlatformThumbnailModule {}
