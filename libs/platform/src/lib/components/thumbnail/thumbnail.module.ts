import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThumbnailComponent } from './thumbnail.component';
import { AvatarModule, CarouselModule, DialogModule , ButtonModule ,  RtlService, DialogRef} from '@fundamental-ngx/core';
import { ThumbnailImageComponent } from './thumbnail-image/thumbnail-image.component';
import { ThumbnailDetailsComponent } from './thumbnail-details/thumbnail-details.component';

@NgModule({
    declarations: [ThumbnailComponent, ThumbnailImageComponent, ThumbnailDetailsComponent],
    providers: [RtlService, DialogRef],
    imports: [
        CommonModule,
        AvatarModule,
        DialogModule,
        CarouselModule,
        ButtonModule
    ],
    exports: [ThumbnailComponent]
})
export class PlatformThumbnailModule { }
