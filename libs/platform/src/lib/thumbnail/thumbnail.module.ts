import { NgModule } from '@angular/core';

import { ThumbnailDetailsComponent } from './thumbnail-details/thumbnail-details.component';
import { ThumbnailImageComponent } from './thumbnail-image/thumbnail-image.component';
import { ThumbnailComponent } from './thumbnail.component';

const components = [ThumbnailComponent, ThumbnailImageComponent, ThumbnailDetailsComponent];

@NgModule({
    imports: [...components],
    exports: [...components]
})
export class PlatformThumbnailModule {}
