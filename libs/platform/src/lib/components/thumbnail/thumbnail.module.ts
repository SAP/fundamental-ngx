import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThumbnailComponent } from './thumbnail.component';
import { AvatarModule } from '@fundamental-ngx/core';
import { ThumbnailImageComponent } from './thumbnail-image/thumbnail-image.component';



@NgModule({
    declarations: [ThumbnailComponent, ThumbnailImageComponent],
    imports: [
        CommonModule,
        AvatarModule
    ],
    exports: [ThumbnailComponent]
})
export class PlatformThumbnailModule { }
